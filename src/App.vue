<template>
  <v-app>
    <Header v-if="$route.name !== 'Main'" />
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
