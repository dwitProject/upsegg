<template>
  <div>
    <div>
      <h1>주문이 정상적으로 완료되었습니다.</h1>
      <p></p>
    </div>

    <div>
      <v-card>
        <v-data-table :headers="headers" :items="desserts" item-key="name">
        </v-data-table>
      </v-card>
    </div>
    <div>
      <v-card> 주문번호</v-card>
    </div>
    <div>
      <router-link to="Store"> 쇼핑 홈가기 </router-link>
      <router-link to="Order"> 구매내역 보기 </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "상품목록",
        align: "start",
        value: "name",
      },
      { text: "배송지 정보", value: "category" },
      { text: "이름", value: "category" },
      { text: "주소", value: "category" },
      { text: "연락처", value: "category" },
      { text: "요청사항", value: "category" },
    ],
    desserts: [
      {
        name: "",
        category: "",
      },
    ],
  }),
};
</script>