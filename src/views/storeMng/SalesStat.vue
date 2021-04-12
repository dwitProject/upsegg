<template>
  <v-main>
    <v-container class="pt-5">
      <v-card outlined color="white">
        <Breadcrumbs
          class="mb-6"
          v-if="$vuetify.breakpoint.mobile"
          :sales="disabled"
        />
        <v-card-title class="pa-0 pb-1">매출 통계/분석</v-card-title>
        <v-divider />
        <v-card-text class="text--primary">
          <div>- 기간별 매출 정보를 제공합니다.</div>
          <div>- 검색 조건에 부합하는 매출 내역을 다운로드할 수 있습니다.</div>
          <div>- 해당 메뉴에 표시되는 정보는 실시간 업데이트 됩니다.</div>
        </v-card-text>
        <v-divider />
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
import Breadcrumbs from "../../components/Breadcrumbs";
import PickerInDialog from "../../components/PickerInDialog";
import XLSX from "xlsx";

const moment = require("moment");

export default {
  name: "sales-stat",
  components: {
    BarChart,
    Breadcrumbs,
    PickerInDialog,
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
      disabled: true,
      sales: [],
      chartData: [],
      chartLoading: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
    };
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
          options: {
            scales: {
              xAxes: [
                {
                  ticks: {
                    display: true,
                  },
                },
              ],
            },
          },
        };
        res.data.length
          ? (this.chartLoading = true)
          : (this.chartLoading = false);
      }
    },
  },
};
</script>
<style scoped>
</style>