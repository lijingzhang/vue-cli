import * as types from '../mutation-types'
import {location,all_address} from '@/api/location'
const state={
    address:{
        address:'定位中...',
        lat: '',
        lng: '',
    },
    deliveryAddress: {},
    locationReady: false,   //定位是否完成
    newdeliveryAddress: {}  //新增地址定位记录地址
}

const getters={
    address:state=>state.address,
    deliveryAddress:state=>state.deliveryAddress,
    locationReady: state => state.locationReady,
    newdeliveryAddress: state => state.newdeliveryAddress,
}

const actions={
    locationAddr({commit,state}){ //获取定位地址
        location().then(res => {
            if(res.data.status==200){
                let addr=res.data.data; 
                commit(types.RECORD_ADDRESS,{localaddress:addr.address,...addr.location})//保存地址 和 经纬度到VUEX中
                commit(types.LOCATION_READY, true);    //定位完成 拉取商店
            }
        })
    },
    selectAddr({commit,state},address){ //选定的地址
        commit(types.SELECT_ADDRESS,address)//保存选定的地址到VUEX中
    },
    recordAddress({commit}, localaddress) {  //重置位置
        commit(types.RECORD_ADDRESS, localaddress) //保存title 和 经纬度到VUEX中
        commit(types.LOCATION_READY, true);    //定位完成 拉取商店
      },
      clearAddress({commit, state}) {  //清除位置
        commit(types.CLEAR_ADDRESS);
      },
      saveNewAddr({commit,state},address){ //选定的地址
        commit(types.NEW_DELIVERY_ADDRESS,address)//保存选定的地址到VUEX中
    },
}

const mutations={
    [types.RECORD_ADDRESS](state,localaddress){  
       state.address={...localaddress}   //地址真正赋值给location
    },
    [types.SELECT_ADDRESS](state,address){  
        state.deliveryAddress={...address}   
     },
     [types.NEW_DELIVERY_ADDRESS](state,address){  
        state.newdeliveryAddress={...address}   
     },
       //定位完成拉取附近餐馆
    [types.LOCATION_READY](state, boolean) {
        state.locationReady = boolean;
    },

    [types.CLEAR_ADDRESS](state) {
        let address = {address: '定位中...', lat: '', lng: ''}
        state.address = {...address};
      },
}

export default{
    state,
    getters,
    actions,
    mutations
}