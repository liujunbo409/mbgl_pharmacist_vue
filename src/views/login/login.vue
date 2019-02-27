<!--模拟登录页-->
<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <div class="aui-title">请登录</div>
    </header>
    <div class="aui-list-item-inner" style="margin-top: 5rem">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <span class="iconfont icon-shoujiaa" ></span>
            </div>
            <div class="aui-list-item-input">
              <input  type="text" class="aui-text-left aui-text-default"  maxlength="11" @blur="checkphonenum"
                      placeholder="请输入用户名"  v-model="phonenum">
            </div>
          </div>
        </li>
        <li class="aui-list-item" style="border:none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <span class="iconfont icon-mima" ></span>
            </div>
            <div class="aui-list-item-input">
              <input  type="password" class="aui-text-left aui-text-default"  maxlength="15"
                      placeholder="请输入密码" v-model="password">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="margin-top: 0.5rem">
    <span  class=" aui-margin-l-10 aui-text-danger" style="font-size: 0.7rem">
            {{errmsg}}
            </span></div>
    <div class="mainbtn-main" @click="dologin" style="margin-top: 2rem">登录</div>
    <div style="margin-top: 0.5rem">
      <div class="aui-list-item-label">
        <span style="padding-right: 1rem;font-size:0.7rem;color: #B3B3B3;float: right" @click="doRegister(2)">忘记密码?</span>
      </div>
    </div>
  </div>
</template>
<style scoped>


</style>

<script>
  var self = null;    //在create方法中初始化为this
  import {MessageBox} from 'mint-ui';
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return{
        phonenum : '',
        password : '',
        errmsg : ''           //错误信息提示
      }
    },
    methods :{
      //校验手机号
      checkphonenum : function () {
        self.errmsg = "";
        var phonenum = self.phonenum;
        //var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phonenum){
          self.errmsg = "手机号不能为空";
          return false;
        }
        // if (!myreg.test(phonenum)) {
        //   self.errmsg = "请输入正确的手机号";
        //   return false;
        // }
      },
      dologin : function () {
        var phonenum = self.phonenum;
        var password = self.password;
        //校验
        if(self.checkphonenum() == false)
        {
          return false;
        }
        if(password == "")
        {
          self.errmsg = "密码不能为空";
          return false;
        }
        //Login
        self.api.yaoshi_doLogin({login_name: phonenum, password : password, fwh_openid : localStorage.getItem("fwh_openid")}).then((res) => {
          //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.ret)
          {
            var doc_id = res.data.ret.id;
            var token = res.data.ret.token;
            //数据存入localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("admin_id", doc_id);
            localStorage.setItem("role", res.data.ret.role);
            localStorage.setItem("doctor", JSON.stringify(res.data.ret));
          }else{
            self.errmsg="";
            self.errmsg = JSON.stringify(res.data.message).replace(/"/g,"");
            return false;
          }
        self.common.jumpToPage({router: self.$router, url : "../assessarticle"});
      }).catch((err) => {
          self.common.consoledebug.log("err:" + JSON.stringify(err));
      });
      },
      doRegister : function (actiontype) {
        //判断操作为注册还是忘记密码
        if(actiontype == "1"){
          self.common.goToRegister({router: self.$router, type : "1"});
        }else{
          self.common.goToRegister({router: self.$router, type : "2"});
        }
      },
    }
  }

</script>
