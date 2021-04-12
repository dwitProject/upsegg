<template>
  <v-main>
    <v-container class="pt-5">
      <Breadcrumbs
        class="mb-6"
        v-if="$vuetify.breakpoint.mobile"
        :cart="disabled"
      />
      <v-card-title class="pa-0 pb-1">장바구니 통계/분석</v-card-title>
      <v-divider />
      <v-card-text class="text--primary">
        <div>
          - 고객이 장바구니에 담은 수량과 현재 재고 상태를 확인할 수 있습니다.
        </div>
        <div>- 고객이 장바구니에 담은 상품들의 순위 정보를 제공합니다.</div>
        <div>- 최근 1주일 장바구니 내역을 다운로드할 수 있습니다.</div>
        <div>- 해당 메뉴에 표시되는 정보는 실시간 업데이트 됩니다.</div>
      </v-card-text>
      <v-divider />
      <!-- 엑셀파일 다운로드 -->
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
            <v-col cols="12" md="6">
              <div
                class="text-center pa-5"
                style="width: 100%"
                v-if="!stockCartLoading"
              >
                <v-progress-circular
                  width="8"
                  size="180"
                  indeterminate
                  color="#FB9A9A"
                ></v-progress-circular>
              </div>
              <bar-chart :chartData="stockCart" v-if="stockCartLoading" />
            </v-col>
            <v-col cols="12" md="6">
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
import BarChart from "../../components/BarChart";
import Breadcrumbs from "../../components/Breadcrumbs";
import DoughnutChart from "../../components/DoughnutChart";

const moment = require("moment");

export default {
  name: "cart-stat",
  components: {
    BarChart,
    Breadcrumbs,
    DoughnutChart,
  },
  data() {
    return {
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
      disabled: true,
      cart: [],
      stockCart: [],
      quantityCart: [],
      stockCartLoading: false,
      quantityChartLoading: false,
    };
  },
  mounted() {
    this.getAnalysisCart();
    this.getAnalysisCartStock();
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
      const seetLabel = days + " ~ " + now + " 장바구니 통계";
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
    async getAnalysisCartStock() {
      const res = await api.getAnalysisCartStock();
      if (res.status == 200) {
        let labels = [];
        let quantity = [];
        let stock = [];
        res.data.map((item) => {
          labels.push(item.productName);
          stock.push(item.stock);
          quantity.push(item.quantity);
        });
        this.stockCart = {
          labels: labels,
          datasets: [
            {
              label: "상품 재고",
              backgroundColor: "#ff6384",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: stock,
            },
            {
              label: "장바구니 수량",
              backgroundColor: "#36a2eb",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: quantity,
            },
          ],
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    display: false,
                  },
                },
              ],
            },
          },
        },
        res.data.length
          ? (this.stockCartLoading = true)
          : (this.stockCartLoading = false);
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
                "#1cc7d0",
                "#2dde98",
                "#ffc168",
                "#ff6c5f",
                "#ff4f81",
                "#b84592",
                "#8e43e7",
                "#a840ff ",
                "#3369e7",
                "#00aeff",
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
              text: "장바구니 상품 Top10 (수량)",
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