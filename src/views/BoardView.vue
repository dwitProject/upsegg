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
                      <th class="text-center">글분류: {{ item.type }}</th>
                      <th class="text-center">작성자: {{ item.name }}</th>
                      <th class="text-center">조회수: {{ item.hitCnt }}</th>
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
    
        <v-container>
          <v-row align="baseline">
                <v-col cols="4" />

                <v-btn v-show="hiddenForEdit" color="primary" @click="hiddenForEdit = !hiddenForEdit">
                  글 수정
                </v-btn>
                <v-btn v-show="!hiddenForEdit" color="primary" @click="hiddenForEdit = !hiddenForEdit">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-col cols="2">
                  <v-text-field v-show="!hiddenForEdit" height="10" v-model="pwForBoardModify"/>
                </v-col>
                <v-btn v-show="!hiddenForEdit" @click="checkPwForModify()"> 확인 </v-btn>


                <v-btn v-show="hiddenForDel" color="primary" @click="hiddenForDel = !hiddenForDel">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                <v-btn v-show="!hiddenForDel" color="primary" @click="hiddenForDel = !hiddenForDel">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-col cols="2">
                  <v-text-field v-show="!hiddenForDel" height="10" v-model="pwForBoardDel"/>
                </v-col>
                <v-btn v-show="!hiddenForDel" @click="delBoard()"> 확인 </v-btn>

          </v-row>
        </v-container>
    <!-- 추천기능 -->
    <div class="text-center">
      <span class="caption text-uppercase">추천수:</span>
      <span class="font-weight-bold"> {{ item.upCnt }} </span>
      <v-btn class="ma-2" text icon color="blue lighten-2">
        <v-icon @click="thumbUp()">mdi-thumb-up</v-icon>
      </v-btn>
      <v-btn class="ma-2" text icon color="red lighten-2">
        <v-icon @click="thumbDown()">mdi-thumb-down</v-icon>
      </v-btn>
      <span class="caption text-uppercase">비추천수:</span>
      <span class="font-weight-bold"> {{ item.downCnt }} </span>
      
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
                    <v-btn @click="callDialog(reply.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
    <!-- 댓글 삭제버튼 누를때 뜨는 창 -->
    <v-dialog v-model="dialog" max-width="200px">
      <v-card>
        <v-card-text>
          <v-text-field v-model="pwForReplyDel" label="비밀번호" />
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="delReply()">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    dialog: false,
    pwForReplyDel: "",
    pwForBoardDel: "",
    pwForBoardModify: "",
    replyIdToDelReply: "",
    hiddenForDel: "",
    hiddenForEdit: "",
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
    this.getBoardDetail(this.boardId);
    this.upHitCnt();
    this.getReply(this.boardId);
    this.hiddenForDel = true;
    this.hiddenForEdit = true;
  },
  methods: {
    async getBoardDetail(id) {
      const result = await api.getBoardDetail(id); // 상세내용 얻어오기
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.item = [];
        this.item = result.data;
      }
    },
    async getReply(boardId) {
      const result = await api.getReply(boardId); // 댓글 가져오기
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.replys = [];
        this.replys = result.data;
      }
    },
    async delReply() {
      // v-on handler (Promise/async): "TypeError: Cannot use 'in' operator to search for 'validateStatus'
      // delReply: (boardId, id) => axios.delete(`${process.env.VUE_APP_BOARD_API_BASE}/board-view/{boardId}/reply`, id),
      //이렇게 보냈을때 위에 에러떴었음
      console.log("댓글 id", this.replyIdToDelReply);
      console.log("댓글 비밀번호", this.pwForReplyDel);
      const payload = {
        data: this.pwForReplyDel,
      };
      const result = await api.delReply(this.boardId, this.replyIdToDelReply, payload);

      if (result.data == true) {
        alert("삭제되었습니다");
        this.pwForReplyDel = "";
        this.dialog = false;
        this.getBoardDetail(this.boardId);
        this.getReply(this.boardId);
      } else if (result.data == false) {
        alert("비빌번호가 틀립니다");
      }
    },
    callDialog(replyId) {
      this.dialog = !this.dialog;
      this.replyIdToDelReply = replyId;
    },
    async delBoard() {
      const payload = {
        data: this.pwForBoardDel,
      };
      const result = await api.delBoard(this.boardId, payload);

      if (result.data == true) {
        alert("삭제되었습니다");
        this.pwForBoardDel = "";
        this.$router.push('/board');
      } else if (result.data == false) {
        alert("비빌번호가 틀립니다");
      }
    },
    async checkPwForModify(){
      const payload = {
        data: this.pwForBoardModify,
      };
      const result = await api.checkPwForModify(this.boardId, payload);
      if (result.data == true) {
        this.$router.push({name: `Board-modify`, params: { id: this.boardId, password: this.pwForBoardModify}});
        this.pwForBoardModify = "";
      } else if (result.data == false) {
        alert("비빌번호가 틀립니다");
      }
    },
    async upHitCnt(){
      const result = await api.upHitCnt(this.boardId);
      if (result.status == 200) {
        this.item.hitCnt = result.data.hitCnt;
      }
    },
    async thumbUp() {
      const result = await api.upCnt(this.boardId);
      if (result.data == true) {
        this.getBoardDetail(this.boardId);
      } else if(result.data == false){
        alert("이미 추천하셨습니다")
      }
    },
    async thumbDown() {
      const result = await api.downCnt(this.boardId);
      if (result.data == true) {
        this.getBoardDetail(this.boardId);
      } else if(result.data == false){
        alert("이미 비추천하셨습니다")
      }
    },
    async write() { // 댓글작성
      const sendreply = {
        boardId: this.boardId,
        name: this.name,
        password: this.password,
        content: this.content,
      };
      const result = await api.postReply(this.boardId, sendreply);
      console.log(result);
      console.log(result.data);
      this.name = "";
      this.password = "";
      this.content = "";
      this.getBoardDetail(this.boardId);
      this.getReply(this.$route.params.id);
    },
    
  },
};

// api.delReply()
// REST API DELETE의 REQUEST BODY 양식: {data: 원시 혹은 객체 데이터}
// ex. {data: 22}, {data: {name: "김민태", password: "12345"}}
// spring에서 @RequstBody long num, @RequstBody 객체타입 객체변수

// 원시 데이터 -> spring에서 String(객체타입)으로 받기가능
// spring 받는 타입을 int 혹은 long 타입으로 해놓고 postman으로 보내면 받아지는데 axios로 어떻게 보내야 int, long 같은 원시타입으로 받아지는지 알아봐야함
// const payload = {
//   data: this.pwForReplyDel,
// };
// const result = await api.delReply(this.replyIdToDelReply, payload);

// 객체 데이터 -> 내가 정의한 객체타입으로 받기 가능 ex. Reply, Board
// const payload = {
//   data: { password: this.pwForReplyDel }
// };
// const result = await api.delReply(this.replyIdToDelReply, payload);
</script>



