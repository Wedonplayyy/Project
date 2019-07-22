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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ],
});
