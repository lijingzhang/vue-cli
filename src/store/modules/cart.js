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
  addCart({commit}, {shopid, shopname, pic_url, food_id, price, name, foods_pic}) {  //店铺menu列表页面加入购物车
    commit('ADD_CART', {shopid, shopname, pic_url, food_id, price, name, foods_pic})
  },
  reduceCart({commit}, {shopid, food_id}) {        //店铺menu列表页面减少购物车商品
    commit('REDUCE_CART', {shopid, food_id})
  },
  deleteFood({commit}, {shopid, food_id}) {   //购物车页面删除购物车商品
    commit('DELETE_CART', {shopid, food_id})
  },
  // emptyCart({commit}, {restaurant_id}) {
  //   commit('EMPTY_CART', {restaurant_id});
  // },

}

//mutations
const mutations = {
  //加入购物车
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
    if (restaurant[food_id]) {    //如果该商品已经在保存了  数量加1
      restaurant[food_id].num++;
    } else {
      restaurant[food_id] = {   //初始化该商品
        name,
        price,
        foods_pic,
        num: 1,
        id: food_id,
      }
    }
    state.cartList = {...cart}
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
    localStorage.setItem('confirmOrder', JSON.stringify(state.cartList));
  },
  // //减购物车
  [types.REDUCE_CART](state, {shopid, food_id}) {
    let cart = state.cartList;
    let restaurant = cart[shopid];
    //修改购物车总价格
    restaurant.totalPrice = Number((restaurant.totalPrice - restaurant[food_id].price).toFixed(2));
    restaurant.totalNum--;
    if (restaurant.totalNum === 0) {
      delete(cart[shopid]);
    } else if (restaurant[food_id].num === 1) {
      delete(restaurant[food_id]);
    } else {
      restaurant[food_id].num--;
    }
    state.cartList = {...cart};
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
    localStorage.setItem('confirmOrder', JSON.stringify(state.cartList));
  },
 
  // //删除购物车商品
    //删除食物
    [types.DELETE_CART](state, {shopid,food_id}) {
      let cart = state.cartList;
      let restaurant = cart[shopid];
      let num = restaurant[food_id].num;
      let price =  restaurant[food_id].price;
      restaurant.totalNum -= num;
      delete(restaurant[food_id]);
      if (restaurant.totalNum === 0) {
        delete(cart[shopid]);
      } else {
        restaurant.totalPrice = Number((restaurant.totalPrice - price * num).toFixed(2)); //修改价格
      }
      state.cartList = {...cart};
      localStorage.setItem('cartList', JSON.stringify(state.cartList));
      localStorage.setItem('confirmOrder', JSON.stringify(state.cartList));
    },
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
