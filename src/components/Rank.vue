<template>
  <div>
    <md-table
      v-model="ranked"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Rank</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}'. `"
      >
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.summonerName
        }}</md-table-cell>
        <md-table-cell md-label="승리" md-sort-by="wins">{{
          item.wins
        }}</md-table-cell>
        <md-table-cell md-label="패배">{{ item.losses }}</md-table-cell>
        <md-table-cell md-label="Tier" md-sort-by="leaguePoints">{{
          item.tier
        }}</md-table-cell>
        <md-table-cell md-label="LeaguePoints" md-sort-by="leaguePoints">{{
          item.leaguePoints
        }}</md-table-cell>
      </md-table-row>
    </md-table>
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
  </div>
</template>

<script>
import api from "@/api/rank";
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) =>
      toLower(item.summonerName).includes(toLower(term))
    );
  }

  return items;
};

export default {
  name: "Rank",
  data: () => ({
    search: null,
    ranked: [],
    page: 1,
    pageCount: 5,
    viewCount: 1,
    list: [],
    summonerlist: [],
    level: [],
  }),
  mounted() {
    this.getTodos();
    this.getSummoners();
  },
  methods: {
    async getTodos() {
      const result = await api.list();
      if (result.status == 200) {
        this.list = result.data;
      }
      console.log(result.data);
    },
    async getSummoners() {
      const summoner = await api.summonerlist();
      if (summoner.status == 200) {
        this.summonerlist = summoner.data;
      }
      console.log(summoner.data);
    },
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.ranked = searchByName(this.list, this.search);
    },
  },
  created() {
    this.ranked = this.list;
    this.level = this.summonerlist;
  },
};
</script>