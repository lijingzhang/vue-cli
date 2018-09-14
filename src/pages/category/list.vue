<template>
<div>
    <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
   <article>
            <section v-for="item in dataArr">
                <div class="img">
                    <img  :src="item.pic_url">
                </div>
                <div class="info">
                    <div class="name">{{ item.name | MaxLength}}</div>
                    <div class="sell-num">{{ item.month_sales_tip }}</div>
                    <el-row class="mt10">
                        <el-col :span="18">
                            <span class="price">{{item.third_category}}</span>
                        </el-col>
                        <el-col :span="6" class="tr" >
                            <i @click="toggle_add(item)"  :class="{'el-icon-remove':item.isAdd,'el-icon-circle-plus':!item.isAdd }"></i>
                            
                        </el-col>
                    </el-row>
                  <!-- :class="{'el-icon-circle-plus':isAdd+item.id,'el-icon-remove':!isAdd+item.id}" -->
                </div>
            </section>
           
          </article>
</div>
</template>

<script>
import Vue from 'vue'
export default{

    data() {
      return {
       dataArr:[],
       loadShow:true,
       isAdd:false
      }
    },
created() {
    this.loadData()
  },
  methods:{
	 loadData() {
        //  console.log(this.$route.params.id)
       
          this.$http.get('/v1/restaurants?limit=0&&offset=0&&lng=19.32842&&lat=26.08135').then(res => {
              this.loadShow=false;
                this.dataArr=res.data.data;
            }).catch((err) => {   //显示异常
                console.log(err);
            });

    },
	toggle_add(item){
            this.$nextTick(()=>{
　　　　　　　　this.dataArr.forEach(function (item) {
　　　　　　　　　　Vue.set(item,'isAdd',false);
                   console.log(item)
　　　　　　　　});
　　　　　　　　Vue.set(item,'isAdd',true);
console.log(item)
　　　　　　});
        
      
    }	
},
 
}
</script>

<style lang="scss" scoped>
@function imgpx($px) {
    @return $px / 75px * 1rem;
}
      article {
            section {
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
                .name, .price {
                //   font-weight: bold;
                }
                .name {
                  font-size: 14px;color: #000
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
