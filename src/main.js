import Vue from "vue"
import App from "./App.vue"
import TypeNav from "@/components/TypeNav"
import Pagination from '@/components/Pagination'
import VueLazyload from "vue-lazyload"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import loading from "@/assets/loading.gif"//引入图片懒加载的gif

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name,Pagination)

Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:loading
})

import "@/plugins/validate"//引入表单验证插件

import router from "@/router"
import store from "@/store"

Vue.config.productionTip = false

//引入mock模拟数据
import "@/mock/mockserve"

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount("#app")
