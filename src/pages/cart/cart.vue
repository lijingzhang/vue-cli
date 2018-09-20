<template>
<div class="cart">
     <el-container  >
      <v-header title="购物车">
        <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left"></i></span>
        <span slot="right" v-if="!del" @click="del=true">编辑</span>
        <span slot="right" v-else @click="del=false">取消</span>
    </v-header>
    <el-main>
        <div v-if="emptyCart==0" class="p15 mb30">
            <div><img src="../../assets/images/nothing.png" class="w50"></div>
            <div class="mb30  mt15">购物车空空如也，快去逛逛吧</div> 
            <router-link  to="/shopList"><el-button type="primary">去逛逛</el-button></router-link>
        </div>
         <div class="list_group border-t10" v-else  v-for="(obj, shopid) in cartList" :key="shopid">
              <div class="list_head">
                  <i class="el-icon-circle-check f22 l mr10" @click="allSelect(shopid,false)"  v-if="selectFood[shopid]['allSelect'] "></i>
                   <i class="el-icon-circle f22 l mr10" @click="allSelect(shopid,true)"  v-else></i>
                  <img :src="obj.pic_url" width="30" class="pr10 l">{{obj.shopname}}
              </div>
             <div class="list_item"  v-for="(item,key) in obj" :key="item.id" v-if="Number(key)">
                 <el-row>
                      <el-col :span="3"  @click.native="cancelSelect(shopid,item.id);" v-if="selectFood[shopid][key]">
                          <i class="el-icon-circle-check f22 "></i>
                     </el-col>
                      <el-col :span="3"  @click.native="selected(shopid,item.id);" v-else>
                          <i class="el-icon-circle f22 "></i>
                     </el-col>
                     <el-col :span="4" >
                         <img :src="item.foods_pic" class="w100 " height="50">
                     </el-col>
                     <el-col :span="14" class="tl pl10">
                         <p>{{item.name}}</p>
                         <div class="f12 gray mt8">X{{item.num}}</div>
                     </el-col>
                     <el-col :span="3" class="tr">
                         ￥{{item.price}}
                     </el-col>
                 </el-row>
             </div>
            
              <div style="border-top:1px dashed #999"></div>
              <div class="pt15 pb15 tr">
                  <span class="red f18 mr10">￥{{selectFood[shopid]['totalPrice'] | tofix}}</span>  
                  <el-button type="primary" @click="submitOrder(shopid)">结算</el-button>

              </div>
         </div>
        
    </el-main>
     	<footer v-show="del"><el-button type="primary" class="w100" @click.native="delSelct()">删除</el-button></footer>
     </el-container>
</div>
</template>

<script>

   import {mapGetters} from 'vuex'
