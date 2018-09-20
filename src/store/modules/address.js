import * as types from '../mutation-types'
import {location,all_address} from '@/api/location'
const state={
    address:{
        address:'定位中...',
        lat: '',
        lng: '',
    },
    deliveryAddress: {}
}

const getters={
    address:state=>state.address,
    deliveryAddress:state=>state.deliveryAddress,
}

const actions={
    locationAddr({commit,state}){ //获取定位地址
        location().then(res => {
            if(res.data.status==200){
                let addr=res.data.data; 
                commit(types.RECORD_ADDRESS,{localaddress:addr.address,...addr.location})//保存地址 和 经纬度到VUEX中
            }
        })
    },
    selectAddr({commit,state},address){ //选定的地址
        commit(types.SELECT_ADDRESS,address)//保存选定的地址到VUEX中
    },
    
}

const mutations={
    [types.RECORD_ADDRESS](state,localaddress){  
       state.address={...localaddress}   //地址真正赋值给location
    },
    [types.SELECT_ADDRESS](state,address){  
        state.deliveryAddress={...address}   
     },
}

export default{
    state,
    getters,
    actions,
    mutations
}