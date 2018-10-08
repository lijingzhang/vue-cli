<template>
	<div class="menu_body" >
          <div class="menu-wrapper" ref="menuWrapper">
        <ul  class="menu">
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)" :key="index">
          <span class="text border-1px-bottom">
            <span  class="icon" ></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
       <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, listIndex) in goods" class="food-list" ref="foodList" :key="listIndex">
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li 
                v-for="(obj, foodIndex) in item.spus"
                :key="foodIndex"
                class="food-item" >
                <div class="icon">
                  <img  width="50" height="50" :src="obj.pic_url">
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
              </li>
            </ul>
          </li>
        </ul>
      </div>
 
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
  import BScroll from 'better-scroll'
 import {mapGetters} from 'vuex'
 import selector from '../../components/selector.vue'
import {getRestaurantMenu} from '@/api/restaurants'
    export default {
        data() {
            return {
             shopid:0,
             menuIndex: 0,   //左侧当前是第几个分类
             listHeight: [], //存储区块的高度
             scrollY:0,
             goods:[]
            }
        },
         computed: {
            ...mapGetters(['cartList','shopInfo']),  
             totalPrice() {  //计算购物车总价格
                return this.cartList[this.shopid] ? this.cartList[this.shopid].totalPrice : 0;
            },
            totalNum(){      //商品数量
                  return this.cartList[this.shopid] ? this.cartList[this.shopid].totalNum : 0;
            },

            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
                }
                return 0
            },
           
            
        },
        created(){
            this.shopid=this.$route.query.id;  //通过路由获取id
              //根据商店id获取店家menu
             getRestaurantMenu(this.shopid).then(response=>{
                  this.goods = response.data.data;
                    this.$nextTick(() => {           //调用scroll函数，实现滚动    
                    this._initScroll();          //拿到数据以后计算高度        
                    this._calculateHeight();       
                 }); 
            
                })
        },
     
		methods:{
            selectMenu (index, event) {
            
                if (!event._constructed) {
                return
                }
            
                let foodList = this.$refs.foodList
                
                let el = foodList[index]
                console.log(el)
                this.foodsScroll.scrollToElement(el, 300)
            },
                // new BScroll(接收一个dom， 一个options)
            _initScroll () {
            
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
                })

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3 // api表示在滚动的时候能实时的告诉当前位置，y坐标
                })

                // 利用这个api监听scroll，得到y坐标
                this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y)) // 是小数，需要转换整数，并且要是正数
                })
            },
            _calculateHeight () { // 获取右侧商品 每一组的高度
                let foodList = this.$refs.foodList
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
                }
            }
     },
 
       components:{
           selector
       }
		
    }
</script>

<style lang="scss" scoped>
ul{margin: 0;padding: 0}
.menu_body{ display:flex;
    position:absolute;
    top:146px;
    bottom:50px;
    width:100%;}
    .menu-wrapper{background: #fff; width: 30%;float: left; flex:0 0 80px;background: #f5f5f5; overflow: hidden;
   
        ul{width: 100%;
            list-style: none;
            position: relative;
            margin: 0;
            padding-left: 0;   
            li{width: 100%;   
                 height: 40px;
                line-height: 40px;
                position: relative; background: #f5f5f5;
                -webkit-box-sizing: border-box;
                white-space: nowrap;
                list-style: none;
               span{ font-size: 12px}
            }
            li.current{background: #fff;}
        }
    }
    .foods-wrapper {
      position: relative;width: 70%;float: left;    overflow: hidden;
       flex:1 ;
    
          .food-list {background: #fff;
            h3{font-size: 14px;height: 40px;line-height: 40px;background: #f5f5f5;text-align: left;padding-left: 10px;}
            .food-item {
              display: flex;
              position: relative;
              margin: 0 0 0 10px;
              padding: 7px 0;
              border-bottom: 1px solid #f5f5f5;
             .img {
                margin-right: 1.5rem;
              }

              .info {
                flex: 1;
                vertical-align: top;text-align:left;padding-left:10px;
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size:12px;
                }
                .sell-num {
                  font-size:12px;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 14px;

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
