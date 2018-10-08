import Vue from 'vue'
import footer from './footer.vue' //footer
Vue.component('v-footer',footer); //footer

import header from './header.vue' //header
Vue.component('v-header',header); //header

import pullrefresh from './pull-refresh.vue' //v-scroll
Vue.component('v-scroll',pullrefresh); //v-scroll

export default {
    back(){
        var self=this;
        self.$router.go(-1)
    }, //返回上一页
    skip:function(a){
   
       console.log(123)
    },   //点击页面跳转
 /**
    * 判断字符串是否为空
    * @param str
    * @returns {boolean}
    */
    isNull(str) {
       return str == null || str.length === 0 || str === '';
   },

   /**
    *
    * @desc  判断是否为身份证号
    * @param  {String|Number} str
    * @return {Boolean}
    */
    isIdCard(str) {
       return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
   },

   /**
    *
    * @desc   判断是否为手机号
    * @param  {String|Number} str
    * @return {Boolean}
    */
    isPhoneNum(str) {
       return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
   }
  }
  
