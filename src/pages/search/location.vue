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
                     <el-input v-model="keyword" class="location" v-on:input="searchLocation()" prefix-icon="el-icon-search"  placeholder="请输入关键字.."></el-input>
                </el-col>
                 <el-col :span="6" >
                   <el-button type="primary" @click.native="searchLocation()">搜索</el-button>
                </el-col>
            </el-row>
            <div class="positionlist" v-if="dataArr.length>0">
                <ul>
                    <li v-for="(item,id) in dataArr" :key="item.id" @click="replaceLocation(item)">
                        <div>{{item.title}}</div>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="border-t10 tc p15" @click="location()"  v-if="dataArr.length==0">
            <i class="el-icon-location blue"></i>点击定位当前位置
        </div>
    </el-main>
   
     </el-container>
</div>
</template>

<script>

 import {position} from '@/api/search' 
export default{

    data() {
      return {
          keyword:'',
          dataArr:[]
      }
    },
     
   
    methods:{
      location(){
            this.$store.dispatch('locationAddr');  //获取当前位置
            this.$router.push('/shopList');
      },
      searchLocation(){
          let keywords=this.keyword;
          position({keyword:keywords}).then(response=>{
               if(response.data.status==200){
                   this.dataArr=response.data.data.data;
               }
            })
            .catch(error=>{
            alert("网路错误，不能访问");
            });
      },
      replaceLocation(item){
        this.$store.dispatch('clearAddress');
         this.$store.dispatch('recordAddress',{localaddress:item.title, ...item.location});  //搜索选择位置
        this.$router.push('/shopList');
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
        li{ list-style: none;margin-bottom:10px;
            p{ color: #999}
        } 
    }   
</style>
