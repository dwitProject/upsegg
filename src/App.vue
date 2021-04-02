<template>
  <v-app>
    <Header
      v-if="
        $route.name === 'Board' ||
        $route.name === 'Board-view' ||
        $route.name === 'Board-write' ||
        $route.name === 'Board-modify' ||
        $route.name === 'Store' ||
        $route.name === 'Ranking'
          ? true
          : false
      "
    />
    <AdminNav
      v-if="
        $route.name === 'ProductMng' ||
        $route.name === 'OrderMng' ||
        $route.name === 'daily-list' ||
        $route.name === 'daily-Weekly' ||
        $route.name === 'daily-Monthly' ||
        $route.name === 'product-stat' ||
        $route.name === 'cart-stat'
          ? true
          : false
      "
    />

    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
import AdminNav from '@/components/AdminNav';
export default {
  name: 'App',
  components: {
    Header,
    AdminNav,
  },
};
</script>
