<template>
  <v-main class="grey lighten-3">
    <Header />
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
          <v-sheet min-height="50vh" rounded="lg"> </v-sheet>
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
            <v-btn elevation="2" @click="xxx()">글쓰기</v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Header from "../components/Header";
// import axios from 'axios'
import api from '@/api/board'
export default {
  components: {
    Header,
  },
  data: () => ({
    page: 1,
    xx: [],
  }),
  mounted(){
    this.yys();
  },
  methods: {
    async yys(){
      console.log('hi');
      const result = await api.list();
      // const result = await axios.get('http://localhost:3737/hello').list()
      console.log(result);
      // console.log(result.data);
      // axios.get('http://localhost:3737/hello').list();
      // .then(res => {
      //   console.log('hi', res)
      // })

    },
    xxx() {
      console.log('dd', process.env.VUE_BOARD_API_BASE)
    }
    
  },
};
</script>