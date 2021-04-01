import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/Board.vue'),
  },
  {
    path: '/board/view',
    name: 'Board-view',
    component: () => import('../views/BoardView.vue'),
  },
  {
    path: '/board/write',
    name: 'Board-write',
    component: () => import('../views/BoardWrite.vue'),
  },
  {
    path: '/board/modify',
    name: 'Board-modify',
    component: () => import('../views/BoardModify.vue'),
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue'),
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue'),
  },
  {
    path: '/productMng',
    name: 'ProductMng',
    component: () => import('../views/storeMng/ProductMng.vue'),
  },
  {
    path: '/orderMng',
    name: 'OrderMng',
    component: () => import('../views/storeMng/OrderMng.vue'),
  },
  {
    path: '/daily-list',
    name: 'daily-list',
    component: () => import('../views/storeMng/DailyList.vue'),
  },
  {
    path: '/daily-Weekly',
    name: 'daily-Weekly',
    component: () => import('../views/storeMng/DailyWeekly.vue'),
  },
  {
    path: '/daily-Monthly',
    name: 'daily-Monthly',
    component: () => import('../views/storeMng/DailyMonthly.vue'),
  },
  {
    path: '/product-stat',
    name: 'product-stat',
    component: () => import('../views/storeMng/ProductStat.vue'),
  },
  {
    path: '/cart-stat',
    name: 'cart-stat',
    component: () => import('../views/storeMng/CartStat.vue'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
