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
         <div ref="scrollWrapper">
        <article >
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

<script>
  import BScroll from 'better-scroll'
  import {getRestaurants} from '@/api/restaurants'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        dataArr: [],         //商家列表
        showSort: false,      //显示选择排序列表
        BScrollEvent: null,   //better-scroll实例
        loading: false,       //加载更多
        page: 1,               //当前餐馆列表加载到第几页
        limit: 4,              //每次拉去的餐馆数量
        noMore: false,        //没有更多数据了
        preventRepeat: false,   //避免重复请求
        loadShow:true,
        totalNum:0,
        scrollWrapper: null,    //存放 scrollWrapper这个DOM元素 用于等附近商家列表加载后 初始化better-scroll
      }
    },
    computed: {
      ...mapGetters(['address','cartList']), 
    },
       mounted() {
      this.scrollWrapper = this.$refs.scrollWrapper;  //进行better-scroll的DOM对象 餐馆类型 是否地位好准备开始拉去餐馆数据
       
    },
    methods: {
      //监听better-scroll滚动事件  判断是否滑动到底部 加载更多
      listenScroll() {
        let _this = this;
        _this.BScrollEvent.on('scroll', function (obj) {
          //如果到达底部  请求加载更多数据
          if (Math.abs(obj.y) + _this.scrollWrapper.clientHeight >= _this.scrollWrapper.childNodes[0].clientHeight - 30) {
            if (!_this.loading) {   //避免加载过程中 重复请求
              _this.loading = true;
              //请求加载更多
              _this.getRestaurants(_this.page, _this.limit, function (data) {
                _this.page++;
                data.forEach((el) => {
                  _this.dataArr.push(el);
                });
                //DOM重新渲染完毕后 重新计算better-scroll
                _this.$nextTick(() => {
                  _this.loading = false;
                  _this.BScrollEvent.refresh();
                })
              })
            }
          }
        })
      },
      getRestaurants(page, limit, callback) { //获取餐馆列表
        if (this.noMore || this.preventRepeat)
          return;
        this.preventRepeat = true;
        let offset = (page - 1) * limit;
        let {lat, lng} = this.address;
        getRestaurants({offset, limit, lng, lat}).then((response) => {
        this.loadShow=false
          let data = response.data.data;
          this.preventRepeat = false;
          this.noMore = data.length < this.limit;
          callback(data);
        });
      },
      firstFetch() {
        let _this = this;
        //获取餐馆列表
        this.page = 1;
        this.getRestaurants(this.page, this.limit, function (data) {
          _this.page++;
          _this.dataArr = data;
          _this.$nextTick(() => {
            //dom渲染完成 初始化better-scroll
            _this.BScrollEvent = new BScroll(_this.scrollWrapper, {click: true, probeType: 2});
            //监听scroll事件
            _this.listenScroll();
          })
        })
      }
    },
    created() {
      let {lat, lng} = this.address;
      if (lat && lng) {
        this.dataArr = [];
        this.firstFetch();
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
    watch: {
      address(value) {    //地址发生变化，重新获取商家
        this.noMore = false;
        this.preventRepeat = false;
        let {lat, lng} = value;
        if (lat && lng) {
          this.dataArr = [];
          this.firstFetch();
        }
      }
    },
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
