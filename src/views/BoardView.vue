<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10">
          <v-sheet min-height="50vh" rounded="lg">
            <div class="posting-container">
              <div class="inner-container">
                <v-simple-table>
                  <!-- <colgroup>
                    <col width="10%" />
                    <col width="60%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                  </colgroup> -->
                  <thead>
                    <tr>
                      <th class="text-center">번호: {{ item.id }}</th>
                      <th class="text-center">제목: {{ item.title }}</th>
                      <th class="text-center">{{ item.createdTime }}</th>
                      <th class="text-center">{{ item.hitCnt }}</th>
                      <th class="text-center">{{ item.likeCnt }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">{{ item.content }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
    <div>222222222222 {{ $route.params.page }}</div>
    <div>333333333333 {{ page }}</div>
  </v-main>
</template>
<script>
import api from "@/api/board";
export default {
  data: () => ({
    // item:{id:"2", name:"aaa", title:"bbb", createdTime:"ddd", hitCnt:"22", likeCnt:"51"},
    item: [],
    // home: { path: "/" },
    // Board: { path: "/board" },
    // title: [],
    // name: [],
    // password: [],
    // content: [],
    // attachment: [],
  }),
  props: {
            page: {
                type: Number,
                default : 0
            },
        }
  ,
  mounted() {
    console.log("--id--");
    console.log(this.$route.params.id);
    console.log(this.$route.params.page);
    this.getData(this.$route.params.id);
  },
  methods: {
    async getData(id) {
      const result = await api.listSingle(id);
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.item = [];
        this.item = result.data;
      }
    }
  }
};
</script>
