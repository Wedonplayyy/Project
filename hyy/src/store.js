import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabActive:0,//底部标签栏选中项 默认选中首页
    activeKey:0,//首页选择的分类 默认选择第一个
    str:'2c9f6c946016ea9b016016f79c8e0000',//分类id 默认选择第一个美国车厘子
    selectedSubId:"",//分类中点击的商品
    user:{//用户属性
      keeplogin:0,//登录状态
      username:'',//用户名
      avatar:'',//用户头像
    },//用户属性
    address:{},//待修改的地址信息
    chooseAddress:{},//购物车页面点击结算选择的地址信息，默认为默认地址
    addressId:'',//待修改的地址id
    order:{},//订单
    commentGood:{},//待评价商品信息
  },
  mutations: {
    ['set_num'] (state, data) {
      state.activeKey = data
    },
    ['set_id'] (state, data) {
      state.str = data
    },
    ['set_SelectedSubId'](state,data){
      state.selectedSubId = data
    },
    ['set_tabActive'](state,data){
      state.tabActive = data
    },
    ['set_keeplogin'](state,data){
      state.user.keeplogin = data
    },
    ['set_loginname'](state,data){
      state.user.username = data
    },
    ['set_addressId'](state,data){
      state.addressId = data
    },
    ['set_address'](state,data){
      state.address = data
    },
    ['set_avatar'](state,data){
      state.user.avatar = data;
    },
    ['set_order'](state,data){
      state.order = data;
    },
    ['choose_address'](state,data){
      state.chooseAddress = data;
    },
    ['set_comment'](state,data){
      state.commentGood = data;
    }
  },
  actions: {

  },
});
