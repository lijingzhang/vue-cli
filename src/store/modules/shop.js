import * as types from '../mutation-types'
import {getRestaurantInfo} from '@/api/restaurants'
const state={
    shopInfo:{},    //店铺信息  
}

const getters={
    shopInfo:state=>state.shopInfo,

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
  
    
}

const mutations={
    [types.SHOPINFO](state,shopInfo){  
       state.shopInfo={...shopInfo}   //地址真正赋值给stata.shopInfo
    },
   
}

export default{
    state,
    getters,
    actions,
    mutations
}