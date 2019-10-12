//页面调用接口方法
import axios from 'axios'
import qs from 'qs'

import {Indicator, Toast} from 'mint-ui';
import {consoledebug} from "./common";

//业务名
const BUSI_NAME = "mbgl";   //慢病管理

//调试标志符
const DEBUG_FLAG = localStorage.getItem("DEBUG_FLAG");
let base = '';
if( DEBUG_FLAG == 'true'){
   base = 'http://lljiankang.top/';
}else{
   base = 'http://de.lljiankang.top/';
}
// const DEBUG_FLAG = true;
// let base = DEBUG_FLAG ? 'http://de.lljiankang.top/' : 'http://de.lljiankang.top/'; //基础接口

// axios 配置
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = base

// request拦截器
axios.interceptors.request.use((config) => {
  // consoledebug.log("axios.interceptors.request config:" + JSON.stringify(config));   //调试用
  //统一配置user_id和token
  if (config.method == "get") {

  }
  if (config.method == "post") {
    // if (!config.data.hasOwnProperty('user_id') && config.url != 'api/doctor/login/login' && config.url != 'doctor/login/forgetPWD') {
    //   if (window.localStorage.getItem("user_id") && !judgeIsNullStr(window.localStorage.getItem("user_id"))) {   //如果存在user_id
    //     config.data.user_id = window.localStorage.getItem("user_id");
    //   }
    //   if (window.localStorage.getItem("token") && !judgeIsNullStr(window.localStorage.getItem("token"))) {   //如果存在token
    //     config.data.token = window.localStorage.getItem("token");
    //   }
    // }
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  // consoledebug.log("axios.interceptors.request err:" + JSON.stringify(error));
  return Promise.reject(error);
});

//response拦截器
axios.interceptors.response.use((res) => {
  // consoledebug.log("res:" + JSON.stringify(res));    //调试用
  Indicator.close();
  return res;
}, (error) => {
  //404等问题可以在这里处理
  Indicator.close();
  return Promise.reject(error);
});

/*
 * axios ajax请求
 *
 * @params 参数
 * @url 链接
 * @method 方法
 * @success_callback
 * @error_callback
 *
 */
function axios_ajax(url, params, method, loadding_flag) {

  //请注意，配置param，包括放入user_id和token，应该在request拦截器中实现
  //consoledebug.log("axios_ajax method:" + method + " url:" + url + "  params:" + JSON.stringify(params));
  //加载图标
  if (loadding_flag) {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  }

  //GET方式
  if (method.toUpperCase() == "GET") {
    return axios({
      url: url,
      method: 'get',
      params: params
    })
  }

  //POST方式
  if (method.toUpperCase() == "POST") {
    return axios({
      url: url,
      method: 'post',
      data: params
    })
  }

}


//以下为接口调用的封装/////////////////////////////////////////////////////////////

//数组常量
export const yaoshi_getUtils = params => {
  return axios_ajax('api/common/utils', params, 'GET', false);
}

//login
export const yaoshi_doLogin = params => {
  return axios_ajax('api/pharmacist/login/login', params, 'POST', true);
}
//logOut
export const yaoshi_logOut = params => {
  return axios_ajax('api/pharmacist/login/logOut', params, 'POST', false);
}
//忘记密码
export const doc_forgetPWD = params => {
  return axios_ajax('api/doctor/login/forgetPWD', params, 'POST', false);
}
//发送验证码
export const yaoshi_doSendMessageToOldPhone = params => {
  return axios_ajax('api/pharmacist/login/validateOldPhonenum', params, 'GET', true);
}

// //审核文章列表
// export const yaoshi_getArticleList = params => {
//   return axios_ajax('api/pharmacist/article/test/articleList', params, 'GET', true);
// }

//审核文章列表
export const yaoshi_getArticleList = params => {
  return axios_ajax('api/pharmacist/article/shenhe/articleList', params, 'GET', true);
}

// //审核文章
// export const yaoshi_doArticleShenhe = params => {
//   return axios_ajax('api/pharmacist/article/test/shenhe', params, 'POST', false);
// }

//审核文章
export const yaoshi_doArticleShenhe = params => {
  return axios_ajax('api/pharmacist/article/shenhe/shenhe', params, 'POST', false);
}
//审核文章详情
export const doc_getSHArticle = params => {
  return axios_ajax('api/doctor/article/shenhe/article', params, 'GET', false);
}
//获取文章来源
export const doc_getArticleSource = params => {
  return axios_ajax('api/doctor/article/source', params, 'GET', false);
}

//进行方法输出
export default{
  axios_ajax,   //基础axios方法封装
  yaoshi_getUtils,
  yaoshi_doLogin,
  doc_forgetPWD,
  yaoshi_getArticleList,
  doc_getSHArticle,
  doc_getArticleSource,
  yaoshi_doArticleShenhe,
  yaoshi_logOut,
  yaoshi_doSendMessageToOldPhone,
}



