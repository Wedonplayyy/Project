<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="编辑地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      style="margin-top:46px; "
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
<!--    <van-area :area-list="areaList" />-->
  </div>
</template>

<script>
  import axios from 'axios'
  import area from '../assets/area.js'
  export default {
    name: "AddAddress",
    components: {
    },
    props: {},
    data() {
      return {
        areaList:{},
        searchResult: [],
        list:[],
      }
    },
    methods: {
      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },
      onSave(content) {
        let len = this.list.length;
        axios.post('api/address', {
          name: content.name,
          tel: content.tel,
          address: content.province+content.city+content.county,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
          // id: len,
        })
          .then((res) => {
            console.log(res);
            this.$toast(res.data.msg);
          }).catch((err) => {
          console.log(err);
        })
        this.$router.push({
            path:'/address'
          }
        )
      },
      onDelete() {
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '东方广场13楼1303',
            address: '成都市'
          }];
        } else {
          this.searchResult = [];
        }
      }
    },
    mounted() {
      this.areaList = area;
    },
    created() {

    },
    filters: {},
    computed: {
    },
    watch: {},
    directives: {}
  }
</script>

<style scoped>
  .grid-item{
    background-color: #eeeeee;
    display: flex;
    width: 345px;
    height:100px;
    margin-top: 46px;
    padding:10px 15px;
    align-items: center;
  }
</style>
