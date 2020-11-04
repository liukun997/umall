import axios from "axios";
import qs from "qs";
import { errorAlert } from "./alert";
import Vue from "vue";
// //开发环境中使用 localhost:8080
let baseUrl = "/api";
Vue.prototype.$imgPre = "http://localhost:3000";

// let baseUrl = '';
// Vue.prototype.$imgPre = '';
// 响应拦截
axios.interceptors.response.use(res => {
  console.log("本次请求的地址是：" + res.config.url);
  console.log(res);
  // 请求失败弹的弹框
  if (res.data.code != 200) {
    errorAlert(res.data.msg);
  }
  return res;
});
//生产环境 打包
// let baseUrl = ""

//菜单添加
export const reqMenuAdd = form => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  });
};
//菜单详情 一条
export const reqMenuDetail = id => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
//菜单更新
export const reqMenuUpdate = form => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  });
};
//菜单删除
export const reqMenuDel = id => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
//菜单列表
export const reqMenuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  });
};
// 角色添加
export const reqRodeAdd = form => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(form)
  });
};

// 角色列表
export const reqRodeList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  });
};

// 角色详情
export const reqRodeDetail = id => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 修改角色
export const reqRodeUpdata = form => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(form)
  });
};
// 删除角色
export const reqRodeDel = id => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// ===================================================================
// 管理员添加
export const reqUserAdd = form => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(form)
  });
};
// 管理员列表
export const reqUserList = params => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: params
  });
};
// 管理员一条数据
export const reqUserListOne = uid => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  });
};
// 管理员修改
export const reqUserEdit = form => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(form)
  });
};
// 管理员删除
export const reqUserDel = uid => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  });
};
// 管理员总数
export const reqUserCount = uid => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get"
    // params:''
  });
};

// 分类添加
export const reqCateAdd = data => {
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  });
};
// 分类列表
export const reqCateList = params => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: params
  });
};
// 分类详情
export const reqCateDetail = id => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 分类修改
export const reqCateUpdata = form => {
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: form
  });
};
// 分类删除
export const reqCateDel = id => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// ===================================================================
// 商品规格添加
export const reqSpecAdd = data => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: data
  });
};
// 商品规格总数分页
export const reqSpecCount = data => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  });
};
// 商品规格列表
export const reqSpecList = params => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: params
  });
};
//  商品规格详情 {id:1}
export const reqSpecDetail = id => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 商品规格修改
export const reqSpecsUpdata = form => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(form)
  });
};
// 商品规格删除
export const reqSpecsDel = id => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};

// 商品管理添加
export const reqGoodsAdd = data => {
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: form
  });
};
// 商品管理总数分页
export const reqGoodsCount = data => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  });
};
// 商品管理列表
export const reqGoodsList = params => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: params
  });
};
//  商品管理详情 {id:1}
export const reqGoodsDetail = id => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 商品管理修改
export const reqGoodsUpdata = form => {
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: qs.stringify(form)
  });
};
// 商品管理删除
export const reqGoodsDel = id => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// ================================================================
// 会员增
export const reqMemberAdd = form => {
  return axios({
    url: baseUrl + "/api/memberadd",
    method: "post",
    data: qs.string(form)
  });
};
// 会员列表
export const reqMemberList = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get"
  });
};
// 会员查
export const reqMemberListOne = uid => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: uid
  });
};
// 会员修改
export const reqMemberEdit = form => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: form
  });
};

// =================================================================
// 轮播图增
export const reqBannerAdd = form => {
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: form
  });
};
// 轮播图list
export const reqBannerList = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get"
  });
};
// 查
export const reqBannerListOne = id => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: { id: id }
  });
};
// 编辑
export const reqBannerEdit = form => {
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: form
  });
};
// 删除
export const reqBannerDel = id => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};
// -----------------------登录-----------------------
export const reqLogin=(form)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(form)
    })
}