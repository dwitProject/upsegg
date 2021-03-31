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

    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="1" />
            <v-col cols="2">
              <v-text-field label="이름" required maxlength="5"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="비밀번호"
                required
                maxlength="5"
              ></v-text-field>
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
              <v-textarea
                filled
                name="context"
                label="댓글을 입력하세요"
                :counter="50"
              ></v-textarea>
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
    cards: ["Today"],
    replys: [
      {
        id: "1",
        name: "김민태",
        content: "그거아니에요",
        createdTime: "2021-03-31",
      },
      {
        id: "2",
        name: "ghdrlfehd",
        content: "sdfsd",
        createdTime: "2021-42-31",
      },
      {
        id: "3",
        name: "sadfdsf",
        content: "fsdfds",
        createdTime: "2021-22-31",
      },
      { id: "4", name: "sdfsd", content: "fsdf", createdTime: "2021-03-33" },
      { id: "5", name: "234df", content: "sdfsdfd", createdTime: "2323-03-31" },
    ],
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
      default: 0,
    },
  },
  mounted() {
    console.log("--id--");
    console.log(this.$route.params.id);
    console.log(this.$route.params.page);
    this.getData(this.$route.params.id);
  },
  methods: {
    gg() {
      console.log("dd");
    },
    async getData(id) {
      const result = await api.listSingle(id);
      console.log(result);
      console.log(result.data);
      if (result.status == 200) {
        this.item = [];
        this.item = result.data;
      }
    },
  },
};
</script>
