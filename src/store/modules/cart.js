import * as types from '../mutation-types'


const state = {
  cartList: {},      //加入购物车列表

}

//getters
const getters = {
  cartList: state => state.cartList,
 
}

//actions
const actions = {
  addCart({commit}, {shopid, shopname, pic_url, food_id, price, name, foods_pic}) {
    commit('ADD_CART', {shopid, shopname, pic_url, food_id, price, name, foods_pic})
  },
  // reduceCart({commit}, {restaurant_id, food_id}) {
  //   commit('REDUCE_CART', {restaurant_id, food_id})
  // },

  // emptyCart({commit}, {restaurant_id}) {
  //   commit('EMPTY_CART', {restaurant_id});
  // },

}

//mutations
const mutations = {
  [types.ADD_CART](state, {shopid, shopname, pic_url, food_id, price, name, foods_pic}) {
    let cart = state.cartList;
    let restaurant;
    if(!cart[shopid]){
      restaurant= cart[shopid]={
        totalPrice:0, //总价格=
        totalNum:0,  //总数量
        shopname,   //餐馆名
        pic_url    //餐馆图片
      }
    }
    else{
      restaurant=cart[shopid]
    }
    restaurant.totalPrice=(Number(restaurant.totalPrice)+Number(price)).toFixed(2);   //计算总价格
    restaurant.totalNum++;   //数量加一
    if (restaurant[food_id]) {    //如果该食物已经在保存了  数量加1
      restaurant[food_id].num++;
    } else {
      restaurant[food_id] = {   //初始化该食物
        name,
        price,
        foods_pic,
        num: 1,
        id: food_id,
      }
    }
    state.cartList = {...cart}
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  // //减购物车
  // [types.REDUCE_CART](state, {restaurant_id, food_id}) {
  //   let cart = state.cartList;
  //   let restaurant = cart[restaurant_id];
  //   //修改购物车总价格
  //   restaurant.totalPrice = Number((restaurant.totalPrice - restaurant[food_id].price).toFixed(2));
  //   restaurant.totalNum--;
  //   if (restaurant.totalNum === 0) {
  //     delete(cart[restaurant_id]);
  //   } else if (restaurant[food_id].num === 1) {
  //     delete(restaurant[food_id]);
  //   } else {
  //     restaurant[food_id].num--;
  //   }
  //   state.cartList = {...cart};
  //   localStorage.setItem('cartList', JSON.stringify(state.cartList));
  // },
 
  // //清空购物车
  // [types.EMPTY_CART](state, {restaurant_id}) {
  //   let cart = state.cartList;
  //   delete cart[restaurant_id];
  //   state.cartList = {...cart};
  //   localStorage.setItem('cartList', JSON.stringify(state.cartList));
  // },
 
}

export default {
  state,
  getters,
  actions,
  mutations
}
