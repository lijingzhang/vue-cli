<template>
	<div >
        <el-container  >
        <v-header title="个人中心"></v-header>
          <div  class="comomtips" v-show="loadShow"><i class="el-icon-loading"></i></div>
        <el-main>
            <div class="p15 tl">
                 <label class="avatar" for="file">
                    <img :src="avatar" class="headimg ">
                    <input id="file" type="file" accept="image/*" mutiple="mutiple" @change="fileUpload($event)" style="display: none;">
                </label>
                <span>{{dataArr.username}}</span>
            </div>
            <el-row class="mb15 border-t10">
                <el-col :span="6" class="mt15" v-for="(item,id) in myFunList" :key="id">
                    <router-link :to="item.url">
                        <div><img :src="item.picUrl"  width="40"></div>
                        <div class="tc">{{item.name}}</div>
                    </router-link>
                </el-col>
            </el-row>
             <div class="list_group border-t10">
              <div class="list_head">我的资产</div>
                <div class="list_item" >
                     <el-row class="mb15  " >
                        <el-col :span="6" class="mt10"  v-for="(item,id) in myAssetsList" :key="id">
                            <div><img :src="item.picUrl"  width="30"></div>
                            <div class="tc">{{item.name}}</div>
                        </el-col>
                    </el-row>
                </div>
                 
             </div>
              <div class="list_group border-t10">
              <div class="list_head">更多推荐</div>
                <div class="list_item" >
                     <el-row class="mb15  " >
                        <el-col :span="6" class="mt10"  v-for="(item,id) in introList" :key="id">
                            <div><img :src="item.picUrl"  width="30"></div>
                            <div class="tc">{{item.name}}</div>
                        </el-col>
                    </el-row>
                </div>
                 
             </div>
        </el-main>
           <v-footer></v-footer>
        </el-container>
    </div>
</template>
<script>
    import {userInfo} from '@/api/user'
    import {uploadToken, upload,changeAvatar} from '@/api/upload'
    import config from '@/config'
    export default {
        data() {
            return {
                dataArr:[],
                loadShow:false,
                avatar:'',
                myFunList: [
                {
                    url: '/centerindex',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/9c1388ba5fbb367c1a93996f39c2fba94506.jpg',
                    name: '我的收藏'
                },
                {
                    url: '/centerindex',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/7ad7da19bfadd5e6081b7606025214254582.jpg',
                    name: '我的足迹'
                },
                {
                    url: '/centerindex',
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/5d02f44df0f9f26ea0eca95957824bae4444.jpg',
                    name: '我的评价'
                },
                {
                    url: '/centerindex',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/bbae84a587711ac12badb9453406ad694851.jpg',
                    name: '我的好友'
                },
                {
                    url: '/centerindex',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/5c1bf832376403ca2ab22b8d8748e0fd5479.jpg',
                    name: '答谢记录'
                },
                {
                    url: '/address',
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/a813bff1813024b05ff45422deac24bd4276.jpg',
                    name: '我的地址'
                }],
                myAssetsList: [
                {
                    name: '红包',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/a361ce97f9f00f2715bb960a789d925e2315.jpg',
                },
                {
                    name: '代金券',
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/875f13a76045b7f6862a2b7149babec32329.jpg',
                },
                {
                    name: '钱包',
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/2c14b3425c7bf1f3d63d11f47a7ef9ea2230.jpg',
                },
                {
                    name: '余额',
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/7b3e3fb4fc9b45dcda74d7e916f025ea2878.jpg'
                }
                ],
                introList: [
                {
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/cf5ddfcae114ed8d7d147d51064532252477.jpg',
                    name: '邀请有奖'
                },
                {
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/55748d5fa531a057258f68d029fe20542466.jpg',
                    name: '商家入驻'
                },
                {
                    picUrl: 'http://p1.meituan.net/50.0.100/xianfu/317aabdd31dfcfa1739149089a2e041a2780.jpg',
                    name: '帮助与反馈'
                },
                {
                    picUrl: 'http://p0.meituan.net/50.0.100/xianfu/55454d4faaed6ad212b2b8a929edef372425.jpg',
                    name: '在线客服'
                },
                ]
            }
        },
        created(){
            this.userinfo();
        },
      methods:{
          userinfo(){
               userInfo().then(res => {
                this.loadShow=false;
                    this.dataArr=res.data.data; //获取个人信息
                    this.avatar = res.data.data.avatar;
                }).catch((err) => {   //显示异常
                    console.log(err);
                });
          },
           fileUpload(event) {
            this.loadShow = true;
            let file = event.target.files[0];
            if (file.size > 1024 * 1024 * 3) {    //只能传2M以内照片
            this.alertText = '上传失败，只能传2M以内图片'
            this.showTip = true;
            } else {
            uploadToken().then((response) => {   //获取上传凭证
                if (response.data.status === 200) {
                let data = {token: response.data.uptoken, file}
                upload(data).then((upResponse) => {   //获取上传key
                    let pic_url = config.domain + upResponse.data.key
                    this.avatar = pic_url;
                    this.loadShow = false;
                    changeAvatar({pic_url}).then((updateResponse) => {  //更改头像
                    })     //更新到数据库
                })
                } else {
                this.alertText = response.data.message
                this.showTip = true;
                }
            })
            }
        },

      }
		
    }
</script>

<style lang="scss" scoped>
   .headimg{ border-radius: 50%;width: 50px; height: 50px; border: 1px solid #d5d5d5;}
   /* 列表 */
   .list_group{ padding:0 15px;border-top: 8px solid #f0eff5;}
   .list_item { padding: 10px 0;text-align:center; border-bottom: 1px solid #eeeeee;color: #333333}
   .list_item a{color: #333}
   .list_item:last-child{border-bottom: 0}
   .list_head{color: #666;border-bottom: 1px solid #f5f5f5;text-align: left;padding: 10px 0}
   .list_group i{ vertical-align: middle}
</style>
