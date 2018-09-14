import {_get} from './index'

//定位当前位置
export const location = (data) =>{
    let req = {
      data,
      url:'v1/location'   
    }
  
    return _get(req)
  }