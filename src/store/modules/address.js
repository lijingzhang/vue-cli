import * as types from '../mutation-types'
import {location} from '@/api/location'
const state={
    address:{
        address:'定位中...',
        lat: '',
        lng: '',
    },
}

const getters={
    address:state=>state.address,
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
    
}

const mutations={
    [types.RECORD_ADDRESS](state,localaddress){  
       state.address={...localaddress}   //地址真正赋值给location
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}