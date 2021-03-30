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
                      <td
                        class="text-center"
                        @click="
                          $router.push({
                            name: `Board-view`,
                            params: { id: item.id, page: page },
                          })">
                            <!-- $router.push(`/board/view/${item.id}`) -->
                            <!-- $router.push({ path: `/board/view/${item.id}`, params: { page: page }}) -->
                        {{ item.title }}
                      </td>
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
              <v-pagination
                v-model="page"
                :length="5"
                circle
                @input="loadBoardList(page)"
              />
            </div>
            <v-btn outlined color="blue" @click="$router.push('/board/write')"
              >작성</v-btn
            >
          </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import api from "@/api/board";
export default {
  data: () => ({
    page: 1,
    items: [],
    totalBoardCount: "",
  }),
  mounted() {
    // this.boardListAll();
    this.getBoardCount();
    // this.boardList(1, 10);
    this.loadBoardList(1);
  },
  methods: {
    // navigateTo(item, n) {
    //   if (this.$route.path != item.path) {
    //     this.$router.push(`/board/view/${n}`);
    //     // this.$router.push(item.path);
    //     // this.$router.push(`/board/view/:${data}`);
    //   }
    // },
    loadBoardList(n) {
      this.page = n;
      this.boardList(n - 1, 10);
    },
    async boardList(x, y) {
      const result = await api.list(x, y);
      console.log("페이징하여 가져오기", result);
      if (result.status == 200) {
        this.items = [];
        this.items = result.data;
      }
    },
    async boardListAll() {
      const result = await api.listAll();
      console.log(result);
    },
    async getBoardCount() {
      const result = await api.boardCount();
      this.totalBoardCount = result.data;
      console.log("게시글 개수: ", result);
    },
  },
};
</script>