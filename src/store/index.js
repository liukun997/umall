import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import actions from "./actions";
import { state, mutations, getters } from "./mutations";

import order from "./modules/order";
import cate from "./modules/cate";
import spec from "./modules/spec";
import member from './modules/member'
//创建仓库
const store = new Vuex.Store({
  //根级别下的state,mutations,getters,actions,比如用户登录后的用户信息
  //数据
  state,
  //专门修改state中的数据
  mutations,
  //逻辑 异步
  actions,
  //将状态层的数据，导出给组件使用
  getters: getters,

  //模块
  modules: {
    order,
    cate,
    spec,
    member
  }
});
export default store;
