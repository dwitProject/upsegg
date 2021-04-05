<template>
  <v-main>
    <v-container>
      <v-card outlined color="white">
        <!-- 기간 버튼 및 조회 -->
        <v-card class="mt-6 pl-3">
          <v-row>
            <v-col md="7" sm="8" class="d-flex">
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
                class="text-right mt-3 mr-3"
                @click="getPeriod(fromDate, toDate)"
                >검색</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <div class="text-right mt-8">
          <v-chip color="success" outlined @click="exportExcel">
            <v-icon left> mdi-microsoft-excel </v-icon>
            다운로드
          </v-chip>
        </div>
        <!-- 통계 그래프 출력 -->
        <v-card class="mt-2 pa-3">
          <div
            class="text-center pa-5"
            style="width: 100%"
            v-if="!chartLoading"
          >
            <v-progress-circular
              width="8"
              size="180"
              indeterminate
              color="#FB9A9A"
            ></v-progress-circular>
          </div>
          <bar-chart :chartData="chartData" v-if="chartLoading" />
        </v-card>

        <!-- 데이터 출력 -->
        <v-card class="mt-3">
          <v-data-table
            :headers="headers"
            :items="sales"
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
import BarChart from "../../components/BarChart";
import PickerInDialog from "../../components/PickerInDialog";
import XLSX from "xlsx";

const moment = require("moment");

export default {
  name: "sales-stat",
  components: {
    BarChart,
    PickerInDialog,
  },
  mounted() {
    this.dayWeek("oneMonth", 1, "months");
  },
  methods: {
    exportExcel() {
      let filter = [];
      this.sales.map((item) => {
        filter.unshift({
          일자: item.orderDate,
          주문수: item.numberOrders,
          품목수: item.numberItems,
          상품구매금액: item.productPurchaseAmount,
          배송비: item.deliveryCharge,
          할인: item.cashDiscount,
          쿠폰: item.coupon,
          결제합계: item.totalPayment,
          환불합계: item.totalRefund,
          순매출: item.netSales,
        });
      });
      let wBook = XLSX.utils.book_new();
      let wSeet = XLSX.utils.json_to_sheet(filter);
      const seetLabel = this.chartData.datasets[0].label;
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
      this.getAnalysisSalesDate(fromDate, toDate);
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
          this.chartLoading = false;
          break;
      }
    },
    async getAnalysisSalesDate(fromDate, toDate) {
      const res = await api.getAnalysisSalesDate(fromDate, toDate);
      if (res.status == 200) {
        this.sales = res.data;
        let labels = [];
        let chartDate = [];
        res.data.map((item) => {
          chartDate.unshift(item.totalPayment);
          labels.unshift(item.orderDate);
        });
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: fromDate + " ~ " + toDate + " 매출통계",
              backgroundColor: "#f87979",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              data: chartDate,
            },
          ],
        };
        res.data.length
          ? (this.chartLoading = true)
          : (this.chartLoading = false);
      }
    },
  },

  data() {
    return {
      headers: [
        { text: "일자", value: "orderDate" },
        { text: "주문수", value: "numberOrders" },
        { text: "품목수", value: "numberItems" },
        { text: "상품구매금액", value: "productPurchaseAmount" },
        { text: "배송비", value: "deliveryCharge" },
        { text: "할인", value: "cashDiscount" },
        { text: "쿠폰", value: "coupon" },
        { text: "결제합계", value: "totalPayment" },
        { text: "환불합계", value: "totalRefund" },
        { text: "순매출", value: "netSales" },
      ],
      sales: [],
      chartData: [],
      chartLoading: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
    };
  },
};
</script>
<style scoped>
</style>