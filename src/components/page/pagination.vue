 这个分页没啥大用
<template>
<div>
  <div class="block" style="text-align:center">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click = "gotoPrev"
      @next-click = "gotoNext"
      :current-page="currentpage"
      :page-size="pagesize"
      layout=" prev, pager, next, total"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
  export default {
    props : ['currentpage', 'pagesize', 'total', "prevurl", "nexturl", ],
    mounted(){
      console.log("pagesize : "+this.pagesize);
      console.log("prevurl : "+this.prevurl);
      console.log("nexturl : "+this.nexturl);
      console.log("currentpage : "+this.currentpage);
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      gotoNext : function(){
        this.api.axios_ajax(this.nexturl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          this.$emit("changePage",res.data.ret.data);
        }).catch((err)=>{

        })

      },
      gotoPrev : function (){
        this.api.axios_ajax(this.prevurl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          this.$emit("changePage",res.data.ret.data);
        }).catch((err)=>{

        })
      },
    },
    data() {
      return {
      };
    }
  }
</script>