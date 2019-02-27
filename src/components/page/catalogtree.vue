<template >
<div>
  <el-input
  placeholder="输入关键字进行搜索"
  v-model="filterText">
  </el-input>

<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  :filter-node-method="filterNode"
  ref="tree2"
  :expand-on-click-node="false"
  :render-content="renderContent"
  >
</el-tree>
</div>
</template>


<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
    toTree :function(data) { 
      // 删除 所有 children,以防止多次调用
        data.forEach(function(item) {
            delete item.children;
        }); // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function(item) {
            map[item.id] = item;
        }); //        console.log(map);
        var val = [];
        data.forEach(function(item) { // 以当前遍历项，的pid,去map对象中找到索引的id
            var parent = map[item.father_id]; // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            if(parent) {
                (parent.children || (parent.children = [])).push(item);
            } else { //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                val.push(item);
            }
        });
        this.data2 = val;
        return val;
},
      filterNode(value, data) {
        if (!value) return true;
        return data.catalog_name.indexOf(value) !== -1;
      },
      append(data) {
        this.$emit("selectBymuluid",data);
      },

      renderContent(h, { node, data, store }) {
        //console.log(data);
        if(data.children==null){
        return (
          <span class="custom-tree-node"  on-click={ () => this.append(data) }>
            <span>{data.catalog_name}</span>
            <span>
            <span style="margin-right:0.5rem">{data.article_number}</span>
            <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3" 
            size="mini"   ></span>
            </span>
          </span>);}else {
            return (
          <span class="custom-tree-node" on-click={ () => this.append(data) }>
            <span>{data.catalog_name}</span>
            <span>
            <span style="margin-right:0.5rem">{data.article_number}</span>
            <span class="aui-iconfont aui-icon-down" style="color: #B3B3B3;float:right" 
            size="mini"></span>
            </span>
          </span>);
            }
      }
    },
    mounted(){
      if(this.type=='article'){
        this.api.doc_getCataloglist({ill_id : this.illid}).then((res)=>{
        this.toTree(res.data.ret);
        }).catch((err)=>{

        })
      }
      else if(this.type=='question'){
        this.api.doc_getBankMululist({ill_id : this.illid}).then((res)=>{
        this.toTree(res.data.ret);
        }).catch((err)=>{

        })
      }
    },

    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        }
      };
    },
    props :['illid','type']
  };
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    /* border-bottom: 1px solid #B3B3B3; */
  }
</style>