<template>
<div>
     <el-container  >
      <v-header title="外卖">
         <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left f16"></i></span>
  
    </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
        <div class="pl10 pr10 pb15 pt15">
            <el-row >
                <el-col :span="10" >
                    <div class="localaddress tl">
                        <i class="el-icon-location "></i><span>{{address.localaddress}}</span> <i class="el-icon-arrow-right"></i>
                    </div>
                    
                </el-col>
                <el-col :span="14" class="pl10" >
                    <div class="search tl">
                        <i class="el-icon-search ml15 mr15"></i><span>请输入关键字..</span>
                    </div>
                    
                </el-col>
            </el-row>
       
        </div>
           <div class="tabs">
            <el-row >
                <el-col :span="6">
                    <router-link :to="{path:'/menu',query:{}}" >
                        <span class="active">综合排序</span>
                    </router-link>
                </el-col>
                 <el-col :span="6">
                       <router-link :to="{path:'comment',query:{}}" >
                        <span>销量最高</span>
                    </router-link>
                </el-col>
                 <el-col :span="6">
                      <router-link :to="{path:'/seller',query:{}}" >
                        <span>距离最近</span>
                    </router-link>
                </el-col>
                 <el-col :span="6">
                      <router-link :to="{path:'/seller',query:{}}" >
                        <span>筛选</span>
                    </router-link>
                </el-col>
            </el-row>
        </div>
        <article>
                <section v-for="(item,id) in dataArr" :key="item.id">
                    <router-link :to="{path:'/menu',query:{id:item.id}}">
                    <div class="img">
                        <img  :src="item.pic_url">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.name | MaxLength}}</div>
                        <div class="sell-num f12">{{ item.month_sales_tip }}<span class="r">{{item.delivery_time_tip}}/{{item.distance}}</span></div>
                        <div class="sell-num f12">{{item.min_price_tip}} | {{item.shipping_fee_tip}} | {{item.average_price_tip}}</div>
                        <div class="f12" v-for="obj in item.discounts2">
                            <img width="13" class="vertical_m"  :src="obj.icon_url"><span class="ml5" >{{obj.info}}</span>
                        </div>
                    
                    </div>
                    </router-link>
                </section>
                
            </article>
    </el-main>
    <v-footer></v-footer>
  <!-- 购物车图标 -->
  <router-link to="/cart" class="cart">
    <i></i><span>{{totalNum}}</span>
  </router-link>
     </el-container>
</div>
</template>

<script>
  import {getRestaurants} from '@/api/restaurants'
   import {mapGetters} from 'vuex'
export default{

    data() {
      return {
       dataArr:[],
       loadShow:true,
       isAdd:false,
       lng:'',
       lat:'',
       totalNum:0,
        noMore: false,        //没有更多数据了
        preventRepeat: false   //避免重复请求
      }
    },
    computed: {
            ...mapGetters(['address','cartList']),  
        
        },
    created() {
        let {lat, lng} = this.address;
        if (lat && lng) {
             this.lat=lat;
            this.lng=lng;
            this.dataArr = [];
            this.Restaurants()
        } else {
            this.$store.dispatch('locationAddr'); //地址为空时重定位
            
        }
        let num=0;
       let obj= Object.keys(this.cartList);  //对象转数组
        obj.forEach((key) => {
            if(Number(key)){
                num+=this.cartList[key].totalNum
            }
        });
   
  
    this.totalNum=num
    
    },
   watch: {
      address(address) {  //监听地址为空时重定位之后重新加载列表
        this.lat=address.lat;
        this.lng=address.lng;
        this.Restaurants()
      }
      }	,
    methods:{
	 Restaurants() {
        if (this.noMore || this.preventRepeat)
          return;
        this.preventRepeat = true;
        let limit=0;
        let offset=0;
        let lat=this.lat;
         let lng=this.lng;
         getRestaurants({limit,offset,lng,lat}).then(res => {
              this.loadShow=false;
                this.dataArr=res.data.data; //获取店铺列表
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });

    },

        
      
    }	

 
}
</script>

<style lang="scss" scoped>
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
      article {
            a {
              display: flex;
              position: relative;
              margin: 0 0.5rem;
              padding: 10px 0;
              border-bottom: 1px solid #f5f5f5;
             .img {
                margin-right:10px;
                img{
                    width: imgpx(400px);
                    height: imgpx(400px);
                }
              }

              .info {
                flex: 1;
                vertical-align: top;text-align:left;
               
                .name {
                  font-size: 16px;color: #000;
                }
                .sell-num {
                  font-size: 12px;color: #999;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
                .el-icon-circle-plus{ color: #f7c36d; font-size: 22px; margin-right: 5px}
                .el-icon-remove{ color: #999; font-size: 22px; margin-right: 5px}
              }
            }
          }
     .cart{ position: fixed;right: 10px;bottom: 15%;border: 1px solid #999;border-radius: 50%;display: inline-block;padding:8px;background:#fff;
        i{display: inline-block; width: 30px;height: 30px;background: url('../../assets/images/cart.png') no-repeat;
       background-size: contain;vertical-align:middle
        }
        span{ background: red;border-radius: 50%; width: 18px;height: 18px;text-align: center;line-height: 18px;display: inline-block;color: #fff;font-size: 12px;position: absolute;right:-2px;top:-2px;}
     }   
     .search{border-radius: 20px;background: #ededed;height: 30px;line-height: 30px;
        span{font-size: 12px;}
     }
     .localaddress{background: #a6a6a6;color: #fff;border-radius: 20px;width: 100%;position: relative;
        height: 30px;line-height: 30px;
        span{ width: 74%;display: inline-block;padding-left:15%;
            overflow: hidden;font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;}
            i{ position: absolute}
            .el-icon-location{ left: 5%;top: 8px;}
            .el-icon-arrow-right{right: 5%;top:8px;}
        }
      .tabs{background: #fff;border-top:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;
        a{padding: 10px 0; width: 100%;display:inline-block;border-bottom:2px solid #fff;text-align: center}
        a.active{ color: #f7c36d; border-bottom:2px solid #f7c36d }
    }
</style>
