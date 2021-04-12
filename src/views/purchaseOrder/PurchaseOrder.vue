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
    </v-app-bar>
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>상품목록</v-card-title>
        <v-card>
          <v-img
            :src="product.image"
            height="280"
            class="grey darken-4"
          ></v-img>

          <v-card-title class="title"> {{ product.productName }} </v-card-title>
          <v-card-title class="title"> {{ product.description }} </v-card-title>
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
              <v-text-field label="이름" v-model="name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="전화번호" v-model="tel"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <div class="daummap">
                <div ref="embed"></div>
                <v-btn outlined rounded text @click="showApi">주소찾기</v-btn>
                <v-card-text
                  ><p>
                    우편번호:<span>{{ zip }}</span>
                  </p>
                  <p>
                    기본주소:<span> {{ addr1 }}</span>
                  </p>
                  <v-text-field label="나머지 주소 입력" v-model="address">
                  </v-text-field>
                </v-card-text>
              </div>
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
          <v-card-title>결제수단</v-card-title>
          <v-radio-group v-model="pay">
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
    home: { path: "/" },
    dialog: false,
    product: "",
    price: "",
    productName: "",
    addr1: "",
    zip: "",
    address: "",
    name: "",
    pmt: "",
    category: "",
    tel: "",
    note: "",
    pay: "",
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
      const products = {
        price: this.product.price,
        productName: this.product.productName,
        code: this.product.code,
        description: this.product.description,
        category: this.product.category,
        address: this.address,
        tel: this.tel,
        note: this.note,
        pay: this.pay,
        pmt: this.pmt,
        zip: this.zip,
        addr1: this.addr1,
        name: this.name,
      };

      const result = await api2.post(products);
      if (result.status == 200) {
        this.products = result.data;
        console.log("HIHIHIHI");
      }
    },
    navigateTo(item) {
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
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