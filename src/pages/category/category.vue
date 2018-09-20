<template>
	<div >
	<el-container  style="height: 100%;margin-top:45px;">
        <v-header title="分类">
			  <span slot="left"  @click="$common.back()"><i class="el-icon-arrow-left"></i></span>
		</v-header>
      
      
  <el-aside width="30%" style="background-color: ccc" ref="aside">
    <el-menu :default-openeds="['1', '2']"> <!--默认打开第几个-->
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>蔬菜</template>
            <el-menu-item index="1-1"><router-link to="/fruit/123">叶菜</router-link></el-menu-item>
            <el-menu-item index="1-2">根茎菜</el-menu-item>
            <el-menu-item index="1-3">菌菇</el-menu-item>
            <el-menu-item index="1-4">豆制品</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
      <template slot="title"><i class="el-icon-setting"></i>肉类</template>
           <el-menu-item index="2-1"><router-link to="/fruit/134">猪肉</router-link></el-menu-item>
           <el-menu-item index="2-2">牛肉</el-menu-item>
           <el-menu-item index="2-3">羊肉</el-menu-item>
           <el-menu-item index="2-4">鸡鸭禽肉</el-menu-item>
            <el-menu-item index="2-5">蛋</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>水果</template>
            <el-menu-item index="3-1">进口水果</el-menu-item>
            <el-menu-item index="3-2">热带水果</el-menu-item>
            <el-menu-item index="3-3">苹果梨</el-menu-item>
            <el-menu-item index="3-4">葡萄提子</el-menu-item>
            <el-menu-item index="3-5">奇异果</el-menu-item>
            <el-menu-item index="3-6">西瓜蜜瓜</el-menu-item>
      </el-submenu>
       <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>水果</template>
            <el-menu-item index="4-1">进口水果</el-menu-item>
            <el-menu-item index="4-2">热带水果</el-menu-item>
            <el-menu-item index="4-3">苹果梨</el-menu-item>
            <el-menu-item index="4-4">葡萄提子</el-menu-item>
            <el-menu-item index="4-5">奇异果</el-menu-item>
            <el-menu-item index="4-6">西瓜蜜瓜</el-menu-item>
      </el-submenu>
       <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>水果</template>
            <el-menu-item index="5-1">进口水果</el-menu-item>
            <el-menu-item index="5-2">热带水果</el-menu-item>
            <el-menu-item index="5-3">苹果梨</el-menu-item>
            <el-menu-item index="5-4">葡萄提子</el-menu-item>
            <el-menu-item index="5-5">奇异果</el-menu-item>
            <el-menu-item index="5-6">西瓜蜜瓜</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container class="pb0 right" ref="right">
    <el-main class="pt0">
          <router-view></router-view>
    </el-main>
  </el-container>
 
  	<footer>
		<el-row >
			<el-col :span="10" class="tl pl15">
                <el-badge :value="0" :max="99" class="item mr15">
                    <i class="el-icon-goods"></i>
                </el-badge>
                <span>已选（0）</span>
            </el-col>
			<el-col :span="14" >
                <el-row>
                    <el-col :span="14" class="tr pr10">
                         <span>￥41000</span>
                    </el-col>
                    <el-col :span="10">
                        <div class="btn" >结 算</div>
                    </el-col>
                </el-row>
                 
            </el-col>
		</el-row>
	</footer>
</el-container>


</div>
</template>
<script>

    export default {
        data() {
            return {
            fullHeight: document.documentElement.clientHeight,
             number : 10
            }
        },
       
        created(){
            this.$nextTick(() => {       //初始化better-scroll
            this.$refs.aside.$el.setAttribute('style','max-height:'+this.fullHeight+'px');
            this.$refs.right.$el.setAttribute('style','max-height:'+this.fullHeight+'px');

        });
        },
        mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
            window.fullHeight = document.documentElement.clientHeight
            that.fullHeight = window.fullHeight
        })()
      }
    },
		methods:{
	
		
        },
         watch: {
            fullHeight (val) {
                if(!this.timer) {
                this.fullHeight = val
                this.timer = true
                let that = this
                setTimeout(function (){
                    that.timer = false
                },400)
                }
            }
        }
		
    }
</script>

<style lang="scss" scoped>
    .right {
      position: relative;width: 70%;
      flex: 1;
      .el-main{
       
          article {
            section {
              display: flex;
              position: relative;
              margin: 0 0.5rem;
              padding: 0.2rem 0;
              border-bottom: 1px solid #f5f5f5;
             .img {
                margin-right: 1.5rem;
              }

              .info {
                flex: 1;
                vertical-align: top;text-align:left;
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size: 0.3rem;
                }
                .sell-num {
                  font-size: 0.3rem;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
              }
            }
          }
        }

    }
	footer {
		position: fixed;
		height:50px;line-height: 50px;
		color: #fff;
		text-align: center;
		background: #0d0d0d;
		left: 0;
		bottom: 0;
		width:100%;
        display: inline-block;z-index: 9999;
        .btn{ width: 100%; height: 50px;background: #f7c36d;color: #fff;}
        .el-icon-goods{ font-size: 22px}
        .el-badge__content{}
	}
</style>
