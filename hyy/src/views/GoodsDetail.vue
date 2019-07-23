<template>
    <div class="container">
      <div class="pic" v-html="this.data.detail">
      </div>

      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in this.str"
          :key="index">
            <img :src="item" width="100%" height="auto;">
          </van-swipe-item>
        </van-swipe>
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
              data:{},
              id:'',
              str:[]
            }
        },
        methods: {
          onClickLeft(){
            this.$toast('返回')
          },
          onClickIcon() {
            this.$toast('点击图标');
          },
          onClickButton() {
            this.$toast('点击按钮');
          }
        },
        mounted() {
          this.id = this.$store.state.selectedId ;
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
    background-color: #eeeeee;
  }
  .pic{
  }
  .swipe{
    margin-top: 2px;
  }
  .footer{
    width:100%;
    height:60px;
  }
</style>
