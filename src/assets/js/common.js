//全局通用方法
export default {
     back(){
        history.back(-1);
     }, //返回上一页
     skip:function(url){
        window.location.href = url;
     },   //点击页面跳转
   
     state:function(){
     return bAuth=true;
   },  
   }
