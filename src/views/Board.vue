<template>
  <v-main class="grey lighten-3">
    <!-- <Header /> -->
    <v-container>
      <v-row>
        <v-col cols="1" />
        <v-col cols="5">
          <v-sheet min-height="20vh" rounded="lg"> </v-sheet>
        </v-col>
        <v-col cols="5">
          <v-sheet min-height="20vh" rounded="lg"> </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10">
          <v-sheet min-height="50vh" rounded="lg">
            <div class="posting-container">
              <div class="inner-container">
                <v-simple-table>
                  <colgroup>
                    <col width="10%" />
                    <col width="60%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="text-center">번호</th>
                      <th class="text-center">제목</th>
                      <th class="text-center">작성자</th>
                      <th class="text-center">작성일</th>
                      <th class="text-center">조회</th>
                      <th class="text-center">추천</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in items" :key="i">
                      <td class="text-center">{{ item.id }}</td>
                      <td class="text-center" @click="boardView(i)">{{ item.title }}</td>
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">{{ item.createdTime }}</td>
                      <td class="text-center">{{ item.hitCnt }}</td>
                      <td class="text-center">{{ item.likeCnt }}</td>
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

    <v-container>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10">
          <v-sheet min-height="10vh" rounded="lg">
            <div class="text-center">
              <v-pagination v-model="page" :length="4" circle></v-pagination>
            </div>
            <v-btn outlined color="blue" @click="navigateTo(BoardWrite)">
              작성
            </v-btn>
            <!-- <v-btn elevation="2" @click="navigateTo(BoardWrite)">글쓰기</v-btn> -->
          </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
// import Header from "../components/Header";
import api from "@/api/board";

export default {
  // components: {
  //   Header,
  // },
  data: () => ({
    page: 1,
    BoardWrite: { path: "/board/write" },
    items: [],
  }),
  mounted() {
    // this.test();
  },
  methods: {
    async test() {
      const result = await api.list();
      console.log(result);
    },
    boardView: function () {
      console.log("hi");
    },
    newPosting: function () {
      console.log("hi");
    },

    navigateTo(item) {
      if (this.$route.path != item.path) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>