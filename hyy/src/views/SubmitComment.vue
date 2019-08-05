<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="评价中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body">
      <div class="item">
        <div class="img">
          <img
            :src="this.good.image_path"
            width="70px"
            height="70px">
        </div>
        <div class="comment">
          <div>
            商品评分
          </div>
          <van-rate
            v-model="value"
            :size="25"
            color="#f44"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
      <div class="textarea">
        <textarea placeholder="说说你的购买感受吧~~" v-model="content"></textarea>
      </div>
      <div class="upload"></div>
      <div class="checkbox">
          <van-checkbox v-model="checked">是否匿名</van-checkbox>
      </div>
      <div class="button">
        <van-button type="primary" @click="onSubmit">提交</van-button>
      </div>
    </div>
    </div>
    
</template>

<script>
  import axios from 'axios';
    export default {
        name: "SubmitComment",
        components: {},
        props: {},
        data() {
            return {
              good:{},//待评论商品的信息
              value: 3,//评分
              content:'',//评价内容
              checked:false,//是否匿名
              comment:{},//提交评价的请求参数
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          onSubmit(){
            this.comment = {
              anonymous:this.checked,
              content:this.content,
              image:[],
              rate:this.value,
              id:this.good.cid,
              order_id:this.good.order_id,
              _id:this.good._id
            };
            console.log(this.comment);
            axios.post('api/goodsOne/comment',this.comment)
              .then((res) =>{
                console.log(res);
                this.$toast(res.data.msg);
              }).catch((err) =>{
              console.log(err);
            })
          }
        },
        mounted() {
          this.good = this.$store.state.commentGood;
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
  .textarea{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  textarea{
    border: solid 1px #eeeeee;
    width:340px;
    height:250px;
    font-size: 14px;
  }
  .img{
    padding: 5px 20px;
  }
  .button{
    display: flex;
    align-items: center;
    justify-content: center;
    height:60px;
    width:375px;
  }
  .button button{
    margin:5px;
    width:200px;
  }
  .checkbox{
    width:340px;
    font-size: 18px;
    height:25px;
    margin:10px 20px;
  }
</style>
