<template>
    <div class="container">
        <div class="header">
          <p>会员中心</p>
        </div>
      <div class = 'bg-container'>
        <div class="bg-item">
          <div class="tx">
            <img src="../assets/tx.jpg">
          </div>
          <p>
            欢迎你
          </p>
          <p style="font-size: 15px">
            退出登录
          </p>
        </div>
      </div>

      <div>
        <van-grid :border="false" :column-num="5">
          <van-grid-item
            :key="value"
            icon="balance-o"
            text="待付款"
          />
          <van-grid-item
            :key="value"
            icon="send-gift-o"
            text="待发货"
          />
          <van-grid-item
            :key="value"
            icon="logistics"
            text="待收货"
          />
          <van-grid-item
            :key="value"
            icon="comment-o"
            text="评价"
          />
          <van-grid-item
            :key="value"
            icon="points"
            text="已完成"
          />
        </van-grid>
      </div>
    </div>

</template>

<script>
  export default {
    name: 'User',
    components: {},
    props: {},
    data() {
      return {};
    },
    methods: {},
    mounted() {

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
    height:1000px;
  }
  .header{
    /*padding: 2px;*/
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
    border-radius:50%
  }
  .bg-container{
    display: -webkit-flex;
    display: flex;
    background-color: #e30c7b;
    width:375px;
    height:220px;

    color: white;
    font-size: 22px;
  }
  .bg-item{
    margin: auto;
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
    width:100%
  }
</style>
