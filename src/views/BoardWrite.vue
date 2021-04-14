<template>
  <v-main class="grey lighten-3">
    <v-form>
      <v-container>
        <v-row>
          <v-select
            :items="seletedType"
            v-model="type"
            label="글분류"
            solo
          ></v-select>
        </v-row>
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
</template>
<script>
import api from "@/api/board";
export default {
  data: () => ({
    title: [],
    type: [],
    name: [],
    password: [],
    content: [],
    attachment: [],
    seletedType: ["질문", "자유", "전략"],
  }),
  methods: {
    async write() {
      const payload = {
        title: this.title,
        name: this.name,
        password: this.password,
        content: this.content,
        type: this.type,
      };
      const result = await api.postBoard(payload); // 리턴값은 promise연산이 fulfilled된 후의 값
      if (result.status == 200) {
        const newBoard = result.data;
        newBoard.attachment = []; // 파일목록 초기화
        if (this.attachment && this.attachment.length > 0) {
          for (let attach of this.attachment) {
            const form = new FormData();
            form.append("data", attach); // data는 key값
            await api.uploadFile(newBoard.id, form);
          }
        }
      }
      alert("글이 등록되었습니다");
      this.$router.push("/board");
    },
  },
};
</script>