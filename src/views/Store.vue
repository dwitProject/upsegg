<template>
  <v-main>
    <v-app-bar color="dark" dark app>
      <v-img
        src="@/assets/image/logo2.png"
        max-height="70"
        max-width="100"
        @click="navigateTo(home)"
      ></v-img>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title> Riot Store </v-toolbar-title>
      <v-img
        src="@/assets/Mng.png"
        max-height="20"
        max-width="20"
        @click="Mng()"
      ></v-img>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon> <v-icon>mdi-magnify </v-icon> </v-btn> -->
      <template v-slot:extension>
        <v-tabs>
          <v-tab>홈</v-tab>
          <v-tab>스태츄</v-tab>
          <v-tab>피규어</v-tab>
          <v-tab>포스터</v-tab>
          <v-tab>후드,자켓</v-tab>
          <v-tab>장바구니</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-container fluid class="fill-height" style="min-height: 300px">
      <v-fade-transition mode="out-in">
        <v-row>
          <v-col v-for="item in list" :key="item.id" cols="12" sm="6" md="2">
            <!-- <v-col cols="2"> -->
            <v-card>
              <v-img
                :src="item.image"
                height="280"
                class="grey darken-4"
              ></v-img>
              <v-card-title class="title1">
                {{ item.productName }}
              </v-card-title>
              <v-card-title class="title2"> {{ item.price }} </v-card-title>

              <v-card-text>
                <v-chip-group active-class="red accent-3 white--text" column>
                  <v-chip
                    @click="
                      $router.push({
                        name: `PurchaseOrder`,
                        params: { id: item.id },
                      })
                    "
                    >즉시구매</v-chip
                  >
                  <v-chip @click="detail(item.id)">상세보기</v-chip>
                  <v-chip>장바구니</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </v-main>
</template>

<script>
import api from "../api/purchaseOrder";

export default {
  name: "Store",
  data: () => ({
    list: [],
    ProductId: "",
    home: { path: "/" },
  }),
  mounted() {
    // 목록 조회 함수
    this.getProducts();
  },
  methods: {
    // 목록 조회 함수
    async getProducts() {
      const result = await api.get();
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.list = result.data;
      }
    },
    detail(id) {
      this.$router.push(`/store/detail/${id}`);
    },
    navigateTo(item) {
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
      }
    },
    order() {
      console.log(this.ProductId);
      this.$router.push(`/purchaseorder`);
    },
    Mng() {
      this.$router.push(`/productMng`);
    },
  },
};
</script>