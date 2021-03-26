<template>
  <v-app-bar app color="blue" flat>
    <v-img
      src="../assets/image/logo2.png"
      max-height="70"
      max-width="100"
      @click="navigateTo(home)"
    ></v-img>

    <v-tabs fixed-tabs centered color="white">
      <v-tab v-for="(item, i) in items" :key="i" @click="navigateTo(item)">
        {{ item.text }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>
<script>
export default {
  name: "Header",
  data: () => ({
    home: { path: "/" },
    items: [
      { text: "커뮤니티", path: "/board" },
      { text: "스토어", path: "/store" },
      { text: "랭킹", path: "/ranking" },
    ],
  }),
  
  methods: {
    navigateTo(item) {
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
      }
    },
  },

};
</script>
