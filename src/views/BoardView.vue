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
                      <th class="text-center">조회수: {{ item.hitCnt }}</th>
                      <th class="text-center">추천수: {{ item.likeCnt }}</th>
                      <th class="text-center">댓글수: {{ item.replyCnt }}</th>
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
    <!-- <div>222222222222 {{ $route.params.page }}</div> -->
    <!-- <div>333333333333 {{ page }}</div> -->

    <!-- 추천기능 -->
    <div class="text-center">
      <span class="caption text-uppercase">추천수:</span>
      <span class="font-weight-bold"> 22 </span>
      <v-btn class="ma-2" text icon color="blue lighten-2">
        <v-icon @click="thumbUp()">mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn class="ma-2" text icon color="red lighten-2">
        <v-icon @click="thumbDown()">mdi-thumb-down</v-icon>
      </v-btn>
      <span class="caption text-uppercase">비추천수:</span>
      <span class="font-weight-bold"> 222 </span>
    </div>

    <!-- 댓글들 게시창 -->
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <v-card>
            <v-list two-line>
              <template v-for="(reply, i) in replys">
                <v-list-item :key="i">
                  <v-list-item-content>
                    <v-list-item-title>{{ reply.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ reply.content }} {{ reply.id }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="reply.createdTime" />
                    <v-icon @click="delReply(reply.id)">mdi-delete</v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="`divider-${i}`"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="2" />
      </v-row>
    </v-container>
    <!-- 댓글 입력창 -->
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="1" />
            <v-col cols="2">
              <v-text-field
                v-model="name"
                label="이름"
                required
                maxlength="10"
              />
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="password"
                label="비밀번호"
                required
                maxlength="10"
              />
            </v-col>
            <v-col cols="1">
              <v-col cols="3" />
              <v-btn outlined color="blue" @click="write()"> 등록 </v-btn>
            </v-col>
            <v-col cols="1" />
          </v-row>
          <v-row>
            <v-col cols="1" />
            <v-col cols="10">
              <v-textarea
                v-model="content"
                filled
                label="댓글을 입력하세요"
                :counter="50"
              />
            </v-col>
            <v-col cols="1" />
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-main>
</template>
<script>
import api from "@/api/board";
export default {
  data: () => ({
    item: [], // 게시글 상세내용 data
    replys: [], // 가져온 댓글
    boardId: "", // 댓글 등록시 data
    name: "",
    password: "",
    content: "",
  }),
  props: {
    page: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    console.log("게시글 id: ", this.$route.params.id);
    console.log("글이 있던 페이지 번호", this.$route.params.page);
    this.boardId = this.$route.params.id;
    this.getData(this.$route.params.id);
    this.getReply(this.$route.params.id);
  },
  methods: {
    async getData(id) {
      const result = await api.listSingle(id); // 상세내용 얻어오기
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.item = [];
        this.item = result.data;
      }
    },
    async getReply(boardId) {
      const result = await api.listReply(boardId); // 댓글 가져오기
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.replys = [];
        this.replys = result.data;
      }
    },
    async delReply(replyId) {
      // v-on handler (Promise/async): "TypeError: Cannot use 'in' operator to search for 'validateStatus'
      // delReply: (boardId, id) => axios.delete(`${process.env.VUE_APP_BOARD_API_BASE}/board-view/{boardId}/reply`, id),
      //이렇게 보냈을때 위에 에러떴었음
      const result = await api.delReply(this.boardId, replyId);
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.getReply(this.boardId);
      }
    },
    async write() {
      const sendreply = {
        boardId: this.boardId,
        name: this.name,
        password: this.password,
        content: this.content,
      };
      const result = await api.postBoardViewReply(this.boardId, sendreply);
      console.log(result);
      console.log(result.data);
      this.name = "";
      this.password = "";
      this.content = "";
      this.getReply(this.$route.params.id);
    },
    async thumbUp() {},
    async thumbDown() {},
  },
};
</script>
