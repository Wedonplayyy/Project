<template>
  <div >
    <van-search
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>
<script>
  export default {
    name: "ReserveInfo",
    data() {
      return {
      };
    },
    created() {

    },
    mounted() {
    },
    methods: {
      onSearch(){}
    }
  }

</script>
<style scoped>

</style>
