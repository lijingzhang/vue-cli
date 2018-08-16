<style >
	.footer {
		position: fixed;
		line-height: 38px;
		color: #fff;
		text-align: center;
		background: #222;
		left: 0;
		bottom: 0;
		width:100%;
		display: inline-block;
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
     .footer .item a {
				color: #fff;
			}
       .footer  .left {
			left: 10px;
		}
</style>
<template>
	<footer class="footer">
		<el-row :gutter="20">
			<el-col :span="8"><router-link to="/">首页</router-link></el-col>
			<el-col :span="8"><router-link to="/">首页</router-link></el-col>
			<el-col :span="8"><router-link to="/">会员中心</router-link></el-col>
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