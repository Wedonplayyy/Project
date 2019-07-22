<template>
    <div>
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in this.arr"
          :key="index">
            <img v-html='item'>{{item}}
          </van-swipe-item>
        </van-swipe>
      </div>

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
              str:'',
              arr:[]
            }
        },
        methods: {
          onClickLeft(){
            this.$toast('返回')
          }
        },
        mounted() {
          this.id = this.$store.state.selectedId ;
          this.$axios.req('api/goods/one?id='+this.id)
            .then((res)=>{
              if(res){
                this.data = res.data.goods.goodsOne;
                this.str = this.data.detail.replace(/>/g, ">gg");
                console.log(this.str);
                this.arr = this.str.split("gg");
                console.log(this.arr);
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
  .swipe{
    margin-top: 2px;
  }
  .footer{
    width:100%;
    height:60px;
  }
</style>
