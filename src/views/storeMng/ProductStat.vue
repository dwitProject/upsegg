<template>
  <v-main>
    <v-container class="pt-5">
      <Breadcrumbs
        class="mb-6"
        v-if="$vuetify.breakpoint.mobile"
        :product="disabled"
      />
      <v-card-title class="pa-0 pb-1">상품 통계/분석</v-card-title>
      <v-divider />
      <v-card-text class="text--primary">
        <div>- 판매중인 상품의 판매순위 정보를 확인할 수 있습니다.</div>
        <div>
          - 순위가 높은 상품을 쇼핑몰 주력상품으로 집중 관리할 수 있습니다.
        </div>
        <div>- 검색 조건에 부합하는 상품 내역을 다운로드할 수 있습니다.</div>
        <div>
          - 판매수량 순위가 높은 상품과 판매금액 순위가 높은 상품을 확인하여
          쇼핑몰 화면 노출, 세트상품 구성 등 쇼핑몰 운영 시 참고할 수 있습니다.
        </div>
        <div>- 판매상품 순위는 실시간 업데이트 됩니다.</div>
      </v-card-text>
      <v-divider />
      <v-card outlined color="white">
        <!-- 기간 버튼 및 조회 -->
        <v-card class="mt-5 pl-16">
          <v-row no-gutters align="center">
            <v-card outlined color="white">
              <v-col>
                <v-card-text class="pa-0 ml-3 mr-15">조회 기간</v-card-text>
              </v-col>
            </v-card>
            <v-card outlined color="white">
              <v-card outlined color="white">
                <v-col>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('today', 1, 'days')"
                  >
                    당일
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('threeDays', 3, 'days')"
                  >
                    3일
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('sevenDays', 7, 'days')"
                  >
                    7일
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('fifteenDays', 15, 'days')"
                  >
                    15일
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('oneMonth', 1, 'months')"
                  >
                    1개월
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('threeMonth', 3, 'months')"
                  >
                    3개월
                  </v-btn>
                  <v-btn
                    depressed
                    class="ml-1 mb-1"
                    @click="dayWeek('sixMonth', 6, 'months')"
                  >
                    6개월
                  </v-btn>
                </v-col>
              </v-card>
              <v-card
                outlined
                color="white"
                class="d-flex ml-3"
                align="center"
                width="130"
              >
                <v-card outlined color="white">
                  <PickerInDialog @pickerDate="setFromDate" />
                </v-card>
                <v-card-text outlined color="white">~</v-card-text>
                <v-card outlined color="white">
                  <PickerInDialog @pickerDate="setToDate" />
                </v-card>
              </v-card>
            </v-card>
          </v-row>
        </v-card>
        <div class="text-center mt-3">
          <v-btn
            width="80"
            color="primary"
            elevation="2"
            rounded
            @click="getPeriod(fromDate, toDate)"
            >조회</v-btn
          >
        </div>
        <!-- 엑셀 다운로드 -->
        <div class="text-right mt-8">
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
                :chartData="quantityChart"
                v-if="quantityChartLoading"
              />
            </v-col>
            <v-col cols="12" md="6">
              <div
                class="text-center pa-5"
                style="width: 100%"
                v-if="!salesChartLoading"
              >
                <v-progress-circular
                  width="8"
                  size="180"
                  indeterminate
                  color="#FB9A9A"
                ></v-progress-circular>
              </div>
              <doughnut-chart
                :chartData="salesChart"
                v-if="salesChartLoading"
              />
            </v-col>
          </v-row>
        </v-card>
        <!-- 데이터 출력 -->
        <v-card class="mt-5">
          <v-data-table
            :headers="headers"
            :items="product"
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
import DoughnutChart from "../../components/DoughnutChart";
import Breadcrumbs from "../../components/Breadcrumbs";
import PickerInDialog from "../../components/PickerInDialog";
import XLSX from "xlsx";

const moment = require("moment");

