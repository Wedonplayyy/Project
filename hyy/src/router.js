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
    {
      path: '/allorder',
      name: 'AllOrder',
      component: () => import('./views/AllOrder.vue'),
    },
    {
      path: '/collection',
      name: 'Collection',
      component: () => import('./views/Collection.vue'),
    },
    {
      path: '/address',
      name: 'Address',
      component: () => import('./views/Address.vue'),
    },
    {
      path: '/editaddress',
      name: 'EditAddress',
      component: () => import('./views/EditAddress.vue'),
    },
    {
      path: '/addaddress',
      name: 'AddAddress',
      component: () => import('./views/AddAddress.vue'),
    },
    {
      path: '/personinfo',
      name: 'PersonInfo',
      component: () => import('./views/PersonInfo.vue'),
    },
    {
      path: '/recentlyview',
      name: 'RecentlyView',
      component: () => import('./views/RecentlyView.vue'),
    },
    {
      path: '/shoppingPayMent',
      name: 'ShoppingPayMent',
      component: () => import('./views/ShoppingPayMent.vue'),
    },
    {
      path: '/comment',
      name: 'Comment',
      component: () => import('./views/Comment.vue'),
    },
    {
      path: '/submitcomment',
      name: 'SubmitComment',
      component: () => import('./views/SubmitComment.vue'),
    },
    {
      path: '/alreadyEvaluated',
      name: 'AlreadyEvaluated',
      component: () => import('./views/AlreadyEvaluated.vue'),
    },
  ],
});
