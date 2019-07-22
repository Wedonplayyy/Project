import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeKey:0,//首页选择的分类
    str:'2c9f6c946016ea9b016016f79c8e0000',//分类id
    selectedId:""//
  },
  mutations: {
    ['set_num'] (state, data) {
      state.activeKey = data
    },
    ['set_id'] (state, data) {
      state.str = data
    },
    ['set_SelectedId'](state,data){
      state.selectedId = data
    }
  },
  actions: {

  },
});
