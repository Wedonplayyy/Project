<template>
    <div class="container">
        <div class="header">
          <p>会员中心</p>
        </div>
      <div class = 'bg-container'>
        <div class="bg-item" >
          <div class="tx">
            <img src="../assets/tx.jpg" >
          </div>
          <div v-if="this.$store.state.user.keeplogin!==0">
            <p >
              欢迎你,{{this.username}}
            </p>
            <p style="font-size: 15px" @click="logout">
              退出登录
            </p>
          </div>
          <div v-else>
            <p >
              未登录
            </p>
            <p style="font-size: 15px">
              <router-link to="/login">登录/注册</router-link>
            </p>
          </div>

        </div>
      </div>

      <div>
        <van-grid :border="false" :column-num="5">
          <van-grid-item
            icon="balance-o"
            text="待付款"
          />
          <van-grid-item
            icon="send-gift-o"
            text="待发货"
          />
          <van-grid-item
            icon="logistics"
            text="待收货"
          />
          <van-grid-item
            icon="comment-o"
            text="评价"
          />
          <van-grid-item
            icon="points"
            text="已完成"
          />
        </van-grid>

        <div class="item" @click="toAllOrder">
<!--          全部订单-->
          <div class="icon">
            <van-icon name="orders-o"></van-icon>
          </div>
          <div class="text">
            全部订单
          </div>
          <div class="arrow">
            <van-icon name="arrow" to></van-icon>
          </div>
        </div>


        <div class="item" @click="toCollection">
<!--          收藏商品-->
          <div class="icon">
            <van-icon name="star-o"></van-icon>
          </div>
          <div class="text">
            收藏商品
          </div>
          <div class="arrow">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>


        <div class="item">
          <!--          地址管理-->
          <div class="icon">
            <van-icon name="edit"></van-icon>
          </div>
          <div class="text">
            地址管理
          </div>
          <div class="arrow">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>


        <div class="item">
          <!--          最近浏览-->
          <div class="icon">
            <van-icon name="search"></van-icon>
          </div>
          <div class="text">
            最近浏览
          </div>
          <div class="arrow">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import {Toast} from "vant";

  export default {
    name: 'User',
    components: {},
    props: {},
    data() {
      return {
        username:''//用户名
      };
    },
    methods: {
      logout(){
        // Toast( '退出账户中...');
        this.$axios.req('api/loginOut',{})
          .then((res)=>{
            if(res){
              this.$store.commit('set_keeplogin', 0);
              // console.log(res);
              console.log(this.$store.state.user.keeplogin);
            }
          }).catch((err)=>{
          console.log(err);
        })
      },//登出
      toAllOrder(){
        this.$router.push({
          path:'/allorder'
        })
      },
      toCollection(){
        this.$router.push({
          path:'/collection'
        })
      },
    },
    mounted() {
      // console.log(this.$store.state.user.keeplogin);
      if(this.$store.state.user.keeplogin!==0){
        this.username = this.$store.state.user.username;
        // console.log(this.username);
      }
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  };
</script>

<style scoped>
  .container{
    background-color: #eeeeee;
    height:667px;
  }
  .header{
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin:0 auto;
    width:100%;
    height: 35px;
    text-align: center;
  }
  .header p{
    font-size:15px;
  }
  .tx{
    border-radius:50%;
    align-self:center;
  }
  .bg-container{
    display: flex;
    background-color: #e30c7b;
    width:375px;
    height:220px;
    color: white;
    font-size: 22px;
  }
  .bg-item{
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  .bg-item p{
    text-align: center;
    font-size: 22px;
  }
  .tx{
    width:70px;
    height:70px;
    border-radius: 50%;
    overflow: hidden;
  }
  .tx img{
    width:100%;
  }
  .item{
    display:flex;
    align-items: center;
    background-color: white;
    margin: 2px 0 0px 0px;
    height: 35px;
    font-size:16px;
    padding: 5px 0px 5px 15px;
  }
  .text{
    width:150px;
  }
  .icon{
    height:100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    margin:0px 10px 0px 5px;
  }
  .arrow{
    width:100%;
    height:100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
  }

</style>
