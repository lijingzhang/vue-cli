// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'//路由器
import Element from 'element-ui' //引入饿了么ui框架
import 'element-ui/lib/theme-chalk/index.css'  //引入样式
import './components/components.js' //加载公共组件脚本
import './assets/scss/common.scss'                      //加载公共样式
import common from './assets/js/common.js'            //加载公共脚本
import axios from 'axios'  
import store from './store'
import * as filters from './assets/js/filters.js'  //过滤器
import querystring from 'querystring'
import VueScroller from 'vue-scroller'        //下拉

Vue.use(VueScroller)
Vue.prototype.$http = axios
Vue.prototype.$qs = querystring;
Vue.use(Element);
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$common = common
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})  
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})
Vue.config.productionTip = false

// const host = process.env.NODE_ENV === 'development' ? '/api' : 'https://api.douban.com/v2/movie' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
// const instance = axios.create({
//   baseURL: host
// })
// Vue.prototype.$http = instance
/* eslint-disable no-new */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

