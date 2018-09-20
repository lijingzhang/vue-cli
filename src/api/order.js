import {_post,_get} from './index'

// 提交订单
export const postOrder = (data) =>{
    let req = {
      data:data,
      url:'v1/order'
    }
  
    return _post(req)
  }

  // 提交订单
export const getOrder = (data) =>{
    let req = {
      url:'v1/order/'+data
    }
  
    return _get(req)
  }







