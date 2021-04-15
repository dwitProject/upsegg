<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="item.img" height="225px" @click="navigateTo(item)" :alt="item.alt" />
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    home: { path: "/" },
    items: [
      {
        path: "/board",
        img: 
        "https://i.pinimg.com/originals/47/6f/c5/476fc5c9090118fce6e7011ef271d0eb.png",
        alt: "게시판"
      },
      {
        path: "/store",
        img: "https://www.leagueoflegends.co.kr/upload/store/d5516f2b610efb218af797c2.png",
          
        alt: "쇼핑몰"
      },
      {
        path: "/ranking",
        img: "https://www.kindpng.com/picc/m/119-1199387_league-of-legends-ranked-png-transparent-png.png",
        alt: "랭킹"
      },
    ],
  }),
  methods: {
    navigateTo(item) {
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
      }
    },
  },
};
</script>