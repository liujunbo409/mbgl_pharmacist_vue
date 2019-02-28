import Vue from 'vue'
import Router from 'vue-router'
// import login from '../views/login/login'
// import register from '../views/login/register'
// import assessarticle from '../views/assessarticle/index'
// import assessarticledetail from '../views/assessarticle/detail'
Vue.use(Router)
let routers = [
  {
    path: '/',
    redirect: '/assessarticle'
  },
  //登录页面
  {
    path: '/login',
    name: 'login',
    //component : login,
    component: resolve => require(['@/views/login/login'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //忘记密码页面
  {
    path: '/register',
    name: 'register',
    //component : register,
    component: resolve => require(['@/views/login/register'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //审核文章列表页面
  {
    path: '/assessarticle',
    name: 'assessarticle',
    //component : assessarticle,
    component: resolve => require(['@/views/assessarticle/index'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //审核文章详情页面
  {
    path: '/assessarticle/detail',
    name: 'assessarticledetail',
    //component : assessarticledetail,
    component: resolve => require(['@/views/assessarticle/detail'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
];
export default new Router({
  mode: 'history',  // 默认hash
  base: '/pharmacist/h5/vue',  // 基础路径
  routes: routers,    //统一管理路由
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  },
})
