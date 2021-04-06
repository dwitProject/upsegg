<template>
  <div class="p1">
    <template>
      <h1>주문내역 보기</h1>
      <v-data-table
        :headers="headers"
        :items="list"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </template>
    <template>
      <order-item
        v-for="(order, i) in order"
        :key="i"
        :order="order"
        :index="i"
      >
      </order-item>
    </template>
  </div>
</template>

<script>
import api from "@/api/purchaseOrder";
export default {
  name: "order",
  props: ["order", "index"],
  data: () => ({
    headers: [
      { text: "사진", value: "image" },
      { text: "상품명", value: "productName" },
      { text: "상품갯수", value: "amount" },
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
