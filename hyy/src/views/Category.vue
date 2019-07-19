<template>
  <div class="container">
    <div class="header">
      <p>商品分类</p>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey" @change="change">
        <van-sidebar-item v-for="(item,index) in this.Catedata"
                          :title="item.mallCategoryName"
                          :keys="item.goodsId"/>
      </van-sidebar>
      <div height="900px">
        <van-tabs
          v-model="active"
          :onclick="onClick(active)"
          title-active-color="red">
          <van-tab v-for="(item) in this.data1"
                   :title ='item.mallSubName'>
            <div style="width:290px;height:auto;"
            v-for="(item,index) in data2">
              <div class="grid-item">
                <div class="img">
                  <img :src="item.image" width="100%">
                </div>
                <div class="grid-text">
                  <div>
                    {{item.name}}
                  </div>
                  <div style="margin:20px 0px">
                    ￥{{item.present_price}}
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

<!--    <router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    name: 'Category',
    components: {},
    props: {},
    data() {
      return {
        index:'2c9f6c946016ea9b016016f79c8e0000',
        activeKey:0,//点击的大分类index
        active: 0,//点击的小分类index
        Catedata:{},//首页的大分类数据即category 获取下面数据仍需参数
        data1:[],//第一分类
        data2:[]//第二分类
      };
    },
    methods: {
      change(){
        this.active = 0;
        this.data1=this.Catedata[this.activeKey].bxMallSubDto;
        console.log(this.data1[0].mallSubName);
      },
      onClick(id2){
        //点击分类切换显示的数据
        // this.data2 = this.data1[id1];
        console.log(this.index);
      }
    },
    mounted() {
      //获取首页的分类数据
      this.$axios.req('api/recommend')
        .then((res)=>{
          if(res){
            this.Catedata=res.data.data.category;
            this.data1=this.Catedata[this.activeKey].bxMallSubDto;
            this.index=this.data1[this.active].mallSubId;
          }
        }).catch((err)=>{
        console.log(err);
      })
      //打开首页时默认显示数据
      let str = 'api/classification?mallSubId='+this.index
      this.$axios.req(str)
        .then((res)=>{
          if(res){
            this.data2 = res.data.dataList;
            console.log(this.data2[0].name);
          }
        }).catch((err)=>{
        console.log(err);
      })
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
    height:1500px;
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
    /*inline-height:28px;*/
  }
  .main{
    display: flex;
    height:1000px;
  }
  .grid-item{
    background-color: white;
    display: flex;
    width:100%;
    height:100px;
    padding:10px 20px;
  }
  .grid-text{
    margin:0px 20px;
    font-size: 14px;
    color: red;
  }
  .img{
    border: solid 1px #eeeeee;
    width:70px;
    height:70px;
  }
</style>
