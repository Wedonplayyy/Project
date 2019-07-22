<template>
    <div>
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="swipe">
        <div v-html="this.data.detail">
        </div>
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
              id:''
            }
        },
        methods: {
          onClickLeft(){
            this.$toast('返回')
          }
        },
        mounted() {
          this.id = this.$store.state.selectedId ;
          console.log(this.id);
          this.$axios.req('api/goods/one?id='+this.id)
            .then((res)=>{
              if(res){
                this.data = res.data.goods.goodsOne;
                console.log(res.data);
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
  .footer{
    width:100%;
    height:60px;
  }
</style>
