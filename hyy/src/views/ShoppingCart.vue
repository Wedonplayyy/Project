<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

</template>

<script>
    export default {
        name: "ShoppingCart",
        components: {},
        props: {},
        data() {
            return {
            }
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
        },
        mounted() {
          this.$axios.req('api/getCard', {})
            .then((res) => {
              if(res){
                console.log(res);
              }
            }).catch((err) => {
            console.log(err);
          });
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
</style>
