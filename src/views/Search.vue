<template>
  <v-app>
    <header>
      <Header />
    </header>
    <v-main>
      <v-container>
        <v-row>
          <!-- 왼쪽 프로필 영역 -->
          <!-- default cols 12, md or higher 3 -->
          <v-col cols="10" md="3">
            <v-card outlined elevation="2" height="300px">
              <v-card-text>
                <div class="title text--primary">닉네임</div>
                <div></div>
              </v-card-text>
              <v-divider></v-divider>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/588.png"
                  ></v-img
                ></v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-card>
          </v-col>
          <v-col cols="10" md="6">
            <v-card outlined elevation="2" height="300px">
              <div class="pa-3">
                <v-textarea
                  outlined
                  label="What are you thinking?"
                  v-model="post"
                ></v-textarea>
              </div>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Solo</v-list-item-title>
                  <v-list-item-subtitle>tier</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-pagination
          v-model="page"
          :length="pageCount"
        ></v-pagination></v-container
    ></v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";
// const toLower = (text) => {
//   return text.toString().toLowerCase();
// };

// const searchByName = (items, term) => {
//   if (term) {
//     return items.filter((item) => toLower(item.name).includes(toLower(term)));
//   }

//   return items;
// };

export default {
  name: "TableSearch",
  components: {
    Header,
  },
  data: () => ({
    page: 1,
    pageCount: 3,
    viewCount: 1,
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
      {
        name: "Cupcake",
        calories: 305,
      },
      {
        name: "Gingerbread",
        calories: 356,
      },
      {
        name: "Jelly bean",
        calories: 375,
      },
      {
        name: "Lollipop",
        calories: 392,
      },
      {
        name: "Honeycomb",
        calories: 408,
      },
      {
        name: "Donut",
        calories: 452,
      },
      {
        name: "KitKat",
        calories: 518,
      },
    ],
  }),
  methods: {},
  created() {},
};
</script>