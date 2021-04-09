<template>
  <v-main>
    <v-app-bar color="gray" dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title> Riot Store </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-for: item in items fixed-tabs background-color="black" dark>
          <v-tab @click="navigateHome()">홈</v-tab>
          <v-tab @click="navigateStachu()">스태츄</v-tab>
          <v-tab @click="navigatePigure()">피규어</v-tab>
          <v-tab @click="navigatePoster()">포스터</v-tab>
          <v-tab @click="navigateJacket()">후드,자켓</v-tab>
          <v-tab @click="navigateCart()">장바구니</v-tab>
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
              <v-card-title class="title"> {{ item.name }} </v-card-title>
              <v-card-title class="title"> {{ item.price }} </v-card-title>

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
import api from "../api/product";

export default {
  name: "Store",
  data: () => ({
    list: [],
    ProductId: "",
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
    order() {
      console.log(this.ProductId);
      this.$router.push(`/purchaseorder`);
    },
  },
};
</script>