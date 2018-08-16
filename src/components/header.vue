<style>
	.header {
		position: fixed;
		line-height: 38px;
		color: #fff;
		text-align: center;
		background: #222;
		width:100%;
		left: 0;
		top: 0;
	
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