import {_get} from './index'

//定位当前位置
export const location = (data) =>{
    let req = {
      data,
      url:'v1/location'   
    }
  
    return _get(req)
  }

//收货地址
  export const all_address = (data) =>{
    let req = {
      data,
      url:'admin/all_address'   
    }
  
    return _get(req)
  }
  

//新增收货地址
export const add_address = (data) =>{
  let req = {
    data:data,
    url:'admin/address'   
  }

  return _get(req)
}





