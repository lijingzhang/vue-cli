// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/'//路由器
import Element from 'element-ui' //引入饿了么ui框架
import 'element-ui/lib/theme-chalk/index.css'  //引入样式
import './components/components.js' //加载公共组件脚本
import './css/common.css' //加载公共样式
import axios from 'axios'  //使用API所需

Vue.prototype.$http = axios
Vue.use(Element);
Vue.use(VueRouter)


const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
