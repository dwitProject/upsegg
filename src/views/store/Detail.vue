<template>
  <div id="app">
    <p>Detail</p>

    <h1>상세화면</h1>
    <v-app>
      <v-container class="grey lighten-5">
        <v-row class="test1" no-gutters>
          <v-col md="4">
            <v-img src="" width="500" height="500"> </v-img>
          </v-col>
          <v-col md="3" offset-md="3">
            <v-text class="t1"> {{ list.category }}</v-text> <br />
            <v-text class="t2"> {{ list.name }}</v-text> <br />
            <v-text class="t3"> {{ list.price }} </v-text> <br />
            <v-text class="t4"> {{ list.description }} </v-text>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test1</v-list-item-title><br />
              </v-list-item-content>
              <v-btn>장바구니</v-btn>
              <v-btn @click="Store">뒤로가기</v-btn>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import api from "../../api/purchaseOrder";
export default {
  data: () => ({
    // result: "",
    // id: "",
    list: "",
  }),
  mounted() {
    // 목록 조회 함수
    this.getProductsDetail();
  },
  methods: {
    // 목록 조회 함수

    async getProductsDetail() {
      const productDetail = this.$route.params.id;
      console.log(productDetail);

      const result = await api.getId(productDetail);
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.list = result.data;
      }
    },
    Store() {
      this.$router.push(`/Store/`);
    },
  },
};
</script>

<style>
h1,
p {
  text-align: center;
}

.t1 {
  font-size: 50px;
}
.t2 {
  font-size: 40px;
}
.t3 {
  font-size: 35px;
}
</style>