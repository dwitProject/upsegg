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
    <!-- <div>222222222222 {{ $route.params.page }}</div> -->
    <!-- <div>333333333333 {{ page }}</div> -->

    <div class="text-center">
      <v-btn
        class="ma-2"
        text
        icon
        color="blue lighten-2"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        text
        icon
        color="red lighten-2"
      >
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
    </div>
    <div class="text-center">
      <span class="caption text-uppercase">추천수:</span>
      <span class="font-weight-bold">
        22
      </span>
    </div>
    <!-- 댓글들 게시창 -->
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <v-card>
            <v-list two-line>
              <!-- <template v-for="n in 6" > -->
              <template v-for="(reply, i) in replys">
                <!-- <template v-for="(item, i) in items"> -->
                <v-list-item :key="i">
                  <v-list-item-content>
                    <v-list-item-title>{{ reply.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ reply.content }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="reply.id + ' ' + reply.createdTime"
                    ></v-list-item-action-text>

                    <v-icon @click="gg()">mdi-delete</v-icon>
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
              <v-text-field v-model="name" label="이름" required maxlength="5" />
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="password" label="비밀번호" required maxlength="5" />
            </v-col>
            <v-col cols="1">
            <v-col cols="3" />
            <v-btn  outlined color="blue" @click="write()"> 등록 </v-btn>
            </v-col>
            <v-col cols="1" />
          </v-row>
          <v-row>
            <v-col cols="1" />
            <v-col cols="10">
              <v-textarea v-model="content" filled label="댓글을 입력하세요" :counter="50" />
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
    // 게시글 상세내용 data
    item: [],
    // 댓글 등록시 data
    boardId: '',
    name: '',
    password: '',
    content: '',
    // 댓글 더미 data
    replys: [
      {
        id: "1",
        name: "김민태",
        content: "그거아니에요",
        createdTime: "2021-03-31",
      },
      
    ],
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
  },
  methods: {
    gg() {
      console.log("dd");
    },
    async getData(id) {
      const result = await api.listSingle(id); // 상세내용 얻어오기
      const result2 = await api.listReply(id); // 댓글 가져오기
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.item = [];
        this.item = result.data;
      }
      if (result2.status == 200) {
        this.replys = [];
        this.replys = result2.data;
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
    },
  },
};
</script>
