<template>
	<div>
	<el-container>
		<v-header title="登录">
		</v-header>
		<el-main>
			<div class=" pl0">
					<div class="tc mb15 p15"><img src="../assets/images/logo.png" width="80"></div>
				<el-form ref="loginform"  :model="loginform" label-width="65px" >
					<el-form-item label="用户名" prop="username">
						<el-input v-model="loginform.username"  placeholder="请输入用户名" ></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="loginform.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<div class="p15">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('loginform')">登录</el-button>
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

