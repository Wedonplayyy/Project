<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="swipe" @click="Preview">
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
            <div style="margin: 0px 5px">
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
            @click="addShop"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="buy"
          />
        </van-goods-action>
      </div>
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :hide-stock="sku.hide_stock"
        :show-add-cart-btn="sku.hide_stock"
        @buy-clicked="onBuyClicked"
      />
    </div>
</template>

<script>
  import axios from 'axios'
  import {Dialog, ImagePreview} from "vant";
    export default {
        name: "GoodsDetail",
        components: {
          [Dialog.Component.name]: Dialog.Component
        },
        props: {},
        data() {
            return {
              defaultAdd:{},//默认地址，方便直接购买用
              text:'收藏',//收藏按钮文字
              color:'red',//收藏按钮颜色
              name:'like-o',//收藏按钮图标
              active:0,//选中商品分类
              data:{},//商品的goodsOne
              id:'',//选中的商品sub_id
              good:{},//商品详情页的商品对象
              isCollection:0,//是否收藏
              show: false,//点击立即购买显示

              sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [],
                list: [],
                price: '1.00', // 默认价格（单位元）
                stock_num: 10000, // 商品总库存
                none_sku: true, // 是否无规格商品
                messages:[
                ],
                hide_stock: false // 是否隐藏剩余库存
              },
              goods: {
                // 商品标题
                title: ' ',
                // 默认商品 sku 缩略图
                picture: ' '
              },
            }
        },
        methods: {
          Preview(){
            ImagePreview([
              this.data.image,
              this.data.image
            ]);
          },
          onBuyClicked(skuData){//直接购买

            skuData.goodsId = this.id;
            this.$store.commit('set_order',{
              address:this.defaultAdd.address+this.defaultAdd.addressDetail,
              tel:this.defaultAdd.tel,
              orderId:[skuData.goodsId],
              totalPrice:(skuData.selectedSkuComb.price*skuData.selectedNum)/100,
              idDirect:true,
              count:1,
            });
            console.log(skuData);
            this.$router.push({
              path:'/shoppingPayMent'
            })
          },
          onClickLeft(){//点击返回回到上一页
            this.$router.back(-1);
          },
          collect(){//收藏按键
            if(
              this.$store.state.user.keeplogin === 0//判断是否登录
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
                this.$axios.req('api/collection',this.data)
                  .then((res)=>{
                    console.log(res);
                    this.$toast(res.data.msg);
                  }).catch((err)=>{
                  console.log(err);
                });
                this.text='取消收藏';
                this.name='like';
                console.log(this.good);
              }else{
                this.$axios.req('api/cancelCollection',{id:this.id})
                  .then((res)=>{
                    console.log(res);
                    this.$toast(res.data.msg);
                  }).catch((err)=>{
                  console.log(err);
                });
                this.text='收藏';
                this.name='like-o';
              }
            }
          },
          showCart(){//购物车按钮
            this.$router.push({
              path:'/shoppingcart'
            })
            this.$store.commit('set_tabActive',2)
          },
          addShop(){//加入购物车
            this.$axios.req('api/addShop',{id:this.id})
              .then((res)=>{
                console.log(res);
                this.$toast(res.data.msg);
                if(res.data.code===-1){
                  this.$router.push({
                    path:'/login'
                  })
                }
              }).catch((err)=>{
              console.log(err);
            });
          },
          buy(){//立即购买
            this.show = true;
          }
        },
        mounted() {
          this.$axios.req('api/getDefaultAddress')
            .then((res) =>{
              this.defaultAdd=res.data.defaultAdd;
              this.$store.commit('choose_address',this.defaultAdd);
            }).catch((err) =>{
            console.log(err);
          })
          this.id = this.$store.state.selectedSubId ;
          this.$axios.req('api/goods/one?id='+this.id)
            .then((res)=>{
              if(res){
                this.good = res.data.goods;
                this.data = res.data.goods.goodsOne;
                this.goods.title = this.data.name;
                this.goods.picture = this.data.image;
                this.sku.price = this.data.present_price;
                console.log(this.data);
              }
            }).catch((err)=>{
            console.log(err);
          })
          axios.post('api/isCollection',{id:this.id})
            .then((res)=>{
              console.log(res);
              this.isCollection=res.data.isCollection;
              if(this.isCollection){
                this.text = '取消收藏';
                this.name = 'like';
              }
            }).catch((err)=>{
            console.log(err);
          })
          axios.post('api/goodsOne/comment',this.good)//查询评论
            .then((res)=>{
              if(res){
                console.log(res);
              }
            }).catch((err)=>{
            console.log(err);
          });
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
