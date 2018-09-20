<template>
<div id="popView">
     <el-container  >
      <v-header title="收货地址">
        <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left"></i></span>
    </v-header>
    <el-main>
        <el-row class="p15" v-for="(item,index) in dataArr" :key="item.id" @click.native="selected(item)"  :class="{ selclass:item.id==current}">
            <el-col :span="22" class="tl">
                <p>{{item.address}} {{item.house_number}}</p>
                <div class="f12 gray">{{item.name}}  {{item.gender | gender}}  {{item.phone}}</div>
            </el-col>
            <el-col :span="2">
                <i   class="el-icon-check f20 blue" ></i>
            </el-col>
        </el-row>
        
    </el-main>
   	<footer>
		  <router-link to="/add_address"><el-button type="primary" class="w100 f18"><i class="el-icon-circle-plus-outline "></i> 新增收货地址</el-button></router-link>
	</footer>
     </el-container>
</div>
</template>

<script>
  import {all_address} from '@/api/location'
  
export default{

    data() {
      return {
       dataArr:[],
      current:0
      }
    },
   
    created() {
      this.all_address();
        
    },
  
    methods:{
        all_address(){
            all_address().then(res => {
                if(res.data.status==200){
                    this.dataArr=res.data.address
                }
              
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        },
        selected(item){
            this.current=item.id;
            this.$store.dispatch('selectAddr',item) ; //地址信息由vuex管理
            this.$router.go(-1);  
            console.log(this.current)
        }
      
    }	

 
}
</script>

<style lang="scss" scoped>
/* 列表 */
   .list_group{ padding:0 15px;border-top: 8px solid #f0eff5}
   .list_item { padding: 10px 0;text-align: left; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #999;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}
    footer {
    position: fixed;
    height:50px;line-height: 50px;
    color: #fff;
    text-align: center;
    left: 0;
    bottom: 0;
    width:100%;
    display: inline-block;z-index: 9999;
    .btn{ width: 100%; height: 50px;background: #f7c36d;color: #fff;border-radius: 0}
    .el-icon-goods{ font-size: 20px}
    
}
 .el-icon-check{ display: none}
.selclass .el-icon-check{ display:inline-block }
#popView{ position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background: #f4f4f4;}
</style>
