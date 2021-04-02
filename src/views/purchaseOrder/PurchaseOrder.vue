<template>
  <div class="p1">
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>장바구니 목록</v-card-title>
        <v-data-table :headers="headers" :items="carts" :items-per-page="5">
          <template v-slot:[`item.imageUrl`]="{ item }">
            <img :src="item.imageUrl" />
          </template>
        </v-data-table>
      </v-card>
    </template>
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>배송지 정보 입력</v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="이름" v-model="name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3" v-model="address">
              <div class="daummap">
                <div ref="embed"></div>
                <v-btn outlined rounded text @click="showApi">주소찾기</v-btn>

                <p>
                  우편번호: <span>{{ zip }}</span>
                </p>
                <p>
                  기본주소: <span>{{ addr1 }}</span>
                </p>
                <v-text-field label="나머지 주소 입력"></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="전화번호" v-model="phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                label="배송시 요청사항"
                v-model="note"
              ></v-text-field>
            </v-col>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-container class="px-0" fluid>
          <v-radio-group v-model="pay">
            <v-radio label="신용카드" value="신용카드"></v-radio>
            <v-radio label="무통장입금" value="무통장입금"></v-radio>
            <v-radio label="계좌이체" value="계좌이체"></v-radio>
            <v-radio label="모바일페이" value="모바일페이"></v-radio>
          </v-radio-group>
          <router-link to="FinishOrder">
            <v-btn block x-large color="primary" dark @click="order"
              >결제하기</v-btn
            >
          </router-link>
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<script>
import api from "@/api/purchaseOrder";

export default {
  name: "daumMap",
  data: () => ({
    name: "",
    address: "",
    phone: "",
    note: "",
    pay: "",
    zip: "",
    addr1: "",

    headers: [
      { text: "사진", value: "imageUrl" },
      { text: "상품명", value: "productName" },
      { text: "상품갯수", value: "amount" },
      { text: "가격", value: "price" },
    ],
    carts: [
      {
        imageUrl: "https://picsum.photos/100/100",
        productName: "카타리나",
        amount: [2],
        price: [1000],
      },
      {
        imageUrl: "https://picsum.photos/100/100",
        productName: "오잉",
        amount: [3],
        price: [4000],
      },
    ],
  }),
  mounted() {},
  methods: {
    async order() {
      const order = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        note: this.note,
        pay: this.pay,
      };
      console.log(this.name);
      console.log(order);
      const result = await api.post(order);
      console.log(result);
    },
    goPopup() {
      const pop = window.open(
        "/jusopopup.html",
        "pop",
        "width=570,height=420, scrollbars=yes, resizable=yes"
      );
      console.log(pop);
    },
    showApi() {
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
      }).embed(this.$refs.embed);
    },
  },
};
</script>