export default {
  name: "product-stat",
  components: {
    Breadcrumbs,
    DoughnutChart,
    PickerInDialog,
  },
  data() {
    return {
      headers: [
        { text: "순위", value: "id" },
        { text: "상품코드", value: "productCode" },
        { text: "상품명", value: "productName" },
        { text: "판매가", value: "price" },
        { text: "결제수량", value: "paymentQuantity" },
        { text: "환불수량", value: "refundQuantity" },
        { text: "판매수량", value: "salesQuantity" },
        { text: "판매금액", value: "totalSales" },
      ],
      disabled: true,
      product: [],
      salesChart: [],
      quantityChart: [],
      salesChartLoading: false,
      quantityChartLoading: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
    };
  },
  mounted() {
    this.dayWeek("threeDays", 3, "days");
  },
  methods: {
    exportExcel() {
      console.log(this.chartData);
      let filter = [];
      this.product.map((item) => {
        filter.push({
          순위: item.id,
          상품코드: item.productCode,
          상품명: item.productName,
          판매가: item.price,
          결제수량: item.paymentQuantity,
          환불수량: item.refundQuantity,
          판매수량: item.salesQuantity,
          판매금액: item.totalSales,
        });
      });
      let wBook = XLSX.utils.book_new();
      let wSeet = XLSX.utils.json_to_sheet(filter);
      const seetLabel = this.fromDate + " ~ " + this.toDate + " 매출통계";
      XLSX.utils.book_append_sheet(wBook, wSeet, seetLabel);
      XLSX.writeFile(wBook, seetLabel + ".xlsx");
    },
    setFromDate(selectDate) {
      this.fromDate = selectDate;
    },
    setToDate(selectDate) {
      this.toDate = selectDate;
    },
    getPeriod(fromDate, toDate) {
      this.fromDate = fromDate;
      this.toDate = toDate;
      this.getAnalysisProductDate(fromDate, toDate);
      this.getAnalysisProductSalesQuantity(fromDate, toDate);
      this.getAnalysisProductTotalSales(fromDate, toDate);
    },
    dayWeek(day, value, index) {
      const now = moment().format("YYYY-MM-DD");
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      const days = moment().subtract(value, index).format("YYYY-MM-DD");
      switch (day) {
        case "today":
          this.getPeriod(now, now);
          break;
        case "threeDays":
          this.getPeriod(days, yesterday);
          break;
        case "sevenDays":
          this.getPeriod(days, yesterday);
          break;
        case "fifteenDays":
          this.getPeriod(days, yesterday);
          break;
        case "oneMonth":
          this.getPeriod(days, yesterday);
          break;
        case "threeMonth":
          this.getPeriod(days, yesterday);
          break;
        case "sixMonth":
          this.getPeriod(days, yesterday);
          break;
        default:
          this.salesChartLoading = false;
          this.quantityChartLoading = false;
          break;
      }
    },
    async getAnalysisProductSalesQuantity(fromDate, toDate) {
      const res = await api.getAnalysisProductSalesQuantity(fromDate, toDate);
      if (res.status == 200) {
        let labels = [];
        let quantityChart = [];
        res.data.map((item) => {
          labels.push(item.productName);
          quantityChart.push(item.salesQuantity);
        });
        this.quantityChart = {
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
              data: quantityChart,
            },
          ],
          options: {
            scales: {},
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "TOP 10 상품 (판매 수량)",
              position: "top",
            },
          },
        };
        res.data.length
          ? (this.quantityChartLoading = true)
          : (this.quantityChartLoading = false);
      }
    },
    async getAnalysisProductTotalSales(fromDate, toDate) {
      const res = await api.getAnalysisProductTotalSales(fromDate, toDate);
      if (res.status == 200) {
        let labels = [];
        let salesChart = [];
        res.data.map((item) => {
          labels.push(item.productName);
          salesChart.push(item.totalSales);
        });
        this.salesChart = {
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
              data: salesChart,
            },
          ],
          options: {
            scales: {},
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "TOP 10 상품 (판매 합계)",
              position: "top",
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        };
        res.data.length
          ? (this.salesChartLoading = true)
          : (this.salesChartLoading = false);
      }
    },
    async getAnalysisProductDate(fromDate, toDate) {
      const res = await api.getAnalysisProductDate(fromDate, toDate);
      if (res.status == 200) {
        this.product = res.data;
        let i = 0;
        for (let id in this.product) {
          i++;
          this.product[id].id = i;
        }
      }
    },
  },
};
</script>
<style scoped>
</style>