<template>
<div>
     <el-container  >
      <v-header title="店铺列表">
        <span slot="left"  @click="$common.back()">返回</span>
  
    </v-header>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
    <el-main>
        <div>
            <i class="el-icon-location"></i>{{address.localaddress}}
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
                            <img width="15" class="vertical_m"  :src="obj.icon_url"><span class="ml5" >{{obj.info}}</span>
                        </div>
                    
                    </div>
                    </router-link>
                </section>
                
            </article>
    </el-main>
    <v-footer></v-footer>
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
      
      }
    },
    computed: {
            ...mapGetters(['address']),  //获取getters返回的商家信息
        
        },
    created() {
      let {lat, lng} = this.address;
      if (lat && lng) {
        this.dataArr = [];
        this.Restaurants()
      } else {
        this.$store.dispatch('locationAddr');
      }
     
    },
  
    methods:{
	 Restaurants() {
        //   console.log(this.$store.state.address) //测试是否已获取值
        let limit=0;
        let offset=0;
        let {lat, lng} = this.address;
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
        
</style>
