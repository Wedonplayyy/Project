<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="最近浏览"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="body">
        <van-checkbox-group v-model="result">
          <van-checkbox
            v-for="(item, index) in list"
            :key="item"
            :name="item"
          >
            复选框 {{ item }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>

</template>

<script>
    export default {
        name: "RecentlyView",
        components: {},
        props: {},
        data() {
            return {
              list: ['a', 'b', 'c'],
              result: ['a', 'b']
            };
        },
        methods: {
          onClickLeft(){//点击返回回到上一页
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
  .container{}
  .body{
    margin-top: 46px;
  }
</style>
