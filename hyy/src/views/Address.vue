<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-list
      v-if="this.array.length!==0"
      style="margin-top: 46px;"
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
    <div v-else class="text">
      <div style="text-align: center">
        暂无收货地址~
      </div>
      <van-address-list
        v-model="chosenAddressId"
        @add="onAdd"
      />
    </div>

  </div>
    
</template>

<script>
    export default {
        name: "Address",
        components: {},
        props: {},
      data() {
        return {
          array:{},//保存get请求的address
          chosenAddressId: '0',//默认选择地址
          list:[],//显示的地址信息列表
        }
      },
        methods: {
          onClickLeft(){//点击返回回到上一页
            this.$router.back(-1);
          },
          onAdd() {
            this.$router.push({
                path:'/addaddress'
              }
            )
          },

          onEdit(item, index) {
            this.$store.commit('set_addressId',this.array[index]._id);
            console.log(this.$store.state.addressId);
            this.$store.commit('set_address',item);
            console.log(this.$store.state.address);
            console.log(index);
            this.$router.push({
                path:'/editaddress'
              })
          }
        },
        mounted() {
          this.$axios.req('api/getAddress')
            .then((res)=>{
              // console.log(res);
              this.array = res.data.address;
              console.log(this.array);
              for(let i in this.array){
                this.list.push({
                  id:this.list.length+"",
                  name: this.array[i].name,
                  tel: this.array[i].tel,
                  address: this.array[i].address + this.array[i].addressDetail
                });
              }
            }).catch((err)=>{
              console.log(err);
            });
          this.$axios.req('api/getDefaultAddress')
            .then((res)=>{
              console.log(res);
            }).catch((err)=>{
            console.log(err);
          });
          console.log(this.list);
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
    display: flex;
  }
  .grid-item{
    background-color: #eeeeee;
    display: flex;
    width: 345px;
    height:100px;
    margin-top: 46px;
    padding:10px 15px;
    align-items: center;
  }
  .text{
    margin-top: 46px;
    width:375px;
    height:400px;
    align-items: center;
    font-size: 20px;
    color:gray;
  }
  .text div{
    width: 375px;
    margin: auto;
  }
</style>
