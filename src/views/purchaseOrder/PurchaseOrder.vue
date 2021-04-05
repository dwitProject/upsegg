<<<<<<< HEAD
<template>
  <div class="p1">
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>장바구니 목록({{ pmt }}원)</v-card-title>

        <div class="products">
          <div v-for="(product, index) in cart" :key="index">
            <h3>{{ product.name }}</h3>
            <img :src="product.image" />
            <div>{{ product.price }}</div>
            <button v-on:click="removeItemFromCart(product)">
              Remove from cart
            </button>
          </div>
        </div>
        <!-- <v-data-table :headers="headers" :items="carts" :items-per-page="5">
          <template v-slot:[`item.imageUrl`]="{ item }">
            <img :src="item.imageUrl" :alt="item.productName" />
          </template>
        </v-data-table> -->
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
                  <v-text-field label="나머지 주소 입력" v-model="address"
                    >{{ zip }}{{ addr1 }}
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
import api from "@/api/purchaseOrder";

export default {
  props: ["cart"],
  name: "purchaseOrder",
  data: () => ({
    name: "",
    address: "",
    tel: "",
    note: "",
    pay: "",
    zip: "",
    addr1: "",
    pmt: "",
    description: "",
    dialog: false,
    headers: [
      { text: "사진", value: "imageUrl" },
      { text: "상품명", value: "productName" },
      { text: "수량", value: "amount" },
      { text: "가격", value: "price" },
    ],
    carts: [
      {
        imageUrl: "", //https://picsum.photos/100/100
        productName: "",
        amount: "",
        price: "",
      },
    ],
  }),
  mounted() {
    // this.getCart();
  },
  methods: {
    async order() {
      const order = {
        name: this.name,
        address: this.address,
        tel: this.tel,
        note: this.note,
        pay: this.pay,
        pmt: this.pmt,
      };
      console.log(this.name);
      console.log(order);
      const result = await api.post(order);
      console.log(result);
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
=======
<template>
  <div class="p1">
    <template>
      <v-card class="mx-auto my-12" max-width="80%">
        <v-card-title>장바구니 목록({{ pmt }}원)</v-card-title>
        <!-- <v-data-table :headers="headers" :items="carts" :items-per-page="5">
          <template v-slot:[`item.imageUrl`]="{ item }">
            <img :src="item.imageUrl" :alt="item.productName" />
          </template>
        </v-data-table> -->
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
              <v-text-field label="전화번호" v-model="phone"></v-text-field>
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
                  <v-text-field label="나머지 주소 입력" v-model="address"
                    >{{ zip }}{{ addr1 }}
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
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  결제하기
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline" @click="order">
                  주문이 완료되었습니다.
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link to="FinishOrder">
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
    pmt: "",
    description: "",
    dialog: false,
    // headers: [
    //   { text: "사진", value: "imageUrl" },
    //   { text: "", value: "productName" },
    //   { text: "수량", value: "amount" },
    //   { text: "가격", value: "price" },
    //   ],
    carts: [
      {
        imageUrl: "https://picsum.photos/100/100",
        productName: "카타리나",
        amount: 2,
        price: 1000,
      },
      {
        imageUrl: "https://picsum.photos/100/100",
        productName: "오잉",
        amount: 3,
        price: 4000,
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
    addProduct() {
      this.amount += 1;
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
>>>>>>> 72357c1ae06f9196faa33622dd4b3f13d23ab561
</style>