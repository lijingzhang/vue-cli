<template>
	<div>
	<el-container>
		<v-header title="登录">
			<router-link slot="left" to="/">返回</router-link>
		</v-header>
		<el-main>
			<div class=" pl0">
					<div class="tc mb15"><img src="../images/logo.png" width="120"></div>
				<el-form ref="loginform" status-icon :model="loginform" :rules="rules" label-width="65px" >
					<el-form-item label="用户名" prop="username">
						<el-input v-model="loginform.username"  placeholder="请输入用户名" ></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="loginform.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-row >
						<el-col :span="24">
						<el-button class="w100 mb15" type="primary" @click="onSubmit('loginform')">登录</el-button>
						</el-col>
						<el-col :span="24">
						<el-button class="w100" type="info" plain @click="skip('/login/register')">注册</el-button>
						</el-col>
					</el-row>
					<!-- <el-button @click="resetForm('loginform')">重置</el-button> -->
				</el-form>
			</div>	
		</el-main>
	</el-container>
</div>
</template>
<script>

    export default {
        data() {
			return {
				loginform: {
					username: '',
					password: ''
					
				},
				 rules: {
					  username: [
					     { required: true, message: '请输入用户名',  trigger: ['blur', 'change'] },
						{ min: 3,message: '长度至少3个字符', trigger: 'blur' }
					],
					password: [
					 { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
						{ min: 6,  message: '长度在至少6个字符', trigger: 'blur' }
					],
				 }

			}
		},
		methods: {
			onSubmit(formName) {
				  this.$refs[formName].validate((valid) => {
					if (valid) {
					 this.$http.get("http://api.hywl365.com/api/user/passport/login_state")
					.then(response=>{
						// this.goods=response.data;
						console.log(response.data);
						this.$router.replace({ path: '/home' })//跳转到home页面
					})
					.catch(error=>{
					alert("网路错误，不能访问");
					});
					} else {
						console.log('error submit!!');
						return false;
					}
					});
				},
				resetForm(formName) {
					this.$refs[formName].resetFields();
				},
			  skip:function(a){
				this.$router.push(a)}//点击页面跳转
			}
	
    }
</script>

