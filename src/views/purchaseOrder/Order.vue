<template>
  <div class="p1">
    <v-app-bar color="dark" dark app>
      <v-img
        src="@/assets/image/logo2.png"
        max-height="70"
        max-width="100"
        @click="navigateTo(home)"
      ></v-img>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title> Riot Store </v-toolbar-title>
      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon> <v-icon>mdi-magnify </v-icon> </v-btn> -->
    </v-app-bar>
    <template>
      <h1 class="mt-16">주문내역 보기</h1>
      <v-data-table
        :headers="headers"
        :items="list"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </template>
    <template>
      <!-- <order-item
        v-for="(order, i) in order"
        :key="i"
        :order="order"
        :index="i"
      >
      </order-item> -->
    </template>
  </div>
</template>

<script>
import api from "@/api/purchaseOrder";
export default {
  name: "order",
  props: ["order", "index"],
  data: () => ({
    home: { path: "/" },
    headers: [
      { text: "상품명", value: "productName" },
      { text: "상품설명", value: "description" },
      { text: "가격", value: "price" },
      { text: "주문일", value: "orderDate" },
    ],
    list: [],
  }),
  computed: {},
  mounted() {
    this.getOrders();
  },
  methods: {
    navigateTo(item) {
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
      }
    },
    async getOrders() {
      const result = await api.list();
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.list = result.data;
      }
    },
  },
};
</script>
