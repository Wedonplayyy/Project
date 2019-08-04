<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="订单结算"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <div class="address">
        <div class="icon">
          <van-icon name="location-o" size="35px"></van-icon>
        </div>
        <div style="padding:10px 5px;font-size: 14px;display: flex;flex-direction: column;">
          <div style="display: flex;justify-content: space-between;width: 280px;height:30px;">
            <div style="font-size: 14px;">
              收货人
            </div>
            <div>
              电话
            </div>
          </div>
          <div style="width: 280px;height:30px;font-size: 14px;display: flex;align-items: center;">
            收货地址
          </div>
        </div>
        <div style="display:flex;align-items: center">
          <van-icon name="arrow" size="25px"></van-icon>
        </div>
      </div>
      <img src="../assets/caitiao.jpg" width="375px" height="5px">
    </div>
    </div>

</template>

<script>
    export default {
        name: "ShoppingPayMent",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped>
  .body{
    margin-top: 46px;
  }
  .address{
    /*height:75px;*/
    display: flex;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    margin-left: 5px;
  }

</style>
