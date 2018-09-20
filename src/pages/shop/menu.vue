<template>
	<div class="menu_body" >
     
        <el-aside   ref="aside">
            <ul class="menu"> 
                <li v-for="(item,index) in shopMenu" :key="item.id"><router-link to="/">{{item.name}}</router-link></li>
            </ul>
        </el-aside>
  
        <el-container class="pb0 right" ref="right">
            <el-main class="pt0">
                <article v-for="menu in shopMenu" >
                    <h3 class="title">{{menu.name}}</h3>
                    <section v-for="obj in menu.spus" >
                        <div class="img">
                            <img  :src="obj.pic_url" width="50">
                        </div>
                        <div class="info">
                            <div class="name">{{ obj.name | MaxLength}}</div>
                            <div class="sell-num">月售：{{ obj.month_saled_content }}</div>
                            <div class="price mt5"> ￥{{ obj.skus[0].price }}</div>
                            <selector 
                            :name="obj.name"
                            :food_id="obj.skus[0].id"
                            :price="obj.skus[0].price"
                            :pic="obj.pic_url"
                            >
                            </selector>
                           
                        </div>
                    </section>
                </article>
            </el-main>
        </el-container>
 
  	<footer>
		<el-row >
			<el-col :span="10" class="tl pl15">
                <el-badge :value="totalNum" :max="99" class="item mr15">
                    <i class="el-icon-goods"></i>
                </el-badge>
                <span>已选（{{totalNum}}）</span>
            </el-col>
			<el-col :span="14" >
                <el-row>
                    <el-col :span="14" class="tr pr10">
                         <span>￥{{totalPrice}}</span>
                    </el-col>
                    <el-col :span="10">
                        <div class="btn" ><router-link :to="'/orderConfirm?shopid='+shopid"> 结 算</router-link></div>
                    </el-col>
                </el-row>
                 
            </el-col>
		</el-row>
	</footer>
</el-container>


</div>
</template>
<script>
 import {mapGetters} from 'vuex'
 import selector from '../../components/selector.vue'
    export default {
        data() {
            return {
             windowHeight:0,
             shopid:0
            }
        },
         computed: {
            ...mapGetters(['shopMenu','cartList','shopInfo']),  
             totalPrice() {  //计算购物车总价格
                return this.cartList[this.shopid] ? this.cartList[this.shopid].totalPrice : 0;
            },
            totalNum(){      //商品数量
                  return this.cartList[this.shopid] ? this.cartList[this.shopid].totalNum : 0;
            }
        },
        created(){
            this.shopid=this.$route.query.id;  //通过路由获取id
              //根据商店id获取店家menu
             this.$store.dispatch('getRestaurantMenu',  this.shopid); //触发执行actions中的方法
             this.windowHeight = window.innerHeight-196;       //获取设备显示高度减去头尾
            this.$nextTick(() => {       //初始化better-scroll
            this.$refs.aside.$el.setAttribute('style','max-height:'+this.windowHeight+'px');
            this.$refs.right.$el.setAttribute('style','max-height:'+this.windowHeight+'px');
        });
       
        },
       
		methods:{

          

		
        },
       components:{
           selector
       }
		
    }
</script>

<style lang="scss" scoped>
.menu_body{display: flex; flex: 1;overflow: hidden;}
    .el-aside,.right{ overflow: scroll;}
    .el-aside{background: #fff; width: 30%;float: left;border-right: solid 1px #e6e6e6;   position: relative;
   
        ul{width: 100%;
            list-style: none;
            position: relative;
            margin: 0;
            padding-left: 0;
            li{width: 100%;   
                 height: 40px;
                line-height: 40px;
                position: relative;
                -webkit-box-sizing: border-box;
                white-space: nowrap;
                list-style: none;
               a{ font-size: 12px}
            }
        }
    }
    .right {
      position: relative;width: 70%;float: left;
      flex: 1;
      .el-main{
          article {
            h3{font-size: 14px; padding: 5px 0;background: #f5f5f5;text-align: left;padding-left: 10px;}
            section {
              display: flex;
              position: relative;
              margin: 0 10px;
              padding: 8px 0;
              border-bottom: 1px solid #f5f5f5;
             .img {
                margin-right: 1.5rem;
              }

              .info {
                flex: 1;
                vertical-align: top;text-align:left;
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size: 0.3rem;
                }
                .sell-num {
                  font-size: 0.3rem;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
              }
            }
          }
        }

    }
     
	footer {
		position: fixed;
		height:50px;line-height: 50px;
		color: #fff;
		text-align: center;
		background: #0d0d0d;
		left: 0;
		bottom: 0;
		width:100%;
        display: inline-block;z-index: 9999;
        .btn{ width: 100%; height: 50px;background: #f7c36d;color: #fff;}
        .el-icon-goods{ font-size: 20px}
       
    }
  
</style>
