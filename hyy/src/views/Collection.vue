<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="margin-top: 46px;"></div>
    <div class="grid-item" v-for="(item,index) in this.datalist" >
      <div class="img">
        <img :src="item.image_path" width="100%">
      </div>
      <div class="grid-text">
        <div style=" color: red;margin-top: 15px">
          {{item.name}}
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div :id="index" style="margin:20px 0px;display: flex; color: red; ">
            ￥{{item.present_price}}
          </div>
          <div :id="index" style="margin:20px 0px;display: flex;align-items: center">
            <van-icon :id="index" name="close" @click="cancelCollection"/>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  export default {
    name: "Collection",
    components: {
    },
    props: {},
    data() {
      return {
        datalist:[],//get请求的收藏商品
        idList:[],//收藏商品的id列表
      };
    },
    methods: {
      init(){
        this.$axios.req('api/collection/list')
          .then((res)=>{
            if(res){
              this.datalist = res.data.data.list
              console.log(res);
            }
          }).catch((err)=>{
          console.log(err);
        })
      },

      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },

      cancelCollection:function(e){
        console.log(e.target.id);
        this.$axios.req('api/cancelCollection',{id:this.datalist[e.target.id].cid})
        .then((res)=>{
          console.log(res);
          this.$toast(res.data.msg);
          this.init();
        }).catch((err)=>{
          console.log(err);
        });
      }
    },
    mounted() {
      this.init();
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
  .grid-item{
    background-color: #eeeeee;
    display: flex;
    width: 345px;
    height:100px;
    margin-top: 5px;
    padding:10px 15px;
    align-items: center;
  }
  .grid-text{
    margin:0px 0px 0px 10px;
    width:223px;
    font-size: 18px;
  }
  .img{
    border: solid 1px #eeeeee;
    width:90px;
    height:90px;
  }
  .img img{
    width:90px;
    height:90px;
  }
  .footer{
    width:100%;
    height:100px;
  }
</style>
