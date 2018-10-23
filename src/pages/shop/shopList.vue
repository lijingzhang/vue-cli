
<template>
<div>
     <el-container  >
      <v-header title="外卖"> </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
        <div class="pl10 pr10 pb15 pt15">
            <el-row >
                <el-col :span="10" >
                     <router-link to="/location">
                          <div class="localaddress tl">
                            <i class="el-icon-location "></i><span>{{address.localaddress}}</span> <i class="el-icon-arrow-right"></i>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="14" class="pl10" >
                    <router-link to="/search">
                        <div class="search tl">
                            <i class="el-icon-search ml15 mr15"></i><span>请输入关键字..</span>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
       
        </div>
       
           <div class="tabs">
            <el-row >
                <el-col :span="6">
                    <div>
                        <span class="active">综合排序</span>
                    </div>
                </el-col>
                 <el-col :span="6">
                       <div >
                        <span>销量最高</span>
                    </div>
                </el-col>
                 <el-col :span="6">
                      <div>
                        <span>距离最近</span>
                    </div>
                </el-col>
                 <el-col :span="6">
                      <div >
                        <span>筛选</span>
                    </div>
                </el-col>
            </el-row>
        </div>
         <div class="recommend">
            
     <scroll ref="scroll" class="recommend-content" :data="dataArr"  :pulldown="pulldown"  @pulldown="loadData" :pullup="pullup"  @pullup="loadmore">
       <div>
         <div class="recommend-list">
           <ul>
             <li v-for="(item,index) in dataArr" class="item" :key="index">
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
             </li>
           </ul>
         </div>
         <div v-show="nomore" class="tc p15">到底啦</div>
         <div v-show="loading&&!nomore">正在努力加载中…</div>
       </div>
     </scroll>
   </div>
    </el-main>
    <v-footer></v-footer>
  <!-- 购物车图标 -->
  <router-link to="/cart" class="cart">
    <i></i><span>{{totalNum}}</span>
  </router-link>
     </el-container>
</div>
</template>

<script >
 import Scroll from '../../components/scroll'
  import {getRestaurants} from '@/api/restaurants'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        dataArr: [],         //商家列表
        page: 1,               //当前餐馆列表加载到第几页
        limit:4,              //每次拉的餐馆数量
        offset:0,               //当前显示的总数量
        loadShow:true,
        totalNum:0,
         pulldown: true,
         pullup:true,
        loading: false,       //加载更多
        nomore: false,       //到底啦
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
        this.loadData();
      } else {
        this.$store.dispatch('locationAddr');
      }
        //购物车数量
         let num=0;
        let obj= Object.keys(this.cartList);  //对象转数组
            obj.forEach((key) => {
                if(Number(key)){
                    num+=this.cartList[key].totalNum
                }
            });
        this.totalNum=num
    },
     methods: {
  	 loadData() {
        this.loading=false;  //下拉后初始化
        this.nomore=false;   
        this.pullup=true;
        this.page=1;
        this.loadShow=true;
        let limit=this.limit;
        let offset=this.offset;
        let lat=this.lat;
         let lng=this.lng;
         getRestaurants({limit,offset,lng,lat}).then(res => {
              this.loadShow=false;
                this.dataArr=res.data.data; //获取店铺列表
               
            }).catch((err) => {   //显示异常
                console.log(err);
            });

    },
    loadmore(){
          if (!this.loading) {   //避免加载过程中 重复请求
            this.loading = true;
            this.loadShow=true;
            let offset=this.limit* this.page;
             let limit=this.limit;
              this.page++;
            let lat=this.lat;
            let lng=this.lng;
            getRestaurants({limit,offset,lng,lat}).then(res => {
              
                this.loadShow=false;
                 res.data.data.forEach((el) => {
                  this.dataArr.push(el);
                });
                if(limit>res.data.data.length){  //数组长度小于每页加载的数量时表示已经加载完全部
                    this.loading = true;
                    this.pullup=false;
                    this.nomore=true;
                }
                else{this.loading = false;}
            })
       
    
   
         }
        },
     },
    watch: {
       address(address) {  //监听地址为空时重定位之后重新加载列表
        this.lat=address.lat;
        this.lng=address.lng;
        this.loadData()
      }
      }	,
  components: {
    Scroll
  }
}
</script>
<style scoped lang="scss" >
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
  .recommend{
    position: fixed;
    width: 100%;
    top: 150px;background: #fff;
    bottom: 55px;
    .recommend-content{
      height: 100%;
      overflow: hidden;
     
      .recommend-list{
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
                  font-size: 14px;

                }
                .el-icon-circle-plus{ color: #f7c36d; font-size: 22px; margin-right: 5px}
                .el-icon-remove{ color: #999; font-size: 22px; margin-right: 5px}
              }
            }
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
        div{padding: 3px 0; border-bottom:2px solid #fff;text-align: center}
        div.active{ color: #f7c36d; border-bottom:2px solid #f7c36d }
    }
</style>