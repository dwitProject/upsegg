<template>
  <div class="p1">
    <template>
      <h1>장바구니</h1>
      <v-data-table :headers="headers" :items="carts" :items-per-page="5">
        <template v-slot:item.imageUrl="{ item }">
          <img :src="item.imageUrl" />
        </template>
      </v-data-table>
    </template>
    <template>
      <h1>배송지 정보 입력</h1>
      <v-card outlined elevation="2">
        <v-card-text>
          <v-container>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="이름" v-model="name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="주소" v-model="address"></v-text-field>
              <div class="daummap">
                <p>
                  우편번호: <span>{{ zip }}</span>
                </p>
                <p>
                  기본주소: <span>{{ addr1 }}</span>
                </p>
                <p>
                  상세주소: <span>{{ addr2 }}</span>
                </p>
                <div ref="embed"></div>
              </div>
              <v-btn @click="showApi">주소찾기</v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="전화번호" v-model="phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-textarea label="배송시 요청사항" v-model="note"></v-textarea>
            </v-col>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
    <template>
      <h1>결제 수단</h1>
      <v-container class="px-0" fluid>
        <v-radio-group v-model="pay">
          <v-radio label="신용카드" value="신용카드"></v-radio>
          <v-radio label="무통장입금" value="무통장입금"></v-radio>
          <v-radio label="계좌이체" value="계좌이체"></v-radio>
          <v-radio label="모바일페이" value="모바일페이"></v-radio>
        </v-radio-group>
      </v-container>
    </template>
    <template>
      <div>
        <router-link to="FinishOrder">
          <v-btn @click="order">결제하기</v-btn>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import api from "@/api/purchaseOrder";

export default {
  name: "daumMap",
  data: () => (
    { zip: "", addr1: "", addr2: "" },
    {
      name: "",
      address: "",
      phone: "",
      note: "",
      pay: "",

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
    }
  ),
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
