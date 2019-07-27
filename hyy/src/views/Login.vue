<template>
    <div class="container">
      <div class="item">
        <div class="icon">
          <van-icon name="arrow-left" @click="onClick"></van-icon>
<!--          返回-->
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

            <van-field
              v-model="phone"
              label="手机号"
              placeholder="请输入手机号"
              required
            />
          </van-cell-group>
          <div class="verify">
            <van-field
              v-model="verify"
              label="验证码"
              placeholder="请输入验证码"
              required
            />
            <div v-html="this.verifyPic"
                 @click="changeVerify"></div>
          </div>
          <div class="button">
            <van-button type="primary" @click="login">登录</van-button>
            <van-button type="info" @click="register">注册</van-button>
          </div>

        </div>
      </div>

    </div>

</template>

<script>
  import {Dialog, Toast} from "vant";
    export default {
        name: "Login",
        components: {
          [Dialog.Component.name]: Dialog.Component
        },
        props: {},
        data() {
            return {
              username:'',
              password:'',
              phone:'',
              verify:'',
              verifyPic:''
            }
        },
        methods: {
          getAverify() {
            return process.env.NODE_ENV === 'production' ? `/v1/verify?mt=${Math.random()}` : `api/verify?mt=${Math.random()}`
          },
          changeVerify() {
            this.getAverify();
            this.$axios.req(this.getAverify())
              .then((res) => {
                if (res) {
                  this.verifyPic = res.data;
                }
              }).catch((err) => {
              console.log(err);
            })
          },
          onClick() {
            this.$router.back(-1);
          },
          check() {
            if (!this.username) {
              Dialog.alert({
                title: '提示',
                message: '请输入用户名！'
              }).then(() => {
                return false;
              });
            } else if (!this.password) {
              Dialog.alert({
                title: '提示',
                message: '请输入密码！'
              }).then(() => {
                return false;
              });
            } else if (!this.phone) {
              Dialog.alert({
                title: '提示',
                message: '请输入手机号！'
              }).then(() => {
                return false;
              });
            } else if (!this.verify) {
              Dialog.alert({
                title: '提示',
                message: '请输入验证码！'
              }).then(() => {
                return false;
              });
            }else{
              return true;
            }
          },
          login() {
            if(this.check()) {
              this.$axios.req('api/login', {nickname: this.username, password: this.password, verify: this.verify})
                .then((res) => {
                  if (res) {
                    if(res.data.code<0){//判断输入是否正确
                      Dialog.alert({
                        title: '提示',
                        message: res.data.msg,
                      }).then(() => {
                        return;
                      });
                    }else{
                      Toast(res.data.msg);
                      this.$store.commit('set_keeplogin', 1);
                      this.$store.commit('set_loginname', this.username);
                      this.$axios.req('api/keeplogin', {})
                        .then((res) => {
                          if(res){
                            console.log('welcome!' + res.data.userInfo.nickname);
                          }
                        }).catch((err) => {
                        console.log(err);
                      });
                      // console.log(this.$store.state.user.keeplogin);
                      this.$router.back(-1);
                    }
                    // console.log(res);
                  }
                }).catch((err) => {
                console.log(err);
              });
            }else return;
          },
          register() {
            if(this.check()){
              this.$axios.req('api/register', {nickname: this.username, password: this.password, verify: this.verify,sms:this.phone})
                .then((res) => {
                  if (res) {
                    console.log('注册成功！');
                  }
                }).catch((err) => {
                console.log(err);
              });
              this.$store.commit('set_keeplogin', 1);
              this.$store.commit('set_loginname', this.username);
            }else return;
            this.$store.commit('set_keeplogin', 1);
            this.$store.commit('set_loginname', this.username);
            this.$router.back(-1);
            // Toast.loading({
            //   mask: true,
            //   message: '加载中...'
            // });
          },
        },
        mounted() {
          this.$store.commit('set_tabActive',3)
          // console.log(this.$store.state.user.keeplogin);
          this.$axios.req(this.getAverify())
            .then((res)=>{
              if(res){
                this.verifyPic = res.data;
                // console.log(res);
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
    }
</script>

<style scoped>
  .container{
    background-color: #eeeeee;
    /*height:667px;*/

  }
  .main{
    display: flex;
    justify-content: center;
    width:100%;
    height:auto;
    margin:2px 0px;

  }
  .form{
    height:400px;
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
  .verify{
    display: flex;
  }
  .button{
    margin:10px 0px;
    display: flex;
    justify-content: space-around;
    width:100%;
    height:200px;
  }
</style>
