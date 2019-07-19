<template>
  <div class="container">
    <div class="header">
      <p>商品分类</p>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in this.Catedata" :title="item.mallCategoryName" :keys="item.goodsId"/>
      </van-sidebar>
      <div width="290px">
        <van-tabs v-model="active" @click="onClick(id)">
          <van-tab v-for="(item) in this.Catedata[activeKey].bxMallSubDto" :title ='item.mallSubName' >
            <div style="width:290px;height:auto;">
              {{item.mallSubName}}
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
        activeKey:0,
        active: 0,
        Catedata:{},
        selectData:{}
      };
    },
    methods: {
      onClick(id){
        this.$axios.req('api/classification?mallSubId=${id}')
          .then((res)=>{
            if(res){
              this.selectData=res;
              console.log(this.selectData);
            }
          }).catch((err)=>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.$axios.req('api/recommend')
        .then((res)=>{
          if(res){
            this.Catedata=res.data.data.category;
            console.log(this.Catedata[0].bxMallSubDto[0].mallSubName);
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
