<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="全部订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <van-tabs v-model="active">
        <van-tab title="全部">内容 1</van-tab>
        <van-tab title="待支付">内容 2</van-tab>
        <van-tab title="代发货">内容 3</van-tab>
        <van-tab title="待收货">内容 4</van-tab>
        <van-tab title="已完成">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AllOrder",
    components: {
    },
    props: {},
    data() {
      return {
        active: 0,
      };
    },
    methods: {
      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },
    },
    mounted() {
    },
    created() {

    },
    filters: {},
    computed: {
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped>
  .container{}
  .body{
    margin-top: 46px;
  }
</style>
