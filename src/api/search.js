import {_post,_get} from './index'

//搜索位置
export const position = (data) => {
  let req = {
    data:data,
    url: 'v1/suggestion'
  }
  return _get(req);
}


//搜索餐馆
export const searchRestaurant = (data) => {
    let req = {
      data:data,
      url: 'v1/search/restaurant'
    }
    return _get(req);
  }