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
      <div v-else class="text">
        <div v-if="this.datalist.length===0">
         购物车里空空如也~
        </div>
        <div v-else class="good">
            <van-checkbox-group
              class="card-goods"
              v-model="checkedGoods">
              <van-checkbox
                label-disabled="true"
                v-model="checked">
                <div class="grid-item" >{{this.text}}</div>
              </van-checkbox>

              <van-checkbox
                class="card-goods__item"
                label-disabled="true"
                v-for="item in this.datalist"
                :key="item.cid"
                :name="item.cid"
              >
                <div class="grid-item">
                  <div class="img">
                    <img :src="item.image_path" width="100%">
                  </div>
                  <div class="grid-text">
                    <div style=" color: red;margin-top: 15px">
                      {{item.name}}￥{{item.present_price}}
                    </div>
                    <div style="display: flex;justify-content: space-between;">
                      <div style="margin:20px 0px;display: flex; color: red; ">
                        ￥{{item.present_price}}
                      </div>
                      <div style="margin:20px 0px;display: flex;align-items: center" >
                        <van-icon name="add-o" size="18px" @click="edit(item.count-1,item.cid,item.mallPrice)" />
                        <input v-model="count" :placeholder="item.count">
                        <van-icon name="add-o" size="18px" @click="edit(item.count+1,item.cid,item.mallPrice)"/>
                      </div>
                    </div>
                  </div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
        </div>
        <div class="footer"></div>
      </div>
    </div>
</template>

<script>
  import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
    export default {
        name: "ShoppingCart",
        components: {
          [Card.name]: Card,
          [Checkbox.name]: Checkbox,
          [SubmitBar.name]: SubmitBar,
          [CheckboxGroup.name]: CheckboxGroup
        },
        props: {},
        data() {
            return {
              text:'全选',
              checked:false,//选择框
              data:'',//post返回数据
              keeplogin:0,//登录状态
              datalist:[],//购物车商品列表
              checkedGoods: [ ],
            };
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          edit(count, id, mallPrice){
            this.$axios.req('api/editCart',{ count:count,
              id:id,
              mallPrice:mallPrice})
              .then((res)=>{
                console.log(res);
                this.$toast(res.data.msg);
              }).catch((err)=>{
              console.log(err);
            });
            this.mounted();
          }
        },
        mounted() {
          this.keeplogin=this.$store.state.user.keeplogin;
          this.$axios.req('api/getCard', {})
            .then((res) => {
              console.log(res.data);
              if(res.data.code > 0){
                // console.log(res);
                this.data = res.data;
                console.log(this.data);
                console.log('购物车有'+this.data.shopList.length);
                console.log('登录状态'+this.keeplogin);
                this.datalist = this.data.shopList;
              }
              else{
                console.log(res.data.msg);
              }
            }).catch((err) => {
            console.log(err);
          });
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
  .container{
    /*background-color: #eeeeee;*/
    /*height:1000px;*/
  }
  .text{
  }
  .good{
    margin-top: 46px;
    margin-left: 15px;
  }
  .grid-item{
    background-color: white;
    display: flex;
    width: 305px;
    height:100px;
    padding:10px 15px 10px 10px;
    align-items: center;
    font-size: 16px;
  }
  .grid-text{
    margin:0px 0px 0px 10px;
    width:223px;
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
</style>
