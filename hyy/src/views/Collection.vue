<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="grid-item" v-for="item in this.datalist">
      <div class="img">
        <img :src="item.image_path" width="100%">
      </div>
      <div class="grid-text">
        <div style=" color: red;margin-top: 15px">
          {{item.name}}
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div style="margin:20px 0px;display: flex; color: red; ">
            ￥{{item.present_price}}
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
        datalist:[]
      };
    },
    methods: {
      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },
    },
    mounted() {
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
    background-color: white;
    display: flex;
    width: 305px;
    height:100px;
    margin-top: 46px;
    padding:10px 10px 10px 15px;
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
