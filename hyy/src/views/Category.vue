<template>
  <div class="container">
    <div class="header">
      <p>商品分类</p>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in this.Catedata"
                          :title="item.mallCategoryName"
                          :keys="item.goodsId"/>
      </van-sidebar>
      <div width="290px">
        <van-tabs v-model="active" :onclick="onClick(activeKey,active)">
          <van-tab v-for="(item) in this.cateArray1[activeKey]"
                   :title ='item.mallSubName'>
            <div style="width:290px;height:auto;">
<!--              {{this.NameItem[0]}}-->
            </div>
          </van-tab>
        </van-tabs>
        <router-view></router-view>
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
        cateArray1:[],//分类的数据，例如cateArray1[0][0]是热带水果
        activeKey:0,//点击的大分类index
        active: 0,//点击的小分类index
        Catedata:{},//首页的大分类数据即category 获取下面数据仍需参数，
        selectData:[],//存储点击的分类商品的id
        NameItem:[]//存储所有商品分类的名字
      };
    },
    methods: {
      onClick(id1,id2){
        //点击分类切换显示的数据
        let str = '2c9f6c946016ea9b016016f79c8e0000';
        this.$axios.req('api/classification?mallSubId='+str)
          .then((res)=>{
            if(res){
              this.selectData=res.data.dataList.name;
            }
          }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted() {
      //获取首页的分类数据
      this.$axios.req('api/recommend')
        .then((res)=>{
          if(res){
            this.Catedata=res.data.data.category;
            for (let i in this.Catedata) {
              this.cateArray1.push(this.Catedata[i].bxMallSubDto);
            }
          }
        }).catch((err)=>{
        console.log(err);
      })
    },
   beforeMount() { //打开首页时默认显示数据
      let str = '2c9f6c946016ea9b016016f79c8e0000';
      this.$axios.req('api/classification?mallSubId='+str)
        .then((res)=>{
          if(res){
            for(let i in res.data.dataList) {
              this.NameItem.push(res.data.dataList[i].name)
            }
            console.log(this.NameItem);
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
    height:1000px;
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
  }
</style>
