<template>
	<div class="login_bg">
	<el-container>
		<el-main>
			<div class=" pl0">
				<div class="tc  p15"><img src="../assets/images/logo.png" width="95"></div>
				<el-form ref="loginform" class="p15" :model="loginform" label-width="65px" >
					<el-form-item label="用户名" prop="username">
						<el-input v-model="loginform.username"  placeholder="请输入用户名" ></el-input>
					</el-form-item>
					<el-form-item label="密  码" prop="password">
						<el-input v-model="loginform.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<div class="pt15">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('loginform')">登  录</el-button>
					</div>
						
					
					<!-- <el-button @click="resetForm('loginform')">重置</el-button> -->
				</el-form>
			</div>	
		</el-main>
	</el-container>
</div>
</template>
<script>
  import {login} from '@/api/user'
    export default {
        data() {
			return {
				loginform: {
					username: '',
					password: ''
					
				},
			}
		},
		methods: {
			onSubmit(formName) {
				var formData= this.$qs.stringify(this.loginform) // 获取表单数据
					 login(formData).then(response=>{
						this.$router.replace({ path: '/shopList' })//跳转到home页面
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
				
				},
				
		}
	
    }
</script>
<style lang="scss" scoped>
.el-main{ background: none; }
.el-button--primary{ background: #e2514a;border: 1px solid #e2514a;border-radius: 6px}
.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: #f89894;
    border-color: #f89894;
}
.white a{color: #fff}

.el-form{ margin-top: 30px}
.box-card{ max-height: 50%; bottom: 0;overflow-y: scroll;}
.el-icon-arrow-down{ position: absolute;top: 15px;right: 15px;color: #fff}
//登录注册页
.login_bg{ background: url("../assets/images/login_bg.jpg") no-repeat center; background-size: cover;min-height:100%}
.login_bg{
    .el-input__inner{ background: none;color: #fff }
    .el-form-item__label{ color: #fff }
    .el-form .el-form-item{ border: none;border-bottom: 1px solid #bdbcbc; height: 42px;line-height: 42px;position: relative;
       
    }

}
.el-form-item{background: #fff;margin-bottom: 10px;border-radius: 4px}
</style>
