import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Antd);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

const getRole = () => store.state.role;

router.beforeEach((to, from, next) => {
  store.commit("addOpenTag", {
    name: to.name,
    path: to.path,
    text: to.meta.text || ""
  });
  if (to.matched.some((record) => record.meta.role === "admin")) {
    if (getRole() === "admin") {
      return next(); // 一定要return next()
    }
    next("/");
    app.$message.error("需要管理员才能访问");
    window.resetSelectKeys && window.resetSelectKeys();
  } else {
    next();
  }
});
