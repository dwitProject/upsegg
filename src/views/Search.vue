<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <!-- 왼쪽 프로필 영역 -->
          <!-- default cols 12, md or higher 3 -->
          <v-col cols="10" md="3">
            <v-card outlined elevation="2" height="300px">
              <v-card-text>
                <div class="title text--primary">{{ $route.params.id }}</div>
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
                <v-banner> </v-banner>
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
                <th class="text-left">최근전적</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.name">
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
import api from "@/api/rank";

export default {
  name: "Search",
  components: {},
  data: () => ({
    page: 1,
    pageCount: 3,
    viewCount: 1,
    list: [],
  }),
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      const result = await api.list();
      if (result.status == 200) {
        this.list = result.data;
      }
      console.log(result.data);
    },
  },
};
</script>