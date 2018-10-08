<template>
<div >
     <el-container  >
      <v-header title="选择收货地址">
        <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left f16"></i></span>
    </v-header>
    <el-main>
       <div class="pl10 pr10 pb15 pt15">
            <el-row >
                <el-col :span="18"  >
                     <el-input v-model="keyword" class="location" v-on:input="searchRestaurant()" prefix-icon="el-icon-search"  placeholder="请输入关键字.."></el-input>
                </el-col>
                 <el-col :span="6" >
                   <el-button type="primary" @click.native="searchRestaurant()" >搜索</el-button>
                </el-col>
            </el-row>
            <div class="positionlist" v-if="dataArr.length>0">
                <ul>
                    <li v-for="(item,id) in dataArr" :key="item.id" >
                        <router-link :to='"/menu?id="+item.id'>
                             <el-row >
                                <el-col :span="18"  class="tl">
                                     <img :src="item.pic_url" class="l mr10" height="35"> <span v-html="high_light(item.name)"></span>
                                </el-col>
                                <el-col :span="6" class="tr">
                                    {{item.delivery_time_tip}} <i class="el-icon-arrow-right"></i>
                                </el-col>
                            </el-row>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
       
    </el-main>
   
     </el-container>
</div>
</template>

<script>

 import {searchRestaurant} from '@/api/search' 
export default{

    data() {
      return {
          keyword:'',
          dataArr:[]
      }
    },
     
   
    methods:{
     
      searchRestaurant(){
          let keywords=this.keyword;
          searchRestaurant({keyword:keywords}).then(response=>{
               if(response.data.status==200){
                   this.dataArr=response.data.data;
                   console.log(this.dataArr)
               }
            })
            .catch(error=>{
            alert("网路错误，不能访问");
            });
      },
      high_light(value) {
        return value.replace(this.keyword, `<span style="color:#ffd161;">${this.keyword}</span>`);
      }
      
    },
       
 
}
</script>

<style lang="scss" scoped>
     .el-input--prefix{ border: 1px solid #ededed;border-radius: 20px;}
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
     .positionlist{text-align: left;
        ul{padding: 0;
            li{ list-style: none;margin-bottom:10px;    line-height: 35px;
                p{ color: #999}
            } 
        }
        
    }   
</style>
