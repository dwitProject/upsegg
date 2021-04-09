<template>
  <div class="p1">
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>상품목록({{ orderItem.pmt }}원)</v-card-title>
        <v-card>
          <v-img
            :src="product.image"
            height="280"
            class="grey darken-4"
          ></v-img>
          <v-card-title class="title"> {{ product.productName }} </v-card-title>
          <v-card-title class="title"> {{ product.price }}원 </v-card-title>
          <!-- <v-data-table :headers="headers" :items="product" :items-per-page="5">
          <template v-slot:[`item.imageUrl`]="{ item }">
            <img :src="item.imageUrl" :alt="item.productName" />
          </template>
        </v-data-table> -->
        </v-card>
      </v-card>
    </template>
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-text>
          <v-container>
            <v-card-title>배송지 정보 입력</v-card-title>
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                label="이름"
                v-model="orderItem.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                label="전화번호"
                v-model="orderItem.tel"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <div class="daummap">
                <div ref="embed"></div>
                <v-btn outlined rounded text @click="showApi">주소찾기</v-btn>
                <v-card-text
                  ><p>
                    우편번호:<span>{{ orderItem.zip }}</span>
                  </p>
                  <p>
                    기본주소:<span> {{ orderItem.addr1 }}</span>
                  </p>
                  <v-text-field
                    label="나머지 주소 입력"
                    v-model="orderItem.address"
                    >{{ orderItem.zip }}{{ orderItem.addr1 }}
                  </v-text-field>
                </v-card-text>
              </div>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                label="배송시 요청사항"
                v-model="orderItem.note"
              ></v-text-field>
            </v-col>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-container class="px-0" fluid>
          <v-card-title>결제수단</v-card-title>
          <v-radio-group v-model="orderItem.pay">
            <v-radio label="신용카드" value="신용카드"></v-radio>
            <v-radio label="무통장입금" value="무통장입금"></v-radio>
            <v-radio label="계좌이체" value="계좌이체"></v-radio>
            <v-radio label="모바일페이" value="모바일페이"></v-radio>
          </v-radio-group>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="40%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="order"
                >
                  결제하기
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  주문이 완료되었습니다.
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link to="Order">
                    <v-btn x-large color="primary" dark @click="dialog = false"
                      >구매내역 보기</v-btn
                    >
                  </router-link>
                  <router-link to="Store">
                    <v-btn x-large color="primary" dark @click="dialog = false">
                      스토어로 돌아가기
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<script>
import api from "@/api/product";
import api2 from "@/api/purchaseOrder";

export default {
  name: "purchaseOrder",
  data: () => ({
    dialog: false,
    headers: [
      { text: "사진", value: "imageUrl" },
      { text: "상품명", value: "productName" },
      { text: "상품설명", value: "description" },
      { text: "수량", value: "quantity" },
      { text: "가격", value: "price" },
    ],
    carts: [],
    product: [],
    orderItem: {
      name: "",
      address: "",
      tel: "",
      note: "",
      pay: "",
      zip: "",
      addr1: "",
      pmt: "",
      details: [],
    },
  }),
  mounted() {
    console.log("상품ID", this.$route.params.id);
    this.productId = this.$route.params.id;
    this.getProductId(this.productId);
  },
  methods: {
    async getProductId(id) {
      const result = await api.getProductId(id);
      console.log(result.data);
      console.log(result);
      this.product = [];
      this.product = result.data;
    },
    async order() {
      // const order = {
      //   name: this.name,
      //   address: this.address,
      //   tel: this.tel,
      //   note: this.note,
      //   pay: this.pay,
      //   pmt: this.pmt,
      //   zip: this.zip,
      //   addr1: this.addr1,
      // };
      const result = await api2.post(this.orderItem);
      // const detail = await api2.detail(this.product.id);
      // console.log(detail);
      // const detail = await api2.detail(orderId);
      // console.log(detail);

      if (result.status == 200) {
        result.data.details = this.product;
        this.orderItem = result.data;
        console.log("HIHIHIHI");
        console.log(this.orderItem);
      }
    },

    async showApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = "";
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          if (fullRoadAddr !== "") {
            fullRoadAddr += extraRoadAddr;
          }
          this.zip = data.zonecode;
          this.addr1 = fullRoadAddr;
        },
      }).open(); //embed(this.$refs.embed);
    },
  },
};
</script>
<style scoped>
.v-text-field {
  width: 250px;
}
</style>