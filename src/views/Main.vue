<template>
  <v-main class="grey lighten-3">
    <v-img
      src="../assets/image/logo2.png"
      alt="메인 로고"
      max-height="70"
      max-width="100"
      @click="$router.push('/')"
    ></v-img>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-img
            src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcfa4652c8d383f56/5e21837f63d1b6503160d39b/Home-page.jpg"
            alt="리그오브레전드 대표이미지"
          />
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <span style="width: 350px">
          <v-autocomplete
            v-model="value"
            :items="items"
            auto-select-first
            label="소환사를 입력하세요"
            clearable
            solo
            dense
            color="white"
          ></v-autocomplete>
        </span>
        <span>
          <v-btn
            color="white"
            @click="$router.push({
                name: `Ranking`,
                params: { name: value },
              })"
            >검색</v-btn>
        </span>
      </v-row>
    </v-container>

    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/Footer";
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: "",
  }),
  components: {
    Footer,
  },
  methods: {
    search() {},
  },
};
</script>