<template>
	<footer class="footer">
		<el-row :gutter="20">
			<el-col :span="8"><router-link to="/shopList"><i class="home"></i>首页</router-link></el-col>
			<el-col :span="8" ><router-link to="/orderList"><i class="el-icon-tickets f26"></i>订单</router-link></el-col>
			<el-col :span="8" ><router-link to="/centerindex"><i class="my"></i>我的</router-link></el-col>
		</el-row>
	</footer>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
	}
	
</script>
<style >
	.footer {
		position: fixed;
		height:48px;padding-top: 8px;
		color: #fff;
		text-align: center;
		background: #0d0d0d;
		left: 0;
		bottom: 0;
		width:100%;
		display: inline-block;z-index: 9999;
	}
    .footer .right {
			right: 10px;
		}
    .footer .item {
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 1;
		
		}
    .footer .el-col a {color: #666;font-size: 12px;text-align: center; line-height: 0}
	.footer .el-col a.active{color: #f7c36d}
	.footer .el-col a i{ display: block;width: 25px;height: 25px; margin: 0  auto;}
	.footer .el-col a i.home{ background: url(../assets/images/home.png)  no-repeat;background-size: contain;}
	.footer .el-col a.active i.home{ background: url(../assets/images/home_active.png)  no-repeat;background-size: contain;}
	.footer .el-col a i.my{ background: url(../assets/images/my.png)  no-repeat;background-size: contain;}
	.footer .el-col a.active i.my{ background: url(../assets/images/my_active.png)  no-repeat;background-size: contain;}

    .footer  .left {
			left: 10px;
		}
</style>