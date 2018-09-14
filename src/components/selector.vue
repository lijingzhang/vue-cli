<template>
    <div class="selector">
         <i class="el-icon-remove" @click="reduceCart() "></i>
         <span >{{food_num}}</span>
         <i  class="el-icon-circle-plus" @click="addCart()"></i>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
    export default {
        //    接收父组件传递进来的货物  和 商店 id 和图片url
        props: ['food_id', 'name', 'price', 'pic'],
        methods:{
            addCart(){
                let pic_url = this.shopInfo;   //商店名字 图片
                let shopname = this.shopInfo.name;
                this.$store.dispatch('addCart', {
                    shopname,
                    pic_url,
                    name: this.name,
                    price: this.price,
                    foods_pic: this.pic,
                    food_id: this.food_id,
                    shopid: this.shopInfo.id,
                })
               
            }
        },
        created(){

        },
        computed:{
            ...mapGetters([
            'cartList', 'shopInfo'
        ]),  
         food_num() {
            let restaurant = this.cartList[this.shopInfo.id];
            return restaurant ? restaurant[this.food_id] ? restaurant[this.food_id]['num'] : 0 : 0;
        }
        }
    }
</script>

<style lang="scss" scoped>
    .selector{position: absolute;right: 15px;bottom: 10px;
            .el-icon-circle-plus,.el-icon-remove{ color: #f7c36d; font-size: 22px; }
            span{ padding: 3px 8px;}
        }
</style>
