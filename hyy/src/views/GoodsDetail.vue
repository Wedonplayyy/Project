<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="orange">
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
        <div class="info2">
          <div>运费:0</div>
          <div>剩余数量:10000</div>
          <div style="display: flex;width:80px;justify-content: flex-end">
            <div style="margin: 0px 5px" >
              {{this.text}}
            </div>
              <van-icon
                :name="this.name"
                size="16px"
                :color="this.color"
                @click="collect"/>
          </div>
        </div>
      <div class="info3">
        <div style="display: flex">
          <van-icon name="shop-o" size="20px"/>
          <div style="margin: 0px 5px">
            有赞的店
          </div>
          <van-tag type="danger" size="medium">官方</van-tag>
        </div>
        <div style="display: flex">
          <div style="margin: 0px 5px">
            进入店铺
          </div>
          <van-icon name="arrow" size="20px"/>
        </div>
      </div>
        <div>
          <van-tabs v-model="active" sticky :offset-top="44">
            <van-tab title="商品详情">
              <div class="pic" v-html="this.data.detail">
              </div>
            </van-tab>
            <van-tab title="商品评论">
              <div style="display: flex;height: 100px;">
                <div style="margin:auto">
                  暂无评论
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      <div class="footer"></div>
      <div>
        <van-goods-action>
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
          />
          <van-goods-action-icon
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
      </div>
    </div>
</template>

<script>
  import {Dialog, Toast} from "vant";
    export default {
        name: "GoodsDetail",
        components: {
          [Dialog.Component.name]: Dialog.Component
        },
        props: {},
        data() {
            return {
              text:'收藏',//收藏按钮文字
              color:'red',//收藏按钮颜色
              name:'like-o',//收藏按钮图标
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
          collect(){
            if(
              this.$store.state.user.keeplogin === 0
            ){
              Dialog.alert({
                title: '提示',
                message: '请先登录！'
              }).then(() => {
                this.$router.push({
                  path:'/login'
                })
              });

            }else{
              if(this.text==='收藏'){
                this.text='取消收藏';
                this.name='like';
                console.log(this.text);
                this.$toast('收藏成功！');
              }else{
                this.text='收藏';
                this.name='like-o';
                this.$toast('取消收藏成功！');
              }
            }
          },
          showCart(){
            // Toast.loading({
            //   mask: true,
            //   message: '加载中...'
            // });
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
        watch: {
          text:function(){
            return this.text
          },
        },
        directives: {}
    }
</script>

<style scoped>
  .container{
  }
  .pic{
  }
  .header{
    width:100%;
    height:25px;
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
    padding: 5px 10px;
    align-items: center;
    height:30px;
    font-size: 12px;
    border:1px solid #eeeeee;
    justify-content: space-between;
  }
  .info3{
    display: flex;
    padding: 10px 10px;
    align-items: center;
    height:30px;
    font-size: 15px;
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