export default{

    data() {
      return {
      totalPrice: 0,
      editStatus:true,
      del:false,
      index:0,
      selectFood: {},   //选中列表
      deleteFood: {},   //删除列表
      emptyCart:0
      }
    },
   
    created() {
        this.emptyCart=Object.keys(this.cartList).length;  //购物车食物数量
        Object.keys(this.cartList).forEach(restaurant_id => {  //初始化选中列表
        this.selectFood[restaurant_id] = {
          allSelect: true,
          totalPrice: 0
        };
   
        let restaurant = this.cartList[restaurant_id];
     
        Object.keys(restaurant).forEach(data => {
          if (Number(data)) {
            this.selectFood[restaurant_id][data] = true;
            this.selectFood[restaurant_id]['totalPrice'] += Number(restaurant[data]['price']) * Number(restaurant[data]['num']);
          }
        })
       
      });
        
    },
     computed: {
            ...mapGetters(['cartList']),  
        
        },
    methods:{
         selected(restaurant_id, foodKey) {      //选中商品
            this.selectFood[restaurant_id][foodKey] = true;   //该商品选中置true
            let cartFoodData = this.cartList[restaurant_id][foodKey];  //购物车中 该商品信息
            this.selectFood[restaurant_id]['totalPrice'] += cartFoodData['num'] * cartFoodData['price'];  //修改商家的总价格
            //判断是否全选,全选时商家左侧全选按钮为选中状态
            if(  this.isAllSelect(this.selectFood[restaurant_id])==0){   //当个数为0全部选中
                 this.selectFood[restaurant_id]['allSelect'] = true; 
            }
            else{
                this.selectFood[restaurant_id]['allSelect'] = false; 
            }
            this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
        },
         cancelSelect(restaurant_id, foodKey) {    //取消选中商品
            this.selectFood[restaurant_id][foodKey] = false;    //该商品取消选中
            this.selectFood[restaurant_id]['allSelect'] = false;    //取消全选标志为false 食物全 选中时，商家全选按钮选中
            let cartFoodData = this.cartList[restaurant_id][foodKey];  //购物车中 该商品信息
            this.selectFood[restaurant_id]['totalPrice'] -= cartFoodData['num'] * cartFoodData['price'];  //修改商家的总价格
            this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
          
        },
        allSelect(restaurant_id,boolean){   //全选
            this.selectFood[restaurant_id]['allSelect'] = boolean;  //全选标志
            
            Object.keys(this.selectFood[restaurant_id]).forEach(key => {
                if (Number(key)) {
                    this.selectFood[restaurant_id][key] = boolean;
                    
                }
            })
            if(boolean){
                  let restaurant = this.cartList[restaurant_id];
                 this.selectFood[restaurant_id]['totalPrice']=0
                 Object.keys(restaurant).forEach(key => {
                    if (Number(key)) {
                        this.selectFood[restaurant_id]['totalPrice'] += Number(restaurant[key]['price']) * Number(restaurant[key]['num']);
                        
                    }
                })

            }
            else{  //取消全选
                 this.selectFood[restaurant_id]['totalPrice'] = 0;
            }
             this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
           
        },
       delSelct(){  //选中删除：思路要删除购物车页面选中的食物selectFood和购物车缓存的食物cartList
           let selectFood=this.selectFood
                Object.keys(this.selectFood).forEach(restaurant_id => {
                    let deletfood=this.selectFood[restaurant_id]
                     Object.keys(deletfood).forEach(food_id => {
                        if (Number(food_id)&&deletfood[food_id]) {  //判断是食物数组并且是被选中的状态deletfood[food_id]==true
                            this.$store.dispatch('deleteFood', {restaurant_id, food_id})  //参数要统一传过去；删除cartList的食物
                            delete this.selectFood[restaurant_id][food_id];      //删除购物车页面食物
                             //删除购物车页面食物后剩余物品的总价格
                             this.selectFood[restaurant_id]['totalPrice'] =0;
                         }
                    })
                 })
            this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
            this.emptyCart=Object.keys(this.cartList).length;  //购物车食物数量
            if(this.emptyCart==0){
                this.del=false
            }
             this.$message({
                message: '删除成功！',
                type: 'success',
                duration:1000
             });
       },
       isAllSelect(obj){
           let num=0;
            Object.keys(obj).forEach(key => {
                if (Number(key)&& !obj[key]) {
                        num+=1 ; //累加返回false即未选中个数，当个数为0全部选中
                }
            })
              return num;
       },

       //提交订单
       submitOrder(shopid){
              let restaurant = this.selectFood[shopid];    //结算餐馆的数组
               let foods={}
             foods[shopid] = {
                totalPrice: 0,
                totalNum: 0,
                shopname:'',
                pic_url:''
                };
            let food
              Object.keys(restaurant).forEach(key => {
                if (Number(key)&& restaurant[key]) {
                    food = this.cartList[shopid][key]; 
                    foods[shopid][key]=food;
                    foods[shopid]['totalPrice']+=food.price*food.num;
                    foods[shopid]['totalNum']+=food.num;
                    foods[shopid]['shopname']=this.cartList[shopid].shopname;
                    foods[shopid]['pic_url']=this.cartList[shopid].pic_url;
                    this.$store.dispatch('reduceCart', {
                        food_id: key,
                        shopid: shopid,
                    })
                }
            })
        //    console.log(foods)
         
               
            localStorage.setItem('confirmOrder', JSON.stringify(foods));

           
            this.$router.push({path: '/orderConfirm?shopid='+shopid});
       }
      
    }	

 
}
</script>

<style lang="scss" scoped>
/* 列表 */
   .list_group{ padding:0 15px;border-top: 8px solid #f0eff5}
   .list_item { padding: 10px 0;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}
    footer {
    position: fixed;
    height:50px;line-height: 50px;
    color: #fff;
    text-align: center;
    left: 0;
    bottom: 0;
    width:100%;
    display: inline-block;z-index: 9999;
    .btn{ width: 100%; height: 50px;background: #f7c36d;color: #fff;border-radius: 0}
    .el-icon-goods{ font-size: 20px}
    
}
.el-icon-circle-check{ color: #f7c36d}
.el-icon-circle{ border: 1px solid #e9e8ea; border-radius: 50%;display: inline-block;width:20px; height: 20px; }
.list_item .el-icon-circle,.list_item  .el-icon-circle-check{margin-top: 15px}

</style>
