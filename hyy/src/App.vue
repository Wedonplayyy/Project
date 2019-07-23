<template>
  <div id="app">


    <router-view/>
    <van-tabbar :fixed="true" v-model="active"
                v-if="($route.name === 'home')||($route.name === 'category')||($route.name === 'shoppingcart')||($route.name === 'user')">
      <van-tabbar-item icon="wap-home" to="/">商城</van-tabbar-item>
      <van-tabbar-item icon="ellipsis" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info="5" to="/shoppingcart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
  export default {
    name: 'App',
    data() {
      return {
        active: 0,
      };
    },
    methods:{

    }
  };
</script>
<style>

</style>
