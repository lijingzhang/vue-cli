<template>
	<div >
	<el-container class="pb0" >
        <v-header :title="shopInfo.name">
			<span slot="left"  @click="$common.back()">返回</span>
		</v-header>
        <!-- 头部商家详情 -->
         <el-header>
            <el-row>
                <el-col :span="3">
                    <img :src="shopInfo.pic_url" class="w100" alt="">
                </el-col>
                <el-col :span="21" class="pl10">
                    <div>{{shopInfo.min_price_tip}} | {{shopInfo.shipping_fee_tip}} | {{shopInfo.delivery_time_tip}}</div>
                    <div>{{shopInfo.bulletin}}</div>
                </el-col>
            </el-row>
        </el-header>
         <!--导航 有3个路由  点菜 评价 和商家-->
        <div class="tabs">
            <el-row >
                <el-col :span="8">
                    <router-link :to="{path:'/menu',query:{id:shopInfo.id}}" >
                        <span class="active">点菜</span>
                    </router-link>
                </el-col>
                 <el-col :span="8">
                       <router-link :to="{path:'comment',query:{id:shopInfo.id}}" >
                        <span>评价</span>
                    </router-link>
                </el-col>
                 <el-col :span="8">
                      <router-link :to="{path:'/seller',query:{id:shopInfo.id}}" >
                        <span>商家</span>
                    </router-link>
                </el-col>
            </el-row>
        </div>
        <!--点菜 评价 和商家-->
        <keep-alive >
            <router-view></router-view>
        </keep-alive>

</el-container>


</div>
</template>
<script>
 
  import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
          
            }
        },
       
       
        computed: {
             ...mapGetters(['shopInfo']),   //获取getters返回的商家信息
        
        },
         created(){
         //根据商店id获取店家信息
          this.$store.dispatch('getRestaurantInfo', this.$route.query.id); //触发执行actions中的方法
       
        },
		methods:{
            
        },
       
		
    }
</script>

<style lang="scss" scoped>
    .tabs{background: #fff;
        a{padding: 10px 0; width: 100%;display:inline-block;border-bottom:2px solid #fff;text-align: center}
        a.active{ color: #f7c36d; border-bottom:2px solid #f7c36d }
    }
   
</style>
