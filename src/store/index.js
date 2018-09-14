import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import cart from './modules/cart'
import shop from './modules/shop'
import address from './modules/address'

export default new Vuex.Store({
	modules: {
	  cart,
	  shop,
		address
	}
  })