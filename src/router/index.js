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
    component: () => import('../views/storeMng/productMng.vue'),
  },
  {
    path: '/orderMng',
    name: 'OrderMng',
    component: () => import('../views/storeMng/orderMng.vue'),
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue'),
  },
  {
    path: '/purchaseOrder',
    name: 'PurchaseOrder',
    component: () => import('../views/purchaseOrder/PurchaseOrder.vue'),
  },
  {
    path: '/finishOrder',
    name: 'FinishOrder',
    component: () => import('../views/purchaseOrder/FinishOrder.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/purchaseOrder/Order.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
