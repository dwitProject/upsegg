<template>
  <!-- Provides the application the proper gutter -->

  <v-container fluid class="fill-height" style="min-height: 300px">
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col v-for="item in list" :key="item.id" cols="12" sm="6" md="2">
          <!-- <v-col cols="2"> -->
          <v-card>
            <v-img :src="item.image" height="280" class="grey darken-4"></v-img>
            <v-card-title class="title"> {{ item.name }} </v-card-title>
            <v-card-title class="title"> {{ item.price }} </v-card-title>

            <v-card-text>
              <v-chip-group
                v-model="selection"
                active-class="red accent-3 white--text"
                column
              >
                <v-chip>즉시구매</v-chip>

                <v-chip @click="$router.push(`/Detail/${item.id}`)"
                  >상세보기</v-chip
                >

                <v-chip>장바구니</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    list: [
      {
        id: 1,
        name: "아칼리 봄버 자켓",
        price: "99,000",
        image: require("../../assets/아칼리 봄버 자켓.jpg"),
      },
      {
        id: 2,
        name: "T1 후드티",
        price: "67,000",
        image: require("../../assets/T1후드티.jpg"),
      },
      {
        id: 3,
        name: "2016월챔후드",
        price: "65,000",
        image: require("../../assets/2016월챔후드.jpg"),
      },
    ],
  }),
};
</script>
