<template>
<div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      type="date"
      align="right"
      :editable=false
      value-format="yyyy-MM-dd"
      placeholder="选择日期" @change="dateChange">
    </el-date-picker>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '2000/01/01',
        value2: '',
      };
    },
    methods :{
      dateChange : function(){
            console.log(this.value1);
      }
    }
  };
</script>