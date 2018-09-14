<template>
	<header class="header">
		<div class="item left">
			<slot name="left"></slot>
		</div>
		<div class="title">{{title}}</div>
		<div class="item right">
			<slot name="right"></slot>
		</div>
	</header>
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
<style>
	.header {
		position: fixed;
		line-height: 45px;
		color: #fff;
		text-align: center;
		background: #0d0d0d;
		width:100%;
		left: 0;
		top: 0;
		z-index: 99;
	
	}
	@media (min-width: 320px){
    .header{font-size:12px;}
	}
	
	@media (min-width: 360px){
		.header{font-size:14px;}
	}
	.header	.item {
			position: absolute;
			top: 0;
			bottom: 0;
			z-index: 1;
		
		}
	.header	.item	a {
				color: #fff;
			}
	.header	.left {
			left: 10px;
		}
	.header	.right {
			right: 10px;
		}
</style>