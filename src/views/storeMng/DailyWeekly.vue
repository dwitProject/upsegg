<template>
  <div class="flex_container">
    <AdminNav />
    <v-main>
      <v-container>
        <v-card outlined color="white">
          <!-- 요일별 버튼 -->
          <v-card class="d-flex flex-row mt-5 ml-4 mb-4" flat tile>
            <div class="text-center">
              <v-btn class="ml-1" depressed color="primary" to="daily-list">
                일별
              </v-btn>
              <v-btn class="ml-1" depressed color="primary" to="daily-weekly">
                주별
              </v-btn>
              <v-btn class="ml-1" depressed color="primary" to="daily-monthly">
                월별
              </v-btn>
            </div>
          </v-card>
          <!-- 기간 버튼 및 조회 -->
          <v-card class="ml-5 pa-1 pb-2" width="81.5%">
            <v-row>
              <v-col cols="12" md="6">
                <v-btn class="ml-1 mt-2" depressed> 7일 </v-btn>
              </v-col>
              <v-card outlined color="white" class="ma-2">
                <v-col class="pb-0 pt-0">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        prepend-icon="mdi-calendar"
                        class="pt-5"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        취소
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        확인
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-card>
              <v-cal class="mt-7"> ~ </v-cal>
              <v-card outlined color="white" class="ma-2">
                <v-col class="pb-0 pt-0">
                  <v-dialog
                    ref="dialog"
                    v-model="modal1"
                    :return-value.sync="date1"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date1"
                        prepend-icon="mdi-calendar"
                        class="pt-5"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date1" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal1 = false">
                        취소
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date1)"
                      >
                        확인
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-card>
              <v-col class="mt-2">
                <v-btn>검색</v-btn>
              </v-col>
            </v-row>
          </v-card>
          <!-- 통계 그래프 출력 -->
          <v-card class="ml-5 mt-5 pa-1 pb-2" width="81.5%">
            <v-row>
              <v-col>
                <v-sparkline
                  :value="value"
                  :gradient="gradient"
                  :smooth="radius || false"
                  :padding="padding"
                  :line-width="width"
                  :stroke-linecap="lineCap"
                  :gradient-direction="gradientDirection"
                  :fill="fill"
                  :type="type"
                  :auto-line-width="autoLineWidth"
                  auto-draw
                ></v-sparkline>
              </v-col>
              <v-col>
                <v-sparkline
                  :value="value"
                  :gradient="gradient"
                  :smooth="radius || false"
                  :padding="padding"
                  :line-width="width"
                  :stroke-linecap="lineCap"
                  :gradient-direction="gradientDirection"
                  :fill="fill"
                  :type="type"
                  :auto-line-width="autoLineWidth"
                  auto-draw
                ></v-sparkline>
              </v-col>
            </v-row>
          </v-card>
          <!-- 데이터 증감추이 -->
          <v-card class="ml-5 mt-5" width="81.5%">
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">기간</th>
                    <th class="text-left">결제 합계</th>
                    <th class="text-left">환불 합계</th>
                    <th class="text-left">순매출</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.data1 }}</td>
                    <td>{{ item.data2 }}</td>
                    <td>{{ item.data3 }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <!-- 데이터 출력 -->
          <v-card class="d-flex flex-row mt-1 pa-5" flat tile>
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
  </div>
</template>

<script>
import AdminNav from "../../components/AdminNav";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  name: "DailyWeekly",
  components: {
    AdminNav,
  },
  data() {
    return {
      // dialog (다이어 그램 분리 작업 필요)
      menu: false,
      menu2: false,
      // 첫 번째 날짜 선택
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      // 두번째 날짜 선택
      date1: new Date().toISOString().substr(0, 10),
      modal1: false,
      // 통계 데이터
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      headers: [
        {
          text: "일자",
          align: "start",
          sortable: false,
          value: "reDate",
        },
        { text: "주문수", value: "orderQuantity" },
        { text: "품목수", value: "itemQuantity" },
        { text: "상품구매금액", value: "pmt" },
        { text: "배송비", value: "fee" },
        { text: "할인", value: "sale" },
        { text: "쿠폰", value: "coupon" },
        { text: "결제합계", value: "totalAmt" },
        { text: "환불합계", value: "totalRefund" },
        { text: "순매출", value: "netSales" },
      ],
      sales: [
        {
          reDate: "2021-03-25 (목)",
          orderQuantity: 9,
          itemQuantity: 2,
          pmt: 24000,
          fee: 2500,
          protein: 2500,
          sale: 0,
          coupon: 0,
          totalAmt: 0,
          totalRefund: 0,
          netSales: 0,
        },
        {
          reDate: "2021-03-25 (목)",
          orderQuantity: 2,
          itemQuantity: 1,
          pmt: 42000,
          fee: 2500,
          protein: 2500,
          sale: 0,
          coupon: 0,
          totalAmt: 0,
          totalRefund: 0,
          netSales: 0,
        },
        {
          reDate: "2021-03-25 (목)",
          orderQuantity: 5,
          itemQuantity: 2,
          pmt: 12000,
          fee: 2500,
          protein: 2500,
          sale: 0,
          coupon: 0,
          totalAmt: 0,
          totalRefund: 0,
          netSales: 0,
        },
      ],
      desserts: [
        {
          name: "금주(2021-03-26 ~ 2021-03-26)",
          data: 0,
          data1: 0,
          data2: 0,
          data3: 0,
        },
        {
          name: "전주(2021-03-19 ~ 2021-03-25)",
          data: 0,
          data1: 0,
          data2: 0,
          data3: 0,
        },
      ],
    };
  },
};
</script>
<style scoped>
.v-text-field {
  height: 43px;
  width: 120px;
}
.flex_container {
  display: flex;
  height: 100%;
}
</style>