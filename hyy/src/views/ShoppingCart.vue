<template>
    <div class="container">
      <van-nav-bar
        fixed
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div v-if="this.keeplogin!==1" class="text">
        <div>
          您还尚未<router-link to="/login">登录</router-link>~
        </div>
      </div>
      <div v-else class="text">
        <div v-if="this.datalist.length===0">
         购物车里空空如也~
        </div>
        <div v-else class="good">
            <van-checkbox-group class="card-goods" v-model="checkedGoods">
              <van-checkbox
                class="card-goods__item"
                v-for="item in goods"
                :key="item.id"
                :name="item.id"
              >
                <van-card
                  :title="item.title"
                  :desc="item.desc"
                  :num="item.num"
                  :price="formatPrice(item.price)"
                  :thumb="item.thumb"
                />
              </van-checkbox>
            </van-checkbox-group>
            <van-submit-bar
              :price="totalPrice"
              :disabled="!checkedGoods.length"
              :button-text="submitBarText"
              @submit="onSubmit"
            />
        </div>
      </div>
    </div>

</template>

<script>
  import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
    export default {
        name: "ShoppingCart",
        components: {
          [Card.name]: Card,
          [Checkbox.name]: Checkbox,
          [SubmitBar.name]: SubmitBar,
          [CheckboxGroup.name]: CheckboxGroup
        },
        props: {},
        data() {
            return {
              data:'',//post返回数据
              keeplogin:0,//登录状态
              datalist:[],//收藏商品列表
              checkedGoods: ['1', '2', '3'],
              goods: [{
                id: '1',
                title: '进口香蕉',
                desc: '约250g，2根',
                price: 200,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
              }, {
                id: '2',
                title: '陕西蜜梨',
                desc: '约600g',
                price: 690,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
              }, {
                id: '3',
                title: '美国伽力果',
                desc: '约680g/3个',
                price: 2680,
                num: 1,
                thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
              }]
            };
        },
        methods: {
          onClickLeft(){
            this.$router.back(-1);
          },
          formatPrice(price) {
            return (price / 100).toFixed(2);
          },
          onSubmit() {
            Toast('点击结算');
          }
        },
        mounted() {

          this.keeplogin=this.$store.state.user.keeplogin;
          this.$axios.req('api/getCard', {})
            .then((res) => {
              if(res){
                console.log(res);
                this.data = res.data;
                console.log(this.data.shopList.length);
                console.log(this.keeplogin);
                this.datalist = this.data.shopList;
              }
            }).catch((err) => {
            console.log(err);
          });
        },
        created() {

        },
        filters: {},
        computed: {
          submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
          },
          totalPrice() {
            return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
          }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped>
  .container{
    background-color: #eeeeee;
    height:667px;
  }
  .text{
    width:100%;
    height:500px;
    display: flex;
    margin-top: 46px;
    text-align: center;
    align-items:center;
    justify-content: center;
  }
</style>
