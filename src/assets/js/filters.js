

//保留4位小数
let tofix = value => {
   return value.toFixed(4)
  }



  //截取字符串 
  let MaxLength=value=> {
    if(value&& value.length > 10) {
        value= value.substring(0,10)+ '...';
       }
        return value;
} 
  export { tofix,MaxLength}
//export { evenNumbers, capitalize }