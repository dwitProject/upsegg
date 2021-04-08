<template>
  <v-main>
    <v-container>
      <v-card outlined color="white">
        <div class="text-right mt-5">
          <v-chip color="success" outlined @click="exportExcel">
            <v-icon left> mdi-microsoft-excel </v-icon>
            다운로드
          </v-chip>
        </div>
        <!-- 통계 그래프 출력 -->
        <v-card class="mt-2 pa-3">
          <v-row>
            <v-col>
              <div
                class="text-center pa-5"
                style="width: 100%"
                v-if="!membersCartLoading"
              >
                <v-progress-circular
                  width="8"
                  size="180"
                  indeterminate
                  color="#FB9A9A"
                ></v-progress-circular>
              </div>
              <doughnut-chart
                :chartData="membersCart"
                v-if="membersCartLoading"
              />
            </v-col>
            <v-col>
              <div
                class="text-center pa-5"
                style="width: 100%"
                v-if="!quantityChartLoading"
              >
                <v-progress-circular
                  width="8"
                  size="180"
                  indeterminate
                  color="#FB9A9A"
                ></v-progress-circular>
              </div>
              <doughnut-chart
                :chartData="quantityCart"
                v-if="quantityChartLoading"
              />
            </v-col>
          </v-row>
        </v-card>
        <!-- 데이터 출력 -->
        <v-card class="mt-5">
          <v-data-table
            :headers="headers"
            :items="cart"
            :items-per-page="10"
            class="elevation-2"
          ></v-data-table>
        </v-card>
      </v-card>
    </v-container>
  </v-main>
</template>
<script>
import api from "@/api/stat";
import XLSX from "xlsx";
import DoughnutChart from "../../components/DoughnutChart";

const moment = require("moment");

export default {
  name: "cart-stat",
  components: {
    DoughnutChart,
  },
  data() {
    return {
      // 통계 데이터
      headers: [
        { text: "순위", value: "id" },
        { text: "상품코드", value: "productCode" },
        { text: "상품명", value: "productName" },
        { text: "판매가", value: "price" },
        { text: "수량", value: "quantity" },
        { text: "재고", value: "stock" },
        { text: "회원수", value: "numberMembers" },
        { text: "비회원수", value: "numberNonMembers" },
      ],
      cart: [],
      membersCart: [],
      quantityCart: [],
      membersCartLoading: false,
      quantityChartLoading: false,
    };
  },
  mounted() {
    this.getAnalysisCart();
    this.getAnalysisCartMembers();
    this.getAnalysisCartQuantity();
  },
  methods: {
    exportExcel() {
      const now = moment().format("YYYY-MM-DD");
      const days = moment().subtract(7, "days").format("YYYY-MM-DD");
      let filter = [];
      this.cart.map((item) => {
        filter.push({
          순위: item.id,
          상품코드: item.productCode,
          상품명: item.productName,
          판매가: item.price,
          수량: item.quantity,
          재고: item.stock,
          회원수: item.numberMembers,
          비회원수: item.numberNonMembers,
        });
      });
      let wBook = XLSX.utils.book_new();
      let wSeet = XLSX.utils.json_to_sheet(filter);
      const seetLabel = days + " ~ " + now  + " 장바구니 통계"
      XLSX.utils.book_append_sheet(wBook, wSeet, seetLabel);
      XLSX.writeFile(wBook, seetLabel + ".xlsx");
    },
    async getAnalysisCart() {
      const res = await api.getAnalysisCart();
      if (res.status == 200) {
        this.cart = res.data;
        let i = 0;
        for (let id in this.cart) {
          i++;
          this.cart[id].id = i;
        }
      }
    },
    async getAnalysisCartMembers() {
      const res = await api.getAnalysisCartMembers();
      if (res.status == 200) {
        let labels = [];
        let numberMembers = [];
        res.data.map((item) => {
          labels.push(item.productName);
          numberMembers.push(item.members);
        });
        this.membersCart = {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                "#f4979c",
                "#e31a22",
                "#dc9018",
                "#fdd666",
                "#96b8db",
                "#697d99",
                "#b2c8bd",
                "#dbe3b6",
                "#bbd634",
                "#b1b134",
              ],
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: numberMembers,
            },
          ],
          options: {
            scales: {},
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "장바구니 상품 TOP (회원수 + 비회원수)",
              position: "top",
            },
          },
        };
        res.data.length
          ? (this.membersCartLoading = true)
          : (this.membersCartLoading = false);
      }
    },
    async getAnalysisCartQuantity() {
      const res = await api.getAnalysisCartQuantity();
      if (res.status == 200) {
        let labels = [];
        let quantityCart = [];
        res.data.map((item) => {
          labels.push(item.productName);
          quantityCart.push(item.quantity);
        });
        this.quantityCart = {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                "#f4979c",
                "#e31a22",
                "#dc9018",
                "#fdd666",
                "#96b8db",
                "#697d99",
                "#b2c8bd",
                "#dbe3b6",
                "#bbd634",
                "#b1b134",
              ],
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: quantityCart,
            },
          ],
          options: {
            scales: {},
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "장바구니 상품 TOP (수량)",
              position: "top",
            },
          },
        };
        res.data.length
          ? (this.quantityChartLoading = true)
          : (this.quantityChartLoading = false);
      }
    },
  },
};
</script>
<style scoped>
</style>