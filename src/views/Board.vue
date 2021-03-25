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
            <v-btn elevation="2">글쓰기</v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Header from '../components/Header';
export default {
  data () {
      return {
        page: 1,
      }
    },
  components: {
    Header,
  },
};
</script>