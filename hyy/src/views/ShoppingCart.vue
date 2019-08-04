<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <div v-if="this.keeplogin!==1" class="text">
        <div>
          您还尚未<router-link to="/login">登录</router-link>~
        </div>
      </div>
      <div v-else style="margin-top: 46px;display: flex">
        <div v-if="this.datalist.length===0" style="margin: auto">
         购物车里空空如也~
        </div>
        <div v-else class="good">
          <!--              全选-->
          <van-checkbox
                class="checkbox"
                :label-disabled="true"
                v-model="checked">
                <div class="grid-item" >
                  <div>{{this.text}}</div>
                  <div>
                    <div>合计：<font color="red"> ￥{{showTotalPrice}}</font></div>
                    <div>请确认订单</div>
                    <div>
                      <van-button type="danger" style="margin:5px 10px 0px 0px;" @click="deleteGood" >删除</van-button>
                      <van-button type="danger" @click="toPay">{{submitBarText}}</van-button>
                    </div>
                  </div>
                </div>

              </van-checkbox>
          <van-checkbox-group
            class="card-goods"
            v-model="checkedGoods"
            @change="showCheckedGoods">
              <van-checkbox
                class="checkbox"
                :label-disabled="true"
                v-for="(item,index) in this.datalist"
                :key="item.cid"
                :name="item.cid"
                :id="index"
                @change="showCheckedGoods"
              >
                <div class="grid-item">
                  <div class="img">
                    <img :src="item.image_path" width="100%">
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
                        <van-icon name="add-o" size="18px" @click="edit(item.count-1,item.cid,item.mallPrice)" />
                        <input
                          :id="item.cid"
                          :value="item.count"
                          onfocus="this.select()"
                          @keyup.enter="edit(item.count+1,item.cid,item.mallPrice)"
                          onblur="this.value=this.reset(item.count)">
                        <van-icon name="add-o" size="18px" @click="edit(item.count+1,item.cid,item.mallPrice)"/>
                      </div>
                    </div>
                  </div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
        </div>

      </div>
      <div class="footer"></div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {Checkbox, CheckboxGroup, Dialog} from 'vant';
    export default {
        name: "ShoppingCart",
        components: {
          [Checkbox.name]: Checkbox,
          [CheckboxGroup.name]: CheckboxGroup
        },
        props: {},
        data() {
            return {
              text:'全选',
              checked:true,//全选框状态，默认选中
              data:'',//post返回数据
              keeplogin:0,//登录状态
              datalist:[],//购物车商品列表
              checkedGoods: [ ],//复选框状态，默认全选
              countList:[],//数量列表
              totalPrice:0,//总价
              defaultAdd:{},//默认地址
            };
        },
        methods: {
          deleteGood(){
            Dialog.confirm({
              title: '提示',
              message: '确认删除吗',
            }).then(() => {
                axios.post('api/deleteShop',this.checkedGoods)
                  .then((res)=>{
                    console.log(res);
                    this.$toast(res.data.msg);
                    this.init();
                  }).catch((err)=>{
                  console.log(err);
                });

              console.log('删除成功');
            }).catch(() =>{
              return;
            });
          },
          showCheckedGoods(){//显示选中的商品cid
            console.log(this.checkedGoods);
          },
          toPay(){//结算
            this.$store.commit('set_order',{
              address:this.defaultAdd.address+this.defaultAdd.addressDetail,
              tel:this.defaultAdd.tel,
              orderId:this.checkedGoods,
              totalPrice:this.totalPrice,
              idDirect:false,
              count:this.checkedGoods.length,
            });
            console.log(this.$store.state.order);
            //   axios.post('api/order',{
          //     address:this.defaultAdd.address+this.defaultAdd.addressDetail,
          //     tel:this.defaultAdd.tel,
          //     orderId:this.checkedGoods,
          //     totalPrice:this.totalPrice,
          //     idDirect:false,
          //     count:this.checkedGoods.length,
          // })
          //     .then((res) =>{
          //       console.log(res);
          //       this.$toast(res.data.msg);
          //     }).catch((err) =>{
          //     console.log(err);
          //   })
            this.$router.push({
              path:'/ShoppingPayMent'
            })
          },
          submit(count,id,mallPrice){//修改数量时按下回车
            edit(count, id, mallPrice);
          },
          onClickLeft(){
            this.$router.back(-1);
          },
          edit(count, id, mallPrice){
            this.$axios.req('api/editCart',{
              count:count,
              id:id,
              mallPrice:mallPrice
            }).then((res)=>{
                console.log(res);
                this.$toast(res.data.msg);
              }).catch((err)=>{
              console.log(err);
            });
            this.init();
          },
          init(){//初始化
            this.$axios.req('api/getCard', {})//查询购物车
              .then((res) => {
                console.log(res.data);
                if(res.data.code > 0){
                  // console.log(res);
                  this.data = res.data;
                  console.log(this.data);
                  console.log('购物车有'+this.data.shopList.length);
                  console.log('登录状态'+this.keeplogin);
                  this.datalist = this.data.shopList;
                  this.checkedGoods = [];
                  for(let i in res.data.shopList){
                    this.checkedGoods.push(res.data.shopList[i].cid)
                  }
                  let set = new Set(this.checkedGoods);
                  this.checkedGoods = Array.from(set);
                  console.log(this.checkedGoods);
                }
                else{
                  console.log(res.data.msg);
                }
              }).catch((err) => {
              console.log(err);
            });
            this.$axios.req('api/getDefaultAddress')
              .then((res) =>{
              console.log(res);
              this.defaultAdd=res.data.defaultAdd;
            }).catch((err) =>{
              console.log(err);
            })
          }
        },
        mounted() {
          this.keeplogin=this.$store.state.user.keeplogin;
          if(this.keeplogin!==0){
            this.init();
          }

        },
        created() {

        },
        filters: {},
        computed: {
          submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
          },
          showTotalPrice(){
            this.totalPrice=this.datalist.reduce((total, item) => total + (this.checkedGoods.indexOf(item.cid) !== -1 ? item.present_price*item.count : 0), 0);
            return this.totalPrice;
          }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped>
  .container{
    /*background-color: #eeeeee;*/
    /*height:1000px;*/
  }
  .text{
    margin-top: 46px;
  }
  .checkbox{
    background-color: #eeeeee;
    padding:5px 5px;
    width: 365px;
  }
  .good{
    width: 100%;
  }
  .grid-item{
    background-color: #eeeeee;
    display: flex;
    height:100px;
    width: 315px;
    padding:10px 15px 10px 10px;
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
  .footer{
    width:100%;
    height:100px;
  }
  input{
    border: none;
    width: 30px;
    background-color: #eeeeee;
  }
</style>
