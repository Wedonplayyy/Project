<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="body"></div>
    </div>
    
</template>

<script>
    export default {
        name: "ShoppingPayMent",
        components: {},
        props: {},
        data() {
            return {}
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
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
  .body{
    margin-top: 46px;
  }

</style>
