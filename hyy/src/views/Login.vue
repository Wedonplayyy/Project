<template>
    <div class="container">
      <div class="item">
        <div class="icon">
          <van-icon name="arrow-left" @click="onClick"></van-icon>
        </div>
        <div class="text">
          登录/注册
        </div>
      </div>
      <div class="main">

        <div class="form">
          <van-cell-group>
            <van-field
              v-model="username"
              required
              label="用户名"
              right-icon="question-o"
              placeholder="请输入用户名"
              @click-right-icon="$toast('名称包括大小写字母及数字下划线')"
            />

            <van-field
              v-model="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
            />
          </van-cell-group>
          <div style="display: flex;width:100%;height:200px;">
            <button style="margin:  auto;width:50px;height:50px;" @click="login">登录</button>
            <button style="margin:  auto;width:50px;height:50px;" @click="register">注册</button>
          </div>

        </div>
      </div>

    </div>

</template>

<script>
    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {
              username:'',
              password:'',
            }
        },
        methods: {
          onClick(){
            this.$router.back(-1);
          },
          login(){
            this.$store.commit('set_keeplogin',1);
            console.log(this.$store.state.user.keeplogin);
            this.$router.back(-1);
          },
          register(){
            login();
          }
        },
        mounted() {

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
    height:667px;

  }
  .main{
    display: flex;
    justify-content: center;
    width:100%;
    height:auto;
    margin:20px 0px;

  }
  .form{
    height:400px;
    width:80%;
    background-color: white;
  }
  .item{
    display:flex;
    align-items: center;
    background-color: white;
    height: 35px;
    font-size:16px;
    padding: 5px 0px 5px 5px;
  }
  .text{
    width:100%;
  }
  .icon{
    height:100%;
    display:flex;
    align-items: center;
    margin:0px 12px 0px 5px;
  }
</style>
