<template>
<div>
     <el-container  >
      <v-header title="确认订单">
         <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left f16"></i></span>
    </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
        <div class="list_group">
            <div class="list_item" >
                <router-link to="/address" >
                    <el-row>
                        <el-col :span="2" ><i class="el-icon-location-outline f16"></i></el-col>
                         <el-col :span="20" v-if="length>0">
                             <div>
                                 {{address.address}}{{address.house_number}}
                             </div>
                             <div class="f12 gray"> {{address.name}}({{address.gender | gender}})   {{address.phone}}</div>
                        </el-col>
                        <el-col :span="20" v-else>新增收货地址</el-col>
                        <el-col :span="2" class="tr"><i class="el-icon-arrow-right f16"></i></el-col>
                    </el-row>  
                </router-link> 
            </div>
                <div class="list_item" >
                    <el-row>
                        <el-col :span="2" ><i class="el-icon-time"></i></el-col>
                        <el-col :span="20" >送达时间：</el-col>
                        <el-col :span="2" class="tr"><i class="el-icon-arrow-right"></i></el-col>
                    </el-row>  
                
            </div>
        </div>
         <div class="list_group border-t10">
              <div class="list_head"><img :src="pic_url" width="30" class="pr10 l">{{shopname}}</div>
             <div class="list_item"  v-for="(item,key) in dataArr" :key="item.id" v-if="Number(key)">
                 <el-row>
                     <el-col :span="4" >
                         <img :src="dataArr[key].foods_pic" class="w100 " height="50">
                     </el-col>
                     <el-col :span="17" class="tl pl10">
                         <p>{{dataArr[key].name}}</p>
                         <div class="f12 gray mt8">X{{dataArr[key].num}}</div>
                     </el-col>
                     <el-col :span="3" class="tr">
                         ￥{{dataArr[key].price}}
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
                   <el-col :span="12" class="tr">小计：<span class="red">￥{{totalPrice}}</span></el-col>
              </el-row>
         </div>
    </el-main>
   	<footer>
		<el-row >
			<el-col :span="10" class="tl pl15">
                <span>总共{{totalNum}}件商品</span>
            </el-col>
			<el-col :span="14" >
                <el-row>
                    <el-col :span="14" class="tr pr10">
                         <span>总计：￥{{totalPrice}}</span>
                    </el-col>
                    <el-col :span="10">
                        <div class="btn" @click="submitOrder"> 提交订单</div>
                    </el-col>
                </el-row>
                 
            </el-col>
		</el-row>
	</footer>
    
        <router-view></router-view>
   
   
     </el-container>
     
</div>

</template>

<script>
 import {all_address} from '@/api/location'
  import {postOrder} from '@/api/order'
   import {mapGetters} from 'vuex'
export default{

    data() {
      return {
       dataArr:[],
       length:0,
        loadShow:false,
        shopInfo: null,
        totalPrice: 0,
        totalNum: 0,
        shopname: '',
        pic_url:'',
        address:[],//收货地址
        popView:false
      }
    },
   computed: {
      ...mapGetters(['deliveryAddress']),
    },
    created() {
       let infoArr=JSON.parse(localStorage.getItem('confirmOrder'));
       let shopid=this.$route.query.shopid;
       this.totalNum=infoArr[shopid].totalNum;
        this.totalPrice=infoArr[shopid].totalPrice;
        this.shopname=infoArr[shopid].shopname;
        this.pic_url=infoArr[shopid].pic_url;
      this.dataArr=infoArr[shopid];
     
      
         this.all_address() // 默认加载地址
        
    },
  
    methods:{
	 all_address(){
            all_address().then(res => {
                if(res.data.status==200){
                    let obj=res.data.address;
                    this.length=obj.length;
                    this.address=obj[0]
                  
                }
              
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        },
        submitOrder(){
            let restaurant_id=this.$route.query.shopid;
            let foods=[];
            let obj= Object.keys(this.dataArr);  //对象转数组
            obj.forEach((key) => {
                if(Number(key)){
                    foods.push({skus_id: key,num:this.dataArr[key].num});
                   
                }
            });
            
            postOrder({address_id:this.address.id,restaurant_id:restaurant_id,foods:foods}).then(res => {
                if(res.data.status==200){
                    this.$router.push({path: '/pay', query: {order_id: res.data.order_id}})
                }
              
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        }
      
    },
     watch: {
      deliveryAddress(address) {
        this.address=address
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
    background: #0d0d0d;
    left: 0;
    bottom: 0;
    width:100%;
    display: inline-block;z-index: 99;
    .btn{ width: 100%; height: 50px;background: #f7c36d;color: #fff;}
    .el-icon-goods{ font-size: 20px}
    
}

</style>
