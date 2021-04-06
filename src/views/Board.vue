<template>
  <v-main class="grey lighten-3">
    <!-- <Header /> -->
    <v-container>
      <v-row>
        <v-col cols="1" />
        <v-col cols="5">
          <v-sheet min-height="20vh" rounded="lg">
            <v-simple-table>
              <thead>
                <tr>
                  <th>조회수가 많은 글</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in itemsForHitCnt" :key="i">
                  <td @click="$router.push(
                    {name: `Board-view`, params: { id: item.id, page: page }}
                    )">{{ item.title }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-sheet>
        </v-col>
        <v-col cols="5">
          <v-sheet min-height="20vh" rounded="lg">
            <v-simple-table>
              <thead>
                <tr>
                  <th>댓글수가 많은 글</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in itemsForReplyCnt" :key="i">
                  <td @click="$router.push(
                    {name: `Board-view`, params: { id: item.id, page: page }})"
                  >{{ item.title }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-sheet>
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
                    <col width="10%" />
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="text-center">번호</th>
                      <th class="text-center">글분류</th>
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
                      <td class="text-center">{{ item.type }}</td>
                      <td
                        class="text-center"
                        @click="
                          $router.push({
                            name: `Board-view`,
                            params: { id: item.id, page: page },
                          })
                        "
                      >
                        <!-- $router.push(`/board/view/${item.id}`) -->
                        <!-- $router.push({ path: `/board/view/${item.id}`, params: { page: page }}) -->
                        {{ item.title }}
                      </td>
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">{{ item.createdTime }}</td>
                      <td class="text-center">{{ item.hitCnt }}</td>
                      <td class="text-center">{{ item.upCnt }}</td>
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
    itemsForHitCnt: [],
    itemsForReplyCnt: [],
    totalBoardCount: "",
  }),
  mounted() {
    this.getBoardCount();
    // this.getBoardList(1, 10);
    this.loadBoardList(1);
    this.loadBoardListForHitCnt();
    this.loadBoardListForReplyCnt();
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
      this.getBoardList(n - 1, 10);
    },
    async getBoardList(x, y) {
      const result = await api.getBoardList(x, y);
      console.log("페이징하여 가져오기", result);
      if (result.status == 200) {
        this.items = [];
        this.items = result.data;
      }
    },
    async getBoardCount() {
      const result = await api.boardCount();
      this.totalBoardCount = result.data;
      console.log("게시글 개수: ", result);
    },
    async loadBoardListForHitCnt(){
      const result = await api.getBoardListForHitCnt();
      console.log("조회수 상위 5개-동일 시 시간순", result);
      if (result.status == 200) {
        this.itemsForHitCnt = [];
        this.itemsForHitCnt = result.data;
      }
    },
    async loadBoardListForReplyCnt(){
      const result = await api.getBoardListForReplyCnt();
      console.log("댓글수 상위 5개-동일 시 시간순", result);
      if (result.status == 200) {
        this.itemsForReplyCnt = [];
        this.itemsForReplyCnt = result.data;
      }
    }

  },
};
</script>