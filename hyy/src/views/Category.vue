<template>
  <div class="container">
    <div class="header">
      <p>商品分类</p>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey" @change="onClick1">
<!--        第一大分类-->
        <van-sidebar-item v-for="(item,index) in this.Catedata"
                          :title="item.mallCategoryName"
                          :key="item.mallCategoryId"/>
       </van-sidebar>
       <div height="900px">
         <van-tabs
           v-model="active"
           @change="onClick2"
           title-active-color="red">
          <!--          第二小分类-->
           <van-tab
             v-for="(item,index) in this.data1"
             :title ='item.mallSubName'
             :key="index">
             <div style="width:290px;height:auto;"
                  v-for="(item,index) in data2"
                  :key="index"
             @click="toDetail(item.id)">
               <div class="grid-item">
                 <div class="img">
                   <img :src="item.image" width="100%">
                 </div>
                 <div class="grid-text">
                   <div>
                     {{item.name}}
                   </div>
                   <div style="display: flex">
                     <div style="margin:20px 0px">
                       ￥{{item.present_price}}
                     </div>
                     <div style="margin:20px 10px;color: grey;">
                       <del>￥{{item.orl_price}}</del>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </van-tab>
         </van-tabs>
       </div>
    </div>
    <div class="footer"></div>
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
        flag:false,//初始化完成标志
        activeKey:0,//点击的大分类index
        active: 0,//点击的小分类index
        Catedata:{},//首页的大分类数据即category 获取下面数据仍需参数
        data1:[],//第一分类
        data2:[]//第二分类
      };
    },
    methods: {
      toDetail(id){
        this.$router.push({
          path:'/detail'
        })
        this.$store.commit('set_SelectedId',id)
      },
      onClick1(){
        this.onClick2();
        this.active = 0;
        this.data1=this.Catedata[this.activeKey].bxMallSubDto;
      },
      onClick2(){
        this.data1 = this.Catedata[this.activeKey].bxMallSubDto;
        this.index = this.data1[this.active].mallSubId;
        let str = 'api/classification?mallSubId='+this.index
        this.$axios.req(str)
          .then((res)=>{
            if(res){
              this.data2 = res.data.dataList;
            }
          }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.activeKey = this.$store.state.activeKey ;
      // this.onClick1();
      //获取首页的分类数据
      this.$axios.req('api/recommend')
        .then((res)=>{
          if(res){
            this.Catedata=res.data.data.category;
            this.data1=this.Catedata[this.activeKey].bxMallSubDto;
            this.index=this.data1[this.active].mallSubId;
            this.flag=true;
            this.onClick1();
            this.onClick2();
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
            // console.log('默认的第一个商品'+this.data2[this.active].name);
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
  }
  .header{
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin:0 auto;
    width:100%;
    height: 46px;
    text-align: center;
  }
  .header p{
    font-size:16px;
  }
  .main{
    display: flex;
  }
  .grid-item{
    background-color: white;
    display: flex;
    height:100px;
    padding:10px 0px 10px 10px;
  }
  .grid-text{
    margin:0px 0px 0px 10px;
    font-size: 14px;
    color: red;
  }
  .img{
    border: solid 1px #eeeeee;
    width:70px;
    height:70px;
  }
  .footer{
    width:100%;
    height:60px;
  }
</style>
