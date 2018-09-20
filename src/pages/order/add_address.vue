<template>
<div>
     <el-container  >
      <v-header title="新增收货地址">
        <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left f16"></i></span>
        <!-- <span slot="right" >保存</span> -->
    </v-header>
    <el-main>
       	<el-form ref="loginform" :model="form"  label-width="85px" >
            <el-form-item label="收货地址：" prop="address">
                <el-input v-model="form.address"  placeholder="点击选择" ></el-input>
            </el-form-item>
            <el-form-item label="门牌号：" prop="house_number">
                <el-input v-model="form.house_number"  placeholder="请输入门牌号：" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="name">
                <el-input v-model="form.name"  placeholder="请输入姓名" ></el-input>
            </el-form-item>
            <el-form-item >
                <el-radio-group v-model="radio" @change="changeradio">
                    <el-radio label="female">女士</el-radio>
                    <el-radio label="male">男士</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone"  placeholder="请输入手机号" ></el-input>
            </el-form-item>
           
            <div class="p15">
                   <el-button type="primary" class="w100" @click="subimtForm('form')">保 存</el-button>   
            </div>
        </el-form>
        
        
    </el-main>
   
     </el-container>
</div>
</template>

<script>
  import {add_address} from '@/api/location'
export default{

    data() {
      return {
       dataArr:[],
       radio: 'female',
       form:{
           name:'',
            phone:'',
            address:'',
            house_number:'',
            gender:''

       }
      }
    },
   
    created() {
      
        
    },
  
    methods:{
        subimtForm(formName){
            var formData = JSON.stringify(this.form); // 获取表单数据并转为json数组
            add_address().then(res => {
                if(res.data.status==200){
                    console.log(res.data)
                }
                else{
                     if(res.data.status==403){
                        this.$confirm(res.data.message, '提示', {
							confirmButtonText: '确定',
							center: true,
							showClose:false,
							showCancelButton:false
						})
                     }
                }
              
            
            }).catch((err) => {   //显示异常
                console.log(err);
            });
        },
        changeradio(value){
            this.form.gender=value
        }
      
    }	

 
}
</script>

<style lang="scss" scoped>

   .el-form-item{ border-left: 0;border-right: 0}
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
</style>
