import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant'
import axios from 'axios'
import http from './http'
import 'lib-flexible'
import 'vant/lib/index.css'
import BScroll from 'better-scroll'
import VueResource from 'vue-resource'
import Toast from "vant/es/toast";

Vue.prototype.$axios = http
Vue.use(Vant)
Vue.use(Toast)

Vue.config.productionTip = false

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use( config => {
  const token = store.state.token;
  token && (config.headers.Authorization = token);
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return response
  }, error => {
    return Promise.reject(error)
  })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
