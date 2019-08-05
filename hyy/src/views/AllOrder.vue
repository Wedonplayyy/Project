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
      <van-tabs  sticky v-model="active">
        <van-tab title="全部">
          <div class="item" v-for="item in this.orderInfo">
            <div class="id">
              订单编号:{{item.order_id}}
            </div>
            <div
              class="good"
              v-for="good in item.order_list">
              <img :src="good.image_path" width="80px" height="80px">
              <div class="good-name">
                {{good.name}}
              </div>
              <div class="price">
                <div style="text-align: right;color:red;">
                ￥{{good.present_price}}
                </div>
                <div style="text-align: right;margin-top: 2px;color:grey;">
                  x{{good.count}}
                </div>
              </div>
            </div>
            <div class="footer">
              <div style="text-align: right">
                创建时间:{{item.add_time}}
              </div>
              <div style="text-align: right;">
                收货地址:{{item.address}}
              </div>
              <div style="text-align: right">
                共{{item.order_list.length}}件商品，合计：{{item.mallPrice.toFixed(2)}}
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="代发货">内容 3</van-tab>
        <van-tab title="待收货">内容 4</van-tab>
        <van-tab title="已完成">

        </van-tab>
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
        active: 0,//
        orderInfo:{},//已完成订单详情
      };
    },
    methods: {
      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },
    },
    mounted() {
      this.$axios.req('api/myOrder')
        .then((res) =>{
          console.log(res);
          this.orderInfo= res.data.list;
        }).catch((err) =>{
        console.log(err);
      })
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
    font-size: 16px;
  }
  .item{
    margin: 10px 0px 20px 0px;
    /*height:375px;*/
  }
  .id{
    font-size: 16px;
    width:355px;
    height:25px;
    padding:8px 10px;
  }
  .good{
    display: flex;
  }
  .good img{
    border:solid 2px #eeeeee;
    margin: 10px 15px;
  }
  .good-name{
    font-size: 16px;
    width:170px;
    padding: 10px 0px;
  }
  .price{
    font-size: 16px;
    padding: 10px 8px;
    width:70px;
  }
  .footer{
    width:359px;
    padding:5px 8px;
  }
  .footer div{
    margin:5px 0px;
  }

</style>
