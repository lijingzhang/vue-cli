<template>
  <div class="wrapper" ref="wrapper">
      <el-container  >
    <v-header title="列表">
        <span slot="left"  @click="$common.back()">返回</span>
  
    </v-header>
      <el-main class="pt0"  >
      <div class="news" v-for="news in dataArr">
            <img :src="news.images.medium" alt="" class="news-image">
            <div class="news-info">
                <div class="news-title">{{ news.title }}</div>
                <div class="news-remark">{{ news.year }}</div>
            </div>
        </div>
         </el-main>
      <v-footer></v-footer>
      </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr:[],
     
    }
  },
  created() {
    this.loadData()
  },

  methods: {
    loadData() {
          this.$http.get('/top250?count=40').then(res => {
            console.log(res.data)
                
                     this.dataArr=res.data.subjects;//必须置空数组，才能下拉刷新不重复
                    // this.data = data;   
                      for(let i = 0; i <data.length ; i++) {
                        this.dataArr.push(data[i])
                      }
                    this.datalength=data.length;//赋值
                  
                }).catch((err) => {   //显示异常
                    console.log(err);
                });

    },

   

  },


  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

   .news {
        display: flex;
        align-items: stretch;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
    }
    
    .news:active {
        background-color: #f3f3f3;
    }

    .news-image {
        flex-shrink: 0;
        width: 95px;
        height: 62px;
        display: block;
        margin-right: 10px;
    }

    .news-info {
        padding: 5px 0;
        flex: 1;
        display: flex;text-align: left;
        flex-direction: column;
        justify-content: space-between;
    }

    .news-title {
        font-size: 14px;
        color: #333;
        line-height: 1.2;
    }

    .news-remark {
        font-size: 12px;
        color: #999;
    }


</style>
