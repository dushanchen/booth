import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import "./assets/style/index.scss"; // 公共样式
import "./assets/style/icon.scss"; // 公共样式
import "./assets/style/bg.scss"; // 公共样式
import '@babel/polyfill';

import VueWechatTitle from "vue-wechat-title"; // 修改标题

Vue.config.productionTip = false;
Vue.use(VueWechatTitle); // 修改标题

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
