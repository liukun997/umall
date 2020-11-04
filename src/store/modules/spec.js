import { reqSpecList, reqSpecCount } from "../../utils/request";
let state = {
  list: [],
  total: 0,
  size: 2,
  page: 1
};
// console.log(state.list);
let mutations = {
  // 修改list
  changeList(state, arrs) {
    state.list = arrs;
  },
  // 修改总数
  changeTotal(state, num) {
    state.total = num;
  },
  // 修改页码数目
  changePage(state, page) {
    state.page = page;
  }
};
let actions = {
  // 获取列表的逻辑
  reqListAction(context) {
    reqSpecList({ page: context.state.page, size: context.state.size }).then(
      res => {
        if (res.data.code === 200) {
          // console.log(res);
          let list = res.data.list ? res.data.list : [];
          // 修改数据
          if (list.length == 0 && context.state.page > 1) {
            context.commit("changePage", context.state.page - 1);
            context.dispatch("reqListAction");
            return;
          }

          list.forEach(item => {
            item.attrs = JSON.parse(item.attrs);
          });
          context.commit("changeList", list);
        }
      }
    );
  },
  // 获取总数的逻辑
  reqTotalAction(context) {
    reqSpecCount().then(res => {
      if (res.data.code === 200) {
        context.commit("changeTotal", res.data.list[0].total);
      }
    });
  },
  // 修改页码
  changePageAction(context, page) {
    // 修改页码
    context.commit("changePage", page);
    // 从新请求list
    context.dispatch("reqListAction");
  }
};
let getters = {
  list(state) {
    return state.list;
  },
  total(state) {
    return state.total;
  },
  size(state) {
    return state.size;
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
