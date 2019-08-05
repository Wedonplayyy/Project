<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="个人资料"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="body">
        <div style="height:60px;display: flex;align-items: center;">
          <div class="index">
            github
          </div>
          <input type="text"  >
        </div>
        <div style="display: flex;align-items: center;justify-content: space-between;height:70px;">
          头像
          <div style="display: flex;align-items: center;">
            <img :src="this.info.avatar" width="60px" height="60px">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="item">
          <div class="index">
            用户名
          </div>
          <input
            type="text"
            onfocus="this.select()"
            v-model="value">
        </div>
        <div class="item">
          <div class="index">昵称</div>
          <div class="text">
            {{this.info.nickname}}
          </div>
        </div>
        <div class="item">
          <div class="index">性别</div>
          <div class="text">
            {{this.info.gender}}
          </div>
        </div>
        <div class="item">
          <div class="index">邮箱</div>
          <input type="text" placeholder="请输入邮箱" onfocus="this.placeholder=''">
        </div>
        <div class="item">
          <div class="index">出生年月</div>
          <div class="text">
            {{this.info.year}}年{{this.info.month}}月{{this.info.day}}日
          </div>
        </div>
      </div>
      <div class="buttonGroup">
        <van-button type="primary" @click="editInfo">确认</van-button>
      </div>
      <div class="buttonGroup">
        <van-button type="default" @click="init">取消</van-button>
      </div>
    </div>

</template>

<script>
  import axios from 'axios'
    export default {
        name: "PersonInfo",
        components: {},
        props: {},
        data() {
            return {
              info:{},
              value:'',//用户名
            }
        },
        methods: {
          init(){
            this.$axios.req('api/queryUser',{})
              .then((res) =>{
                if(res){
                  console.log(res);
                  this.info = res.data.userInfo;
                  this.value=this.info.username;
                  console.log(this.info);
                }
              }).catch((err) =>{
              console.log(err);
            });
          },
          onClickLeft(){
            this.$router.back(-1);
          },
          editInfo(){
            delete this.info.avatar;
            delete this.info.nickname;
            this.info.username = this.value;
            axios.post('api/saveUser',this.info)
              .then((res) =>{
                console.log(res);
                this.$toast(res.data.msg);
              }).catch((err) =>{
              console.log(err);
            })
          },
        },
        mounted() {
          this.init();
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
  .container{
    background-color: #eeeeee;
    height:621px;
}
  .body{
    margin: 46px 10px 0px 15px;
  }
  .body div{
    margin:5px 0px;
    font-size: 18px;
  }
  .item{
    height:50px;
    display: flex;
    align-items: center;
  }
  .index{
    width:100px;
  }
  .text{
    width:120px;
  }
  .buttonGroup{
    display: flex;
    align-items: center;
    justify-content: center;
    height:60px;
    width:375px;
  }
  .buttonGroup button{
    margin:5px;
    width:200px;
  }
  input{
    border:none;
    background-color: #eeeeee;
  }
</style>
