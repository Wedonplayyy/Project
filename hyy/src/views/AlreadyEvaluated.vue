<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="评价详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    </div>

</template>

<script>
    export default {
        name: "AlreadyEvaluated",
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

</style>
