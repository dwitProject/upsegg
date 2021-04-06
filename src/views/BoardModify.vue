<template>
  <v-main class="grey lighten-3">
    <v-form>
      <v-container>
        <v-row>
          <v-select :items="seletedType" v-model="item.type" label="글분류" solo></v-select>
        </v-row>
        <v-row>
          <v-text-field
            :counter="10"
            label="제목"
            v-model="item.title"
            required
            maxlength="50"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            :counter="10"
            label="이름"
            v-model="item.name"
            required
            maxlength="50"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            :counter="10"
            label="비밀번호"
            v-model="item.password"
            required
            maxlength="50"
          ></v-text-field>
        </v-row>
        <v-row> 내용 </v-row>
        <v-row>
          <v-textarea
            filled
            name="context"
            hint="내용을 입력해주세요."
            v-model="item.content"
            :counter="1000"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-file-input
            show-size
            counter
            label="File input"
            accept="image/png, image/jpeg, video/mp4"
            v-model="item.attachment"
            multiple
          ></v-file-input>
        </v-row>
        <v-row>
          <v-btn block outlined color="blue" @click="modifyBoardDetail()"> 수정 </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>


<script>
import api from "@/api/board";
export default {
  data: () => ({
    boardId: "",
    passedPassword: "",
    item: [],
    seletedType: ['질문', '자유', '전략'],
  }),
  mounted() {
    this.boardId = this.$route.params.id;
    this.passedPassword = this.$route.params.password;
    console.log(this.boardId)
    this.getBoardDetail(this.boardId);
  },
  methods: {
    async getBoardDetail(id){
      const result = await api.getBoardDetail(id);
      if(result.status == 200){
        this.item = [];
        this.item = result.data;
        this.item.password = this.passedPassword;
        console.log(this.item);
      }
    },
    async modifyBoardDetail(){

      const boardwrite = {
        title: this.item.title,
        name: this.item.name,
        password: this.item.password,
        content: this.item.content,
        type: this.item.type,
      };
      const result = await api.modifyBoardDetail(boardwrite);
      console.log(result);
      console.log(result.status);
      console.log(result.data);


      // 첨부파일 수정시 api도 put으로 바꿔야 할듯?
      if (result.status == 200) {
        const newBoard = result.data;
        newBoard.attachment = []; // 파일목록 초기화
        if (this.attachment && this.attachment.length > 0) {
          for (let attach of this.attachment) {
            const form = new FormData();
            form.append("data", attach); // data는 key값
            const result = await api.uploadFile(newBoard.id, form);
            console.log(result.status);
            console.log(result.data);
          }
        }
        console.log(newBoard);
      }
      alert("글이 수정되었습니다");
      this.$router.push("/board");
    },

  }
};
</script>