import Vue from "vue";
import App from "./App";
import $request from "./common/ajax";   // 路径需根据项目实际情况
import { baseUrl } from './common/config.default.js';
// import navBar from "@/components/mz-nav-bar/index.vue";
// 配置公共方法

// uni.showToast方法
const msg = (title, callback = () => {}, duration = 1500, mask = true, icon = "none") => {
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
    success: function() {
      setTimeout(callback, duration);
    }
  });
};

// 跳转到页面
const toPage = (path, root = "pages") => {
  uni.navigateTo({
    url: `/${root}/${path}`
  });
};

const toPageA = (path, root = "packageA") => {
  uni.navigateTo({
    url: `/${root}/${path}`
  });
};



const toPackPage = (path, root) => {
  uni.navigateTo({
    url: `/${root}/${path}`
  });
};

// 跳转到switchTab
const toTab = (path) => {
  uni.switchTab({
    url: `/pages/${path}`
  });
};

const toReLaunch = (path, root = "pages") => {
  uni.reLaunch({
    url: `/page/${path}`
  });
};

// 跳转到页面 -> 关闭当前页面
const redirectTo = (path, root = "pages") => {
  uni.redirectTo({
    url: `/${root}/${path}`
  });
};
// 调用uni-popup open方法
// const openPopup = ($refs, ref) => {
//   $refs[ref].open()
// }

// 调用uni-popup close方法
// const closePopup = ($refs, ref) => {
//   $refs[ref].close()
// }

// prePage
const prePage = () => {
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  // #ifdef H5
  return prePage;
  // #endif
  return prePage.$vm;
};

Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$request = $request;
// Vue.prototype.$ajax = $ajax;
// Vue.prototype.$host_url = $host_url;
// Vue.prototype.$upload_rl = $host_url + "/com"; // 上传域名
Vue.prototype.$api = {
  msg,
  toPage,
  toPackPage,
  toTab,
  redirectTo,
  toReLaunch,
  // openPopup,
  // closePopup,
  prePage
};
Vue.prototype.$needLogin = () => {
  uni.showToast({
    title: "请登录后操作~",
    icon: "none",
    duration: 500,
    success() {
      setTimeout(() => {
        try {
          uni.clearStorage();
        } catch (e) {
          //TODO handle the exception
        }
        uni.reLaunch({
          url: "/pages/login/index"
        });
      }, 500);
    }
  });
};

Vue.config.productionTip = false;
// Vue.component("nav-bar", navBar);

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
