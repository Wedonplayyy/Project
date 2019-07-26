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
        <div v-else></div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "ShoppingCart",
        components: {},
        props: {},
        data() {
            return {
              data:'',//post返回数据
              keeplogin:0,//登录状态
              datalist:[]//收藏商品列表
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
        },
        mounted() {

          this.keeplogin=this.$store.state.user.keeplogin;
          this.$axios.req('api/getCard', {})
            .then((res) => {
              if(res){
                console.log(res);
                this.data = res.data;
                console.log(this.data.shopList.length);
                console.log(this.keeplogin);
                this.datalist = this.data.shopList;
              }
            }).catch((err) => {
            console.log(err);
          });
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
    height:667px;
  }
  .text{
    width:100%;
    height:500px;
    display: flex;
    margin-top: 46px;
    text-align: center;
    align-items:center;
    justify-content: center;
  }
</style>
