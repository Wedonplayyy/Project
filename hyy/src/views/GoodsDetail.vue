<template>
    <div class="container">
<!--      <div style="height:45px;">-->
<!--        <van-nav-bar-->
<!--          fixed="true"-->
<!--          title="商品详情"-->
<!--          left-text="返回"-->
<!--          left-arrow-->
<!--          @click-left="onClickLeft"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="pic" v-html="this.data.detail">-->
<!--      </div>-->

      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img :src="this.data.image" width="100%" height="100%">
          </van-swipe-item>
          <van-swipe-item>
            <img :src="this.data.image" width="100%" height="100%">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="info1">
        <div class="goodname">
          {{this.data.name}}
        </div>
        <div class="goodprice">
          ￥{{this.data.present_price}}
          <div style="margin:0px 0px 0px 15px;font-size: 15px;color: grey;">
            <del>￥{{this.data.orl_price}}</del>
          </div>
        </div>
      </div>
      <div>
        <div class="info2">
          <div>运费:0</div>
          <div>剩余数量:10000</div>
          <div>收藏
            <div>
              <van-icon name="like-o" />
            </div>
          </div>
        </div>
      </div>
        <div>
          <van-tabs v-model="active">
            <van-tab title="商品详情">
              <div class="pic" v-html="this.data.detail">
              </div>
            </van-tab>
            <van-tab title="商品评论">
              商品评论
            </van-tab>
          </van-tabs>
        </div>

      <van-goods-action>
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
        />
        <van-goods-action-icon
          info="5"
          icon="cart-o"
          text="购物车"
          @click="showCart"
        />
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
        />
      </van-goods-action>

      <div class="footer"></div>
    </div>
</template>

<script>
    export default {
        name: "GoodsDetail",
        components: {},
        props: {},
        data() {
            return {
              active:0,
              data:{},
              id:'',
              str:[]
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          showCart(){
            this.$router.push({
              path:'/shoppingcart'
            })
            this.$store.commit('set_tabActive',2)
          }
        },
        mounted() {
          this.id = this.$store.state.selectedSubId ;
          this.$axios.req('api/goods/one?id='+this.id)
            .then((res)=>{
              if(res){
                this.data = res.data.goods.goodsOne;
                this.str = this.data.detail;
                let reg = /http:\/\/.*?(gif|png|jpg)/gi;
                this.str = this.str.match(reg);
              }
            }).catch((err)=>{
            console.log(err);
          })
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
  .container{
  }
  .pic{
  }
  .swipe{
    margin-top: 2px;
  }
  .info1{
    align-items: center;
    height:70px;
    font-size: 16px;
    border:1px solid #eeeeee;
  }
  .info2{
    display: flex;
    padding: 0px 10px;
    align-items: center;
    height:30px;
    font-size: 12px;
    border:1px solid #eeeeee;
    justify-content: space-between;
  }
  .goodname{
    margin:10px 0px 0px 10px;
  }
  .goodprice{
    display: flex;
    margin:15px 0px 0px 10px;
    color: red;
  }
  .footer{
    width:100%;
    height:60px;
  }
</style>
