import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('./views/Category.vue'),
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('./views/Recommend.vue'),
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('./views/ShoppingCart.vue'),
    },
    {
      path:'/detail',
      name:'GoodsDetail',
      component: () => import('./views/GoodsDetail.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
  ],
});
