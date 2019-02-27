<template>
        <select class="select"  v-model="value"  @change="choose">
          <option  v-bind:key="key" v-bind:value="key"  v-for="(item,key) of info">{{item}}</option>
        </select>
</template>
<script>
  export default{
    props:[
      'utilparam',           //数组常量参数
      'selectvalue',      
    ],
    data(){
      return{
      value : '',
      info : null
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init : function () {
        this.value = this.selectvalue;
        //加载下拉列表数据
        this.api.user_getUtils({param: this.utilparam}).then((res) => {
          //this.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
        this.info = res.data.ret;
      }).
        catch((err) => {
          this.common.consoledebug.log("err :" + JSON.stringify(err));
      })
      },
      choose : function(){
        
        var data = {
          value : this.value,
        };
        this.$emit("changeSelect",data);
      }
  }
  }
</script>
<style>
.select{
  width: 250px;
  direction: rtl;
}
</style>
