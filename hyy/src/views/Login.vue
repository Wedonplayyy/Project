<template>
    <div class="container">
      <div class="header">
        <van-nav-bar
          v-if="$route.name ==='Login'"
          fixed="true"
          title="登录/注册"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <div class="form">

      </div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {},
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
  .form{
    margin:10px 0px;
    height:400px;
    width:100%;
    background-color: white;
  }
</style>
