//Vuex封装

import Vue from 'vue';
import Vuex from 'vuex';
import {consoledebug} from "../assets/js/common";

Vue.use(Vuex)


//该应用目前用于返回页面指定位置
export const store = new Vuex.Store({
  state: {
    indexScrollY: 0,      //首页列表位置
    circleScrollY: 0,     //朋友圈列表位置
  },
  getters: {
    recruitScrollY: state => state.recruitScrollY
  },
  mutations: {
    changeIndexScrollY(state, recruitScrollY) {
      // consoledebug.log("before route changeIndexScrollY recruitScrollY:" + recruitScrollY);
      state.indexScrollY = recruitScrollY         //首页列表位置
    },
    changeCircleScrollY(state, recruitScrollY) {
      // consoledebug.log("before route changeCircleScrollY recruitScrollY:" + recruitScrollY);
      state.circleScrollY = recruitScrollY         //朋友圈列表位置
    }
  },
  actions: {},
  modules: {}
})
