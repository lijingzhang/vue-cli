

//保留4位小数
let tofix = value => {
   return value.toFixed(2)
  }

  //截取字符串 
  let MaxLength=value=> {
    if(value&& value.length > 10) {
        value= value.substring(0,10)+ '...';
       }
        return value;
} 
//男士女士
let gender = value => {
  if(value=="male"){
    return "女士"
  }
  else{
    return "男士"
  }
 }

  export { tofix,MaxLength,gender}
//export { evenNumbers, capitalize }