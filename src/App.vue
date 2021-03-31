<template>
  <v-app>
    <!-- <Header v-if="$route.name !== 'Main'" /> -->
    <!-- <Header v-if="$route.name !== 'Main' || $route.name !== 'Store' ? false : true" /> -->
    <Header v-if="
                  $route.name === 'Board' || 
                  $route.name === 'Board-view' ||
                  $route.name === 'Board-write' ||
                  $route.name === 'Board-modify' ||
                  $route.name === 'Store' ||
                  $route.name === 'Ranking'
                  ? true : false" />

    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
