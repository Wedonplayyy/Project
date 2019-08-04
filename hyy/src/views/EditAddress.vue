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
      :address-info="this.addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import area from '../assets/area.js'
  export default {
    name: "EditAddress",
    components: {
    },
    props: {},
    data() {
      return {
        areaList:{},//地区列表
        searchResult: [],//详细地址搜索结果
        addressInfo:{},
      }
    },
    methods: {
      init(){//初始化
        this.areaList = area;
        // this.addressInfo={
        //   id:this.$store.state.addressId,
        //   name:this.$store.state.address.name,
        //   tel:this.$store.state.address.tel,
        //   province:'',
        //   city:'',
        //   county:'',
        //   addressDetail:this.$store.state.address.addressDetail,
        //   areaCode:'',
        //   postalCode:'',
        //   isDefault:false
        // }
      },
      onClickLeft(){//点击返回回到上一页
        this.$router.back(-1);
      },
      onSave(content) {//修改即先增加再删除
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
          id: this.$store.state.addressId,
        })
          .then((res) => {
            console.log(res);
          }).catch((err) => {
          console.log(err);
        });
        this.$router.push({
            path:'/address'
          }
        )
      },
      onDelete() {
        this.$axios.req('api/deleteAddress',{id:this.$store.state.addressId})
          .then((res) =>{
            console.log(res);
            this.$toast(res.data.msg);
          }).catch((err) =>{
          console.log(err);
        });
        this.onClickLeft();
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
      this.init();
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
