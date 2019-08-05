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
              收货人:{{this.address.name}}
            </div>
            <div>
              电话:{{this.address.tel}}
            </div>
          </div>
          <div style="width: 280px;height:30px;font-size: 14px;display: flex;align-items: center;">
            收货地址:{{this.address.address +this.address.addressDetail}}
          </div>
        </div>
        <div style="display:flex;align-items: center">
          <van-icon name="arrow" size="25px" @click="toAddress"></van-icon>
        </div>
      </div>
      <img src="../assets/caitiao.jpg" width="375px" height="5px">
      <div class="item" v-for="item in this.orderList">
        <div class="img">
          <img :src="item.image_path" width="70px;" height="70px;">
        </div>
        <div class="grid-text">
          <div style=" color: red;margin-top: 15px">
            {{item.name}}
          </div>
          <div style="display: flex;justify-content: space-between;">
            <div style="margin:20px 0px;display: flex; color: red;align-items: center ">
              ￥{{item.present_price}}
            </div>
            <div style="margin:20px 0px;display: flex;align-items: center" >
              x{{item.count}}
            </div>
          </div>
        </div>
      </div>
      <van-submit-bar
        :price="this.totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
    </div>

</template>

<script>
  import axios from 'axios';
    export default {
        name: "ShoppingPayMent",
        components: {},
        props: {},
        data() {
            return {
              address:{},//地址详情
              totalPrice:0,//总价
              shopList:{},//购物车列表
              orderList:[],//订单商品列表
              orderId:[],//订单结算时的商品id数组
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          onSubmit(){//提交订单
            this.$store.commit('set_order',{
              address:this.$store.state.chooseAddress.address+this.$store.state.chooseAddress.addressDetail,
              orderId:this.orderList,
              totalPrice:this.totalPrice,
              idDirect:false,
              count:this.orderList.length,
            });
            console.log(this.$store.state.order);

            axios.post('api/order',{
              address:this.$store.state.chooseAddress.address+this.$store.state.chooseAddress.addressDetail,
              tel:this.$store.state.chooseAddress.tel,
              orderId:this.orderId,
              totalPrice:this.totalPrice,
              idDirect:false,
              count:this.orderList.length,
            }).then((res) =>{
              console.log(res);
              this.$toast(res.data.msg);
              this.$router.back(-1);
            }).catch((err) =>{
              console.log(err);
            })
          },
          toAddress(){//地址管理
            this.$router.push({
              path:'/address'
            })
          },
          getOrder(arr1,arr2,list){
            arr1.map(function f1(val1) {
              arr2.map(function f2(val2) {
                if(val1==val2.cid){
                  list.push(val2);
                };
              })
            })
            return list;
          },
        },
        mounted() {
          this.name = this.$store.state.chooseAddress.name;
          this.address=this.$store.state.chooseAddress;
          this.totalPrice = this.$store.state.order.totalPrice*100;
          this.orderId = this.$store.state.order.orderId;
          if(!this.$store.state.order.isDirect){
            console.log(this.$store.state.chooseAddress);
            let arr1=[];
            let arr2=[];

            this.$axios.req('api/getCard', {})
              .then((res)=>{
                console.log(res);
                this.shopList = res.data.shopList;
                arr1 = this.$store.state.order.orderId;
                console.log(arr1);
                arr2 = this.shopList;
                console.log(arr2);
                this.orderList=this.getOrder(arr1, arr2,this.orderList);
                console.log(this.orderList);

              }).catch((err)=>{
              console.log(err);
            });
          }else{
            this.orderList=[];
          }
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
  .item{
    background-color: #eeeeee;
    display: flex;
    height:100px;
    /*width: 375px;*/
    margin: 2px 0px;
    padding:10px 15px 5px 20px;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .grid-text{
    padding:0px 0px 0px 10px;
    width:223px;
    background-color: #eeeeee;
    font-size: 14px;
  }
  .img{
    border: solid 1px #eeeeee;
    width:70px;
    height:70px;
  }
  .img img{
    width:70px;
    height:70px;
  }

</style>
