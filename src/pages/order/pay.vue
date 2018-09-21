<template>
<div id="popView">
     <el-container  >
      <v-header title="支付订单">
        <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left"></i></span>
    </v-header>
    <div class="popContainer" v-show="loadShow">
          <div  class="comomtips" >支付超时</div>
    </div>
  
    <el-main>
        <div class="tc p15 mb15">
            <h3 class="gray f14 p15">支付剩余时间</h3>
            <div class="timer">
                <span>{{minutes.slice(0, 1)}}</span>
                <span>{{minutes.slice(1, 2)}}</span>
               :
                <span>{{seconds.slice(0, 1)}}</span>
                <span>{{seconds.slice(1, 2)}}</span>
            </div>
        </div>
        <el-row class="p15 info">
            <el-col :span="3" class="tl">
               <img :src='restaurant.pic_url' class="w100" alt="">
            </el-col>
            <el-col :span="21" class="tl pl10">
               <div>￥{{total_price}}</div>
               <div>{{restaurant.name}} -  {{dataArr.id}}</div>
            </el-col>
        </el-row>
     
            <el-row class="itemlist" @click.native="select(1)" :class="{selclass:current==1}"> 
                <el-col :span="3" class="tc">
                <img src="../../assets/images/Alipay.png" width="20" alt="">
                </el-col>
                <el-col class="tl" :span="18">支付宝 </el-col>
                <el-col :span="3" class="tc">
                    <i class="el-icon-circle-check f22"></i>
                </el-col>
            </el-row>
            <el-row class=" itemlist" @click.native="select(2)" :class="{ selclass:current==2}"> 
                <el-col :span="3" class="tc">
                <img src="../../assets/images/wx.png" width="20" alt="">
                </el-col>
                <el-col class="tl" :span="18">微信 </el-col>
                <el-col :span="3" class="tc">
                    <i class="el-icon-circle-check f22"></i>
                </el-col>
            </el-row>
            <div class="p15 mt30">
                 <el-button type="primary" class="w100">确认支付</el-button>
            </div>
           
    </el-main>
   
     </el-container>
</div>
</template>

<script>
  import {getOrder} from '@/api/order'
  
export default{

    data() {
      return {
       dataArr:[],
       seconds: '',  //倒计时秒
        minutes: '',   //倒计时分
        radio:1,
        restaurant:[],
        loadShow:false,
        total_price:0,
        current:1
      }
    },
   
    created() {
      this.orderInfo();
        
    },
  
    methods:{
        select(value){
           this.current=value
        },
        orderInfo(){
            let _this=this
            let order_id=this.$route.query.order_id;
            getOrder(order_id).then(res => {
                if(res.data.status==200){
                   this.dataArr=res.data.data
                   this.restaurant=res.data.data.restaurant
                   this.total_price=(this.dataArr.total_price).toFixed(2)
                   let remain_time =res.data.data.pay_remain_time;    //支付剩余时间
                    if (remain_time == 0) {
                        this.loadShow = true;
                    }
                      this.timer = setInterval(function () {
                        remain_time--;
                        _this.calc_remain_time(remain_time);
                        }, 1000)

                }
              
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        },
          calc_remain_time(remain_time) {   //倒计时
            let minutes = (remain_time / 60 % 60)
            this.minutes = minutes >= 10 ? minutes + '' : '0' + minutes;//计算剩余的分钟
            let seconds = (remain_time % 60);
            this.seconds = seconds >= 10 ? seconds + '' : '0' + seconds;//计算剩余的分钟;//计算剩余的秒数
            if (!this.minutes && !this.seconds) {
            clearInterval(this.timer);
            this.loadShow = true;    //支付超时
            }
      },
      
    },
       
 
}
</script>

<style lang="scss" scoped>
.info{ border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;border-bottom: 15px solid #f5f5f5;border-top: 15px solid #f5f5f5}
.itemlist{ border-bottom: 1px solid #f5f5f5;padding: 15px 0;}
#popView{ position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background: #f4f4f4;}
    .timer{
        span{background: #666;color: #fff;padding: 2px 5px;}  
    }
    .el-icon-circle-check{display: none;}
    .selclass .el-icon-circle-check{display: inline-block; color: #f7c36d}
</style>
