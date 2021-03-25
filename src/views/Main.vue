<template>
  <v-main class="grey lighten-3">
    <v-app-bar color="transparent">
      <v-img
        src="../assets/image/logo2.png"
        max-height="70"
        max-width="100"
        @click="navigateTo(home)"
      ></v-img>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-img src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcfa4652c8d383f56/5e21837f63d1b6503160d39b/Home-page.jpg" />
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-autocomplete auto-select-first clearable solo></v-autocomplete>
          <v-btn>dd</v-btn>
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/Footer";
export default {
  data: () => ({
    home: { path: "/" },
  }),
  components: {
    Footer,
  },
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
