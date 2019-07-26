<template>
  <div id="app">


    <router-view/>
    <van-tabbar
      :fixed="true"
      v-model="tab"
      v-if="($route.name === 'home')||($route.name === 'category')||($route.name === 'shoppingcart')||($route.name === 'user')"
    @change="change">
      <van-tabbar-item icon="wap-home" to="/">商城</van-tabbar-item>
      <van-tabbar-item icon="ellipsis" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shoppingcart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
  export default {
    name: 'App',
    data() {
      return {
        tab: 0,
      };
    },
    methods:{
      change(){
         this.$store.state.tabActive = this.tab;
      }
    },
    mounted() {
      switch(this.$route.name){
        case 'home':
          this.tab = 0;
          break;
        case 'category':
          this.tab = 1;
          break;
        case 'shoppingcart':
          this.tab = 2;
          break;
        case 'user':
          this.tab = 3;
          break;
      };
    },
    updated() {
        this.tab = this.$store.state.tabActive ;
    }
  };
</script>
<style>

</style>
