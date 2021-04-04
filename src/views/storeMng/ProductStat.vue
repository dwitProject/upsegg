<template>
  <v-main>
    <v-container>
      <v-card outlined color="white">
        <!-- 기간 버튼 및 조회 -->
        <v-card class="mt-6 pl-3">
          <v-row>
            <v-col md="7" class="d-flex">
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('today', 1, 'days')"
              >
                오늘
              </v-btn>
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('threeDays', 3, 'days')"
              >
                3일
              </v-btn>
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('oneWeek', 7, 'days')"
              >
                7일
              </v-btn>
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('oneMonth', 1, 'months')"
              >
                1개월
              </v-btn>
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('threeMonth', 3, 'months')"
              >
                3개월
              </v-btn>
              <v-btn
                class="ml-1"
                depressed
                @click="dayWeek('sixMonth', 6, 'months')"
              >
                6개월
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col class="d-flex me-10">
              <div>
                <PickerInDialog @pickerDate="setFromDate" />
              </div>
              <h1>~</h1>
              <div>
                <PickerInDialog @pickerDate="setToDate" />
              </div>
            </v-col>
            <v-col>
              <v-btn
                depressed
                class="float-right mt-3 mr-3"
                @click="getPeriod(fromDate, toDate)"
                >검색</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <!-- 통계 그래프 출력 -->
        <v-card class="mt-5 pa-3">
          <v-row>
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
                :chartData="quantityChart"
                v-if="quantityChartLoading"
              />
            </v-col>
            <v-col>
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
import PickerInDialog from "../../components/PickerInDialog";

const moment = require("moment");

export default {
  name: "product-stat",
  components: {
    DoughnutChart,
    PickerInDialog,
  },
  mounted() {
    this.dayWeek("threeDays", 3, "days");
  },
  methods: {
    setFromDate(selectDate) {
      this.fromDate = selectDate;
    },
    setToDate(selectDate) {
      this.toDate = selectDate;
    },
    getPeriod(fromDate, toDate) {
      this.getAnalysisProductDate(fromDate, toDate);
      this.getAnalysisProductSalesQuantity(fromDate, toDate);
      this.getAnalysisProductTotalSales(fromDate, toDate);
    },
    dayWeek(day, value, index) {
      const now = moment().format("YYYY-MM-DD");
      const days = moment().subtract(value, index).format("YYYY-MM-DD");
      switch (day) {
        case "today":
          this.getPeriod(now, now);
          break;
        case "threeDays":
          this.getPeriod(days, now);
          break;
        case "oneWeek":
          this.getPeriod(days, now);
          break;
        case "oneMonth":
          this.getPeriod(days, now);
          break;
        case "threeMonth":
          this.getPeriod(days, now);
          break;
        case "sixMonth":
          this.getPeriod(days, now);
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
              text: "상위 TOP 10 상품 (판매 수량)",
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
        console.log(res.data);
        res.data.map((item) => {
          labels.push(item.productName);
          salesChart.push(item.totalSales);
        });
        this.salesChart = {
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
              text: "상위 TOP 상품 (판매 합계)",
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
      product: [],
      salesChart: [],
      quantityChart: [],
      salesChartLoading: false,
      quantityChartLoading: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
    };
  },
};
</script>
<style scoped>
</style>