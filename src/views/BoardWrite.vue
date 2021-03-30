<template>
  <v-main class="grey lighten-3">
    <v-form>
      <v-container>
        <v-row>
          <v-text-field
            :counter="10"
            label="제목"
            v-model="title"
            required
            maxlength="50"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            :counter="10"
            label="이름"
            v-model="name"
            required
            maxlength="50"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            :counter="10"
            label="비밀번호"
            v-model="password"
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
            v-model="content"
            :counter="1000"
            maxlength="1000"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-file-input
            show-size
            counter
            label="File input"
            accept="image/png, image/jpeg, video/mp4"
            v-model="attachment"
            multiple
          ></v-file-input>
        </v-row>
        <v-row>
          <v-btn block outlined color="blue" @click="write()"> 등록 </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
  <!-- <v-container fluid>
    <v-textarea
      name="input-7-1"
      filled
      label="Label"
      auto-grow
      value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    ></v-textarea>
  </v-container> -->
</template>
<script>
import api from "@/api/board";

export default {
  data: () => ({
    title: [],
    name: [],
    password: [],
    content: [],
    attachment: [],
  }),

  methods: {
    async write() {
      const boardwrite = {
        title: this.title,
        name: this.name,
        password: this.password,
        content: this.content,
      };
      const result = await api.post(boardwrite); // 리턴값은 promise연산이 fulfilled된 후의 값
      console.log(result.status); // http 상태코드
      console.log(result.data); //

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

            // newBoard.attachment.push({
            //   ...result.data //...(triple dot): object assign, object copy
            // })
          }
        }
        console.log(newBoard);
      }
      alert("글이 등록되었습니다");
      this.$router.push('/board');
    },
  },
};
</script>
