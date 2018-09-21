// import list from '@/pages/list/list'
import index from '@/pages/index'
import login from '@/pages/login'

import category from '@/pages/category/category'  //测试
import list from '@/pages/category/list'  
import test from '@/pages/category/test'  

import shop from '@/pages/shop/shop' 
import shopList from '@/pages/shop/shopList' 
import shopAll from '@/pages/shop/shopAll' 
import seller from '@/pages/shop/seller' 
import comment from '@/pages/shop/comment' 
import menu from '@/pages/shop/menu' 
import orderConfirm from '@/pages/order/order_confirm' 
import address from '@/pages/order/address' 
import add_address from '@/pages/order/add_address'
import pay from '@/pages/order/pay'
import orderList from '@/pages/order/orderList'
import orderShow from '@/pages/order/orderShow'

import cart from '@/pages/cart/cart'

import centerindex from '@/pages/center/index'
export default[
    {
      path: '/',
      redirect: '/login'   // 当访问根目录的时候默认跳转到主页
    },

    {
      path: '/index',
      component: index
    },
    {
      path: '/category',
      component: category
    },
    {
      path: '/category',
      component: category,
      children: [
        {path: '/list',component: list}, 
       
      ]
    },
    {
      path: '/login',
      component: login
    },

    {
      path: '/test',
      component: test
    },
    {
      path: '/shop',
      component: shop,
      children: [
        {path: '/comment',component: comment}, 
        {path: '/seller',component: seller}, 
        {path: '/menu',component: menu}, 
      ]
    },
    {
      path: '/shopList',
      component: shopList,
      children: [
        {path: '/shopAll',component: shopAll}, 
       ]
    },
    {
      path: '/orderConfirm',
      component: orderConfirm,
      children: [
        {path: '/address',component: address}, 
      ]
     
    },
  
    {
      path: '/add_address',
      component: add_address,
     
    },
    {
      path: '/pay',
      component: pay,
     
    },
    {
      path: '/cart',
      component: cart,
     
    },
    {
      path: '/centerindex',
      component: centerindex,
     
    },
    {
      path: '/orderList',
      component: orderList,
     
    },
    {
      path: '/orderShow',
      component: orderShow,
     
    },
    
  ]

