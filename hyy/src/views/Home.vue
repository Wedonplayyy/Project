/* eslint-disable */
<template>
  <div class="container">
    <div class="flex-container">
      <div class="box">
        <van-dropdown-menu class="box1">
          <van-dropdown-item />
          <!--            v-model="" -->
          <!--          :options="" -->
          <!--          />-->
        </van-dropdown-menu>
      </div>
      <div class="box2" >
        <van-search
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>

    <!--      轮播图-->
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in this.Redata.slides" :key="item.goodsId">
          <img :src="item.image" width="100%" height="200px"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--分类-->
    <div class="grid">
      <van-grid clickable :border="false" :column-num="5">
        <van-grid-item
          v-for = "(item, index) in this.Redata.category"
          :key="item.goodsId"
          :text="item.mallCategoryName" to="/category"
          @click="set(index)">
          <div>
            <van-image :src="item.image"></van-image>
            <div>{{item.mallCategoryName}}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!--    横幅-->
    <div class="HFimg" v-if="this.Redata.advertesPicture">
      <img :src="this.Redata.advertesPicture.PICTURE_ADDRESS" width="100%">
    </div>

    <!--    商品推荐-->
    <div style = "background-color: white;font-size: 15px;padding: 10px;margin: 2px 0px">商品推荐</div>
    <div class="wrap" ref="wrapper">
      <ul class="content">
        <li v-for = "(item) in this.Redata.recommend" :key="item.goodsId">
          <div>
            <div style="height:123px">
              <img :src="item.image" width="100%" >
            </div>
            <div class="box3">{{item.goodsName}}</div>
            <div class="box4">
              <van-button icon="shopping-cart-o" type="warning" size="mini" />
              <van-button type="danger" size="mini">查看详情</van-button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!--    休闲食品-->
    <div style = "margin: 20px 0px;font-size: 15px;text-align: center;color:red">休闲食品</div>

    <div class="floor">
      <div v-for="(item,index) in this.Redata.floor1"
           class="classObject"
           :class="{classObject1: index === 0}"
           :key="item.goodsId">
        <img :src="item.image" width="100%" height="100%">
      </div>
    </div>

    <!--    新鲜水果-->
    <div style = "margin: 20px 0px;font-size: 15px;text-align: center;color:red">新鲜水果</div>
    <div class="floor">
      <div v-for="(item,index) in this.Redata.floor2"
           class="classObject"
           :class="{classObject1: index === 0}"
           :key="item.goodsId">
        <img :src="item.image" width="100%" height="100%">
      </div>
    </div>

    <!--    营养奶品-->
    <div style = "margin: 20px 0px;font-size: 15px;text-align: center;color:red">营养奶品</div>
      <div class="floor">
        <div v-for="(item,index) in this.Redata.floor3"
             class="classObject"
             :class="{classObject1: index === 0}"
             :key="item.goodsId">
          <img :src="item.image" width="100%" height="100%">
        </div>
      </div>

    <!--    热销商品-->
    <div style = "margin: 20px 0px;font-size: 15px;text-align: center;color:red">热销商品</div>
    <div class="hotgoods">
      <div v-for="(item,index) in this.Redata.hotGoods"
           :key="item.goodsId">
        <img :src="item.image" width="100%" height="auto">
        <div class="box5">
            {{item.name}}<br>
          ￥{{item.mallPrice}}
            <del style="color: grey;font-size: 10px">￥{{item.price}}</del>
          </div>
        </div>
      </div>
    <div class="footer"></div>
    </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Home',
    components: {},
    props: {},
    data() {
      return {
        Redata:{},
        floor1:{},
      };
    },
    methods: {
      set(id) {
        this.$store.commit('set_num',id)
        console.log(id);
      },
      onSearch(){},
      click(id){
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          startX:true,
          click: true,
          scrollX: true,
        })
      })
      this.$axios.req('api/recommend')
        .then((res) => {
          if(res){
            this.Redata = res.data.data
          }
        }).catch((err) => {
        console.log(err);
      });
    },
  };

</script>

<style scoped>
  .classObject {
    border: 1px solid #e5e4e9;
  }
  .classObject1 {
  grid-row-start: 1;
  grid-row-end: 3;
  }
  .container{
    background-color: #eeeeee;
    /*height:;*/
  }
  .flex-container {
    display: -webkit-flex;
    display: flex;
  }
  .box{
    /*选择城市*/
    width: 25%;
    /*height:120%;*/
  }
  .box1{
    display: -webkit-flex;
    display: flex;
    height:100%;
  }
  .box2{
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
    width: 180%;
    height:auto;
  }
  .swipe{
    margin-top: 2px;
  }
  .box3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    background-color: white;
    font-size: 15px;
    text-align: center;
    width: 123px;
    height:23px;
  }
  .box4{
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    background-color: white;
  }
  .box5 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    background-color: white;
    font-size: 15px;
    text-align: center;
    color:red;
    width: 147.5px;
    height:auto;
    padding: 0px 20px;
  }
  .grid{
    /*margin: 10px;*/
    padding: 5px;
    height:auto;
  }
  .HFimg{
    /*横幅*/
    margin: 15px 5px;
  }
  .wrap {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
  }
  .content{
    display: flex;
    text-overflow: ellipsis;
  }
  .content img {
    width: 123px;
    text-overflow: ellipsis;
  }
  .content div{
    text-align: center;
  }
  .floor{
    display: grid;
    grid-template-columns: 50%  50%;
    grid-template-rows: 110px 110px 110px;
    /*gird-auto-flow:row;*/
  }
  .hotgoods{
    display: grid;
    grid-template-columns: 50%  50%;
  }
  .footer{
    width:100%;
    height:100px;
  }


</style>
