import * as types from '../mutation-types'
import {getRestaurantInfo,getRestaurantMenu} from '@/api/restaurants'
const state={
    shopInfo:{},    //店铺信息  
   shopMenu:{},   //店铺菜单
}

const getters={
    shopInfo:state=>state.shopInfo,
    shopMenu:state=>state.shopMenu,
}

const actions={
    getRestaurantInfo({commit,state},shopid){ //获取店铺详细信息  shopid为传参
      
        getRestaurantInfo({shopid}).then(res => {
            if(res.data.status==1){
                let shopInfo=res.data.data; 
                commit(types.SHOPINFO,shopInfo);

            }
        })
    },
    getRestaurantMenu({commit,state},footid){ //获取店铺menu
        getRestaurantMenu({footid}).then(res => {
            if(res.data.status==200){
                let shopMenu=res.data.data; 
                commit(types.SHOPMENU,shopMenu)
            }
        })
    },
    
}

const mutations={
    [types.SHOPINFO](state,shopInfo){  
       state.shopInfo={...shopInfo}   //地址真正赋值给stata.shopInfo
    },
    [types.SHOPMENU](state,shopMenu){  
        state.shopMenu={...shopMenu}   
     }
}

export default{
    state,
    getters,
    actions,
    mutations
}