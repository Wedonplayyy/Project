<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="评价中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="image">
      <img src="../assets/evaluate.jpg" width="375px">
    </div>
    <van-tabs  sticky v-model="active">
      <van-tab title="未评论">
        <div class="item" v-for="item in this.list1">
          <div class="img">
            <img :src="item.image_path" width="80px" height="80px">
          </div>
          <div>
            <div class="good-name">
              {{item.name}}
            </div>
            <div class="button">
              <van-button
                round
                plain
                icon="chat-o"
                type="danger"
                size="small"
                @click="toComment(item)"
              >评论晒单</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已评论">
        <div class="item" v-for="item in this.list2">
          <div class="img" v-for="good in item.goods">
            <img :src="good.image_path" width="80px" height="80px">
          </div>
          <div v-for="good in item.goods">
            <div class="good-name">
              {{good.name}}
            </div>
            <div class="button">
              <van-button
                round
                plain
                icon="chat-o"
                type="danger"
                size="small"
                @click="toAlreadyComment"
              >点击查看</van-button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    </div>
    
</template>

<script>
    export default {
        name: "Comment",
        components: {},
        props: {},
        data() {
            return {
              active:0,
              list1:[],//未评价商品列表
              list2:[],//已评价商品列表
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          toComment(i){
            this.$store.commit('set_comment',i)
            console.log(this.$store.state.commentGood);
            this.$router.push({
              path:'/SubmitComment'
            })
          },
          toAlreadyComment(){
            this.$router.push({
              path:'/alreadyEvaluated'
            })
          },
        },
        mounted() {
          this.$axios.req('api/tobeEvaluated')
            .then((res)=>{
              if(res){
                console.log(res);
                this.list1 = res.data.data.list;
              }
            }).catch((err)=>{
            console.log(err);
          })
          this.$axios.req('api/alreadyEvaluated')
            .then((res)=>{
              if(res){
                console.log(res);
                 this.list2 = res.data.data.list;
                console.log(this.list2);
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
  .image{
    margin-top: 46px;
  }
  .item{
    display: flex;
    margin: 10px 10px;
    /*height:375px;*/
  }
  .img{

  }
  .img img{
    border:solid 2px #eeeeee;
    margin: 10px 15px;
  }
  .good-name{
    font-size: 14px;
    width:200px;
    padding: 20px 10px;
  }
  .button{
    display: flex;
    flex-direction: row-reverse;
  }
</style>
