<template>
<div>
     <el-container  >
      <v-header title="订单">
         <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left f16"></i></span>
    </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
        <div class="gray p15" v-if="dataArr.length==0">--- 暂无订单 ---</div>
         <div class="list_group border-t10" v-for="(item,id) in dataArr" :key="item.id">
             <router-link :to='"/orderShow?id="+item.id'>
                <div class="list_head"><img :src="item.restaurant.pic_url" width="30" class="pr10 l">{{item.restaurant.name}} > <span class="green">{{item.status}}</span></div>
                <div class="list_item"  v-for="(data,key) in item.foods" :key="item._id" >
                 <el-row>
                     <el-col :span="4" >
                         <img :src="data.pic_url" class="w100 " height="50">
                     </el-col>
                     <el-col :span="17" class="tl pl10">
                         <p>{{data.name}}</p>
                         <div class="f12 gray mt8">X{{data.num}}</div>
                     </el-col>
                     <el-col :span="3" class="tr">
                         ￥{{data.price}}
                     </el-col>
                 </el-row>
             </div>
              <div style="border-top:1px dashed #999"></div>
              <div class="pt15 pb15">
                    <div class="tr ">共{{item.foods.length}}件商品，实付<span class="red">￥{{item.total_price | tofix}}</span></div>
                    <div class="tr"><router-link :to='"/menu?id="+item.restaurant_id' class="btn">再来一单</router-link></div>

              </div>
             </router-link>
           
         </div>
    </el-main>
     <v-footer></v-footer>
     </el-container>
     
</div>

</template>

<script>
  import {getOrderList} from '@/api/order'

export default{

    data() {
      return {
       dataArr:[],
       loadShow:true
      }
    },

    created() {
         this.getOrderList() // 默认加载地址
       
    },
  
    methods:{

        getOrderList(){   //获取订单信息
            getOrderList().then(res => {
                if(res.data.status==200){
                    this.loadShow=false;
                    this.dataArr=res.data.data;
                    
                }
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        }
      
    },
  
 
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
   
 .btn{  display: inline-block;border:1px solid #d5d5d5;width: 80px; height: 35px;line-height: 35px;margin-top: 10px;text-align: center;border-radius: 4px}
</style>
