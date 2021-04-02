<template>
  <v-main>
    <v-data-table :headers="headers" :items="orderItems" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>주문 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <template>
            <v-btn class="mb-2">
              주문 상태 저장
            </v-btn>
          </template>
        </v-toolbar>
        <v-text-field
          v-model="search"
          append-icon="mdi-account-search"
          label="Search"
          single-line
          hide-details
          class="search-bar"
        ></v-text-field>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  name: 'orderMng',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '상품명', value: 'productName' },
      { text: '카테고리', value: 'category' },
      { text: '주문금액', value: 'price' },
      { text: '주문일', value: 'orderDate' },
      { text: '수량', value: 'quantity' },
      { text: '배송지', value: 'address' },
      { text: '결제수단', value: 'pay' },
      { text: '구매자', value: 'name' },
      { text: '연락처', value: 'tel' },
      { text: '요청사항', value: 'request' },
      { text: '주문 상태', value: 'orderState' },
    ],
    orderItems: [],
  }),
};
</script>

<style lang="scss">
table tr td {
  text-align: center;
}

.search-bar {
  width: 30%;
  padding: 0 20px;
  margin-left: auto;
}
</style>
