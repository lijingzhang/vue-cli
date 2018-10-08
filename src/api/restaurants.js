import {_get} from './index'

// 获取餐馆列表
export const getRestaurants = (data) =>{
    let req = {
      data:data,
      url:'v1/restaurants'
    }
  
    return _get(req)
  }

  // 获取餐馆详细信息
export const getRestaurantInfo = (data) =>{
    let req = {
      url:'v1/restaurant/'+data.shopid
    }
  
    return _get(req)
  }

   // 获取餐馆menu
export const getRestaurantMenu = (data) =>{
    let req = {
      url:'v1/food/'+data
    }
  
    return _get(req)
  }