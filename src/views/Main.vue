<template>
  <v-main class="grey lighten-3">
    <v-img
      src="../assets/image/logo2.png"
      alt="메인 로고"
      max-height="70"
      max-width="100"
      @click="$router.push('/')"
    ></v-img>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-img
            src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcfa4652c8d383f56/5e21837f63d1b6503160d39b/Home-page.jpg"
            alt="리그오브레전드 대표이미지"
          />
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <span style="width: 520px">
          <v-autocomplete
            v-model="name"
            :items="items"
            auto-select-first
            label="소환사를 입력하세요"
            clearable
            solo
            dense
            color="white"
          ></v-autocomplete>
        </span>
        <span>
          <v-btn
            color="white"
            @click="$router.push({
                name: `Search`,
                params: { id: name },
              })"
            >검색</v-btn>
        </span>
      </v-row>
    </v-container>

    <Footer />
  </v-main>
</template>

<script>
import Footer from "../components/Footer";
import api from "@/api/board";
export default {
  data: () => ({
    items: [],
    name: "",
  }),
  components: {
    Footer,
  },
  mounted() {
    console.log("dd");
    this.getList();
  },
  methods: {
    async getList(){
      const result = await api.getList();
      console.log(result)
      console.log(result.data)
      console.log(result.data.length)
      console.log(result.data[0].name)
      if(result.status == 200){
        // 뒤에서 5개 이름만 
          this.items = [];

        for(let i=result.data.length-5; i<result.data.length; i++){
          this.items.push(result.data[i].name)
        }
        console.log(this.items);
        
      }
    }
  },
};
</script>