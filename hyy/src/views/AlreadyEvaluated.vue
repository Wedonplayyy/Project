<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="评价详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <div class="item">
<!--        <div class="img">-->
<!--          <img-->
<!--            :src="this.good.image_path"-->
<!--            width="70px"-->
<!--            height="70px">-->
<!--        </div>-->
<!--        <div class="comment">-->
<!--          <div>-->
<!--            商品评分-->
<!--          </div>-->
<!--          <van-rate-->
<!--            v-model="value"-->
<!--            :size="25"-->
<!--            color="#f44"-->
<!--            void-icon="star"-->
<!--            void-color="#eee"-->
<!--          />-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AlreadyEvaluated",
        components: {},
        props: {},
        data() {
            return {
              good:{},//查看评论详情的商品信息
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
        },
        mounted() {
          this.good = this.$store.state.AlreadyEvaluated;
          console.log(this.good);
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
  .textarea{
    margin: 5px 10px;
    display: flex;
  }
  .item{
    display: flex;
    width:365px;
    padding: 5px;
  }
  .comment{
    font-size: 15px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img{
    padding: 5px 20px;
  }
  .button button{
    margin:5px;
    width:200px;
  }
</style>
