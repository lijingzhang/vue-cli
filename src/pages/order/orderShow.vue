<template>
<div>
     <el-container  >
      <v-header title="订单详情">
         <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left"></i></span>
    </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
         <div class="p15 tc">
             <h3>订单已完成</h3>
            <p>感谢您对外卖的支持，欢迎再次光临</p>
            <router-link :to='"/menu?id="+dataArr.restaurant_id' class="btn">再来一单</router-link>
        </div>
         <div class="list_group border-t10" >
              <div class="list_head"><img :src="dataArr.restaurant.pic_url" width="30" class="pr10 l">{{dataArr.restaurant.name}} </span></div>
             <div class="list_item"  v-for="(data,key) in dataArr.foods" :key="data._id" >
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
            
              <el-row class="pt15 pb15">
                  <el-col :span="12" class="tl">包装费</el-col>
                   <el-col :span="12" class="tr">￥0</el-col>
              </el-row>
              <el-row class="pb15">
                  <el-col :span="12"  class="tl">配送费</el-col>
                   <el-col :span="12" class="tr">￥0</el-col>
              </el-row>
              <div style="border-top:1px dashed #999"></div>
              <el-row class="pt15 pb15">
                  <el-col :span="12" class="gray tl">已优惠 ￥0</el-col>
                   <el-col :span="12" class="tr">实付：<span class="red">￥{{dataArr.total_price}}</span></el-col>
              </el-row>
         </div>
         <div class="shop_info border-t10">
             <h3 class="tc  pb15">联系商家</h3>
             <div><span>期望时间</span><p>立即送达</p></div>
            <div><span>配送地址</span><p>{{dataArr.address.address}}</p></div>
            <div><span>配送服务</span><p>有商家提供配送服务</p></div>
            <div><span>订单号码</span><p>{{dataArr.id}}</p></div>
             <div><span>订单时间</span><p>{{dataArr.create_time}}</p></div>
              <div><span>支付方式</span><p>在线支付</p></div>
         </div>
    </el-main>
     <v-footer></v-footer>
     </el-container>
     
</div>

</template>

<script>
  import {getOrder} from '@/api/order'

export default{

    data() {
      return {
       dataArr:[],
       loadShow:true
      }
    },

    created() {
         this.getOrder() // 默认加载
       
    },
  
    methods:{

        getOrder(){   //获取订单详情
            let query=this.$route.query.id;
            getOrder(query).then(res => {
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
.shop_info{padding: 15px;
    div{display: inline-block;width:100%;min-height:30px;
         span{ color: #999; float: left;}
         p{ text-align: left; margin-left: 10px;float: left;}
    }
   
}

</style>
