
<template>
<div >
   <!-- <div class="nwwest-roll" id="nwwest-roll">
        <ul id="roll-ul">
            <li v-for="item in list" ref="rollul" :class="{anim:animate==true}">
                <span class="name">{{item.name}}</span>
                <span class="site">{{item.site}}</span>
                <span class="gsmc">{{item.gsmc}}</span>

            </li>
        </ul>

    </div> -->
    <div class="relative">
        <button @click="showMenu" class="btn">{{text}}</button>
        <transition name="move">
            <div class="menu" v-show="show">
                <div class="inner inner-1">1</div>
            </div>
        </transition>
</div>
</div>
</template>
 
<script>
export default {
    data(){
        return  {
        //  animate:true,
        // list:[
        //     {"name":"于先生1","site":"北京门头沟区1","gsmc":"柠檬树装饰1"},
        //     {"name":"于先生2","site":"北京门头沟区2","gsmc":"柠檬树装饰2"},
        //     {"name":"于先生3","site":"北京门头沟区3","gsmc":"柠檬树装饰3"},
        //     {"name":"于先生4","site":"北京门头沟区4","gsmc":"柠檬树装饰4"},
        //     {"name":"于先生5","site":"北京门头沟区5","gsmc":"柠檬树装饰5"},
        //     {"name":"于先生6","site":"北京门头沟区6","gsmc":"柠檬树装饰6"},
        //     {"name":"于先生7","site":"北京门头沟区7","gsmc":"柠檬树装饰7"},
        //     {"name":"于先生8","site":"北京门头沟区8","gsmc":"柠檬树装饰8"},
        //     {"name":"于先生9","site":"北京门头沟区9","gsmc":"柠檬树装饰9"},
        //     {"name":"于先生10","site":"北京门头沟区10","gsmc":"柠檬树装饰10"},
        //     {"name":"于先生11","site":"北京门头沟区11","gsmc":"柠檬树装饰11"}
        // ],
       show: false
 
      } 
    },
   
   created(){
       setInterval(this.scroll,2000) 
},
 computed: {
            text () {
                return this.show ? '收' : '开';
            }
        },
  methods: {
//        scroll(){
//         let con1 = this.$refs.rollul;
//         con1[0].style.marginTop='30px';
//         this.animate=!this.animate;
//         var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
//         setTimeout(function(){
//             that.list.push(that.list[0]);
//             that.list.shift();
//             con1[0].style.marginTop='0px';
//             that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
//         },0)
//   },
       showMenu() {
                this.show = !this.show;
            }
}
}
</script>
 
<style lang="scss" scoped>
// .fade-in-active, .fade-out-active
//   {transition: all 0.5s ease  }   
// .fade-in-enter, .fade-out-active
//   {opacity: 0}
//  .nwwest-roll {
//     padding-left: 15px;
//     height: 40px;
//     margin: 0 auto;
//     overflow: hidden;
//      transition: all 0.5s;font-size:12px;
//      ul{ margin: 0;
//       li{
//         height: 35px;
//         line-height: 35px;

//         }

//      }
// }

// .anim{
//   transition: all 0.5s;

// }
 .btn{
    position: fixed;
    top:60px;
    left:50%;
    z-index:10;
    width:50px;
    height:50px;
    line-height:50px;
    border-radius: 50%;
    border:none;
    outline:none;
    color:#fff;
    font-size:18px;
    background:orange;
}
.inner-1{
    display: inline-block;
    position:absolute;
    width:30px;
    height:30px;
    line-height:30px;
    border-radius:50%;
    background: red;
    text-align:center;
    color:#fff;
    transition:all 1s;
    left:-100px;
    top:20px;
}
.menu{
    position:fixed;
    top:60px;
    left:50%;
    width:50px;
    height:50px;
    border-radius:50%;
    transition:all 1s linear;
}
/*上面主要都是样式代码*/
.move-enter-active > .inner-1{
    transform: translate3d(0,0,0);
}
.move-enter > .inner-1,
.move-leave-active >.inner-1{
    transition-timing-function: ease-in-out ;
    transform:translate3d(100px,100px,0) ;
}
</style>