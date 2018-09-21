import {_post,_get} from './index'

// 提交订单
export const postOrder = (data) =>{
    let req = {
      data:data,
      url:'v1/order'
    }
  
    return _post(req)
  }

  // 支付页面获取订单信息 // 获取历史订单详细页
export const getOrder = (data) =>{
    let req = {
      url:'v1/order/'+data
    }
  
    return _get(req)
  }


  // 获取历史订单
  export const getOrderList = (data) =>{
    let req = {
      url:'v1/orders'
    }
  
    return _get(req)
  }





