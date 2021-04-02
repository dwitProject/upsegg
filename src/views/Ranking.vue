<template>
  <v-app>
    <div>
      <v-app-bar color="#27282d" dense dark>
        <v-toolbar-title>Rank</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>스타일 {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
    <Header />
    <v-main>
      <v-container>
        <rank />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "../components/Header.vue";
import Rank from "../components/Rank.vue";
// import Search from "@/components/Search.vue";

export default {
  name: "Ranking",
  components: {
    Header,
    Rank,
    // Search,
  },
  data: () => ({
    items: [{}],
  }),
  methods: {},
};
</script>
