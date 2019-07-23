<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active" v-if="$route.name !== 'GoodsDetail'">
      <van-tabbar-item icon="wap-home" to="/">商城</van-tabbar-item>
      <van-tabbar-item icon="ellipsis" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info="5" to="/shoppingcart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20" to="/user">我的</van-tabbar-item>
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
  };
</script>
<style>

</style>
