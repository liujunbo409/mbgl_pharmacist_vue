<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" href="">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list">
      <li class="aui-list-item" >
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label-icon">
            <span class="iconfont icon-shoujiaa" ></span>
          </div>
          <div class="aui-list-item-input">
            <input  type="text" class="aui-text-left aui-text-default"  maxlength="11"
                    placeholder="请输入手机号" v-model="phonenum" @blur="checkPhonenum">
          </div>
        </div>
      </li>
      <li class="aui-list-item" >
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label-icon">
            <span class="iconfont icon-authenticate" ></span>
          </div>
          <div class="aui-list-item-input"  style="display: flex">
            <input  type="text" class="aui-text-left aui-text-default"  maxlength="4"
                    placeholder="请输入图片验证码" v-model="identifyCodeInput">
            <span @click="refreshCode" >
              <s-identify :identifyCode="identifyCode"></s-identify></span>
          </div>
        </div>
      </li>
      <li class="aui-list-item" >
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label-icon">
            <span class="iconfont icon-navicon-jhtx" ></span>
          </div>
          <div class="aui-list-item-input" style="display: flex">
            <input  type="text" class="aui-text-left aui-text-default"  maxlength="4" @focus="checkIdenty"
                    placeholder="请输入短信验证码" v-model="phoneidentifyCodeInput">
            <button id="getcaptchabtn" class="normalbtn-main" style="min-width: 112px;margin-top: 7px" @click="getcaptcha">获取验证码</button>
          </div>
        </div>
      </li>
      <li class="aui-list-item" >
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label-icon">
            <span class="iconfont icon-mima" ></span>
          </div>
          <div class="aui-list-item-input">
            <input  type="password" class="aui-text-left aui-text-default"  maxlength="11"
                    placeholder="请输入密码" v-model="password">
          </div>
        </div>
      </li>
      <li class="aui-list-item" style="border:none">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label-icon">
            <span class="iconfont icon-mima" ></span>
          </div>
          <div class="aui-list-item-input">
            <input  type="password" class="aui-text-left aui-text-default"  maxlength="11"
                    placeholder="请再次输入密码" v-model="confirmpassword">
          </div>
        </div>
      </li>
    </ul>
    <div class="mainbtn-main" style="margin-top: 5rem" @click="doRegister" >{{btntext}}</div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  var type = '';       //进入页面的类型
  import SIdentify from '../../components/page/identify.vue';
  import { MessageBox } from 'mint-ui';
  export default {
    components: {
      's-identify':SIdentify
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return {
        type : '',                             //1：账号注册，2：忘记密码
        title :'',                             //页头显示内容
        btntext : '',                          
        identifyCodes: "1234567890",          //验证码从数字中生成
        identifyCode: "",                      //验证码
        identifyCodeInput : "",                //输入的验证码
        phonenum : '',
        invite : '',                           //邀请码
        phoneidentifyCodeInput :'',            //（短信收到的）输入的验证码
        password : '',
        confirmpassword : '',
        interval : null                        //邀请码定时器
      }
    },
    methods :{
      //初始化
      init :function (type) {
        self.makeCode(self.identifyCodes, 4);
        self.type = type;
        if(type == "1"){
          self.title = "注册";
          self.btntext= "注册";
        }else if (type == "2"){
          self.title = "忘记密码";
          self.btntext= "确定并登录";
        }
      },
      //验证码校验
      checkIdenty : function () {
        if(self.identifyCodeInput == ""){
          MessageBox('提示', '请先输入图片验证码');
          self.refreshCode();
        }else if (self.identifyCode != self.identifyCodeInput){
          MessageBox('提示', '验证码输入错误，请重试');
          self.refreshCode();
        }
      },
      checkPhonenum : function () {
        var phonenum = self.phonenum;
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!self.phonenum){
          MessageBox('提示', '请先输入手机号');
          return false;
        }
        if (!myreg.test(phonenum)) {
          MessageBox('提示', '手机号输入错误');
          return false;
        } else {
          return true;
        }
      },
      //获得短信验证码
      getcaptcha: function () {
        if(self.checkPhonenum() == false)
        {
          return false;
        }
        var countdown = 60;
        document.getElementById("getcaptchabtn").innerText = countdown.toString() + "s";
        //开始计时
        self.interval = setInterval(function () {
          countdown = countdown - 1;
          document.getElementById("getcaptchabtn").innerText = countdown.toString() + "s";
          document.getElementById("getcaptchabtn").disabled = true;
          if (countdown < 0) {
            //60s失败时重置按钮
            document.getElementById("getcaptchabtn").innerText = "重新发送";
            document.getElementById("getcaptchabtn").disabled = false;
            countdown = 60;
            clearInterval(self.interval);
          }
        }, 1000);
        if(self.type == "1"){
          self.api.doc_validateNewPhonenum({phonenum : self.phonenum}).then((res) => {
            //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.result == false)
          {
            MessageBox('提示',JSON.stringify(res.data.message).replace(/"/g,""));
            clearInterval(self.interval);
            document.getElementById("getcaptchabtn").disabled = false;
            document.getElementById("getcaptchabtn").innerText = "获取验证码";
            return false;
          }
        }).catch((err) => {
            self.common.consoledebug.log("err:" + JSON.stringify(err));
          MessageBox('提示', '发送验证码失败!');
        });
        }else {
          self.api.yaoshi_doSendMessageToOldPhone({login_name : self.phonenum}).then((res) => {
            //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.result == false)
          {
            MessageBox('提示',JSON.stringify(res.data.message).replace(/"/g,""));
            clearInterval(self.interval);
            document.getElementById("getcaptchabtn").disabled = false;
            document.getElementById("getcaptchabtn").innerText = "获取验证码";
            return false;
          }
        }).catch((err) => {
            self.common.consoledebug.log("err:" + JSON.stringify(err));
          MessageBox('提示', '发送验证码失败!');
        });
        }
      },
      //以下为验证码相关函数////
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        self.identifyCode = "";
        self.makeCode(self.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          self.identifyCode += self.identifyCodes[
            self.randomNum(0, self.identifyCodes.length)
            ];
        }
      },
      //注册操作
      doRegister : function () {
        //校验
        if(self.checkPhonenum() == false)
        {
          return false;
        }
        if(self.checkIdenty() == false)
        {
          return false;
        }
        if(self.password == "" || self.confirmpassword == ""){
          MessageBox('提示', '密码不能为空');
          return false;
        }else if(self.password != self.confirmpassword){
          MessageBox('提示', '两次输入的密码必须一致');
          return false;
        }
        //注册
        if(self.type == "1"){
          self.api.doc_doRegister({phonenum : self.phonenum, password : self.password, sm_validate : self.phoneidentifyCodeInput, fwh_openid : localStorage.getItem("fwh_openid")}).then((res)=>{
            //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.result == false) {
            MessageBox('提示', JSON.stringify(res.data.message).replace(/"/g, ""));
            clearInterval(self.interval);
            return false;
          }
          clearInterval(self.interval);
          MessageBox('提示', "注册成功!");
          setTimeout(self.common.jumpToPage({router: self.$router, url : "../login"}),1000);
          }).catch((err)=>{
            self.common.consoledebug.log("err:" + JSON.stringify(err));
          })
        }else{
          //忘记密码
          self.api.doc_forgetPWD({phonenum : self.phonenum, password : self.password, sm_validate : self.phoneidentifyCodeInput,fwh_openid : localStorage.getItem("fwh_openid")}).then((res)=>{
            //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.result == false) {
            MessageBox('提示', JSON.stringify(res.data.message).replace(/"/g, ""));
            return false;
          }
          MessageBox('提示', "找回密码成功!");
          setTimeout(self.common.jumpToPage({router: self.$router, url : "../login"}),1000);
        }).catch((err)=>{
            self.common.consoledebug.log("err:" + JSON.stringify(err));
        })
        }
      },
      clickBack : function () {
        clearInterval(self.interval);
        self.common.clickBack();
      }
    },
    mounted() {
      type = self.$route.query.type;
      self.init(type);   //初始化页面
    }
  }

</script>
<style scoped>
</style>
