<template>
  <div id="app">
    <van-nav-bar
      v-if="$route.name ==='GoodsDetail'"
      fixed="true"
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
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
