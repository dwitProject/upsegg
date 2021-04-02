<template>
  <div>
    <md-table
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Search</h1>
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
        <md-table-cell md-label="Rank" md-sort-by="rank" md-numeric>{{
          item.rank
        }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Tier">{{ item.tier }}</md-table-cell>
        <md-table-cell md-label="Leaguepoint" md-sort-by="leaguepoint">{{
          item.leaguepoint
        }}</md-table-cell>
        <md-table-cell md-label="Level" md-sort-by="level">{{
          item.level
        }}</md-table-cell>
      </md-table-row>
    </md-table>
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
  </div>
</template>

<script>
const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "TableSearch",
  data: () => ({
    search: null,
    searched: [],
    page: 1,
    pageCount: 3,
    viewCount: 1,
    users: [
      {
        rank: 1,
        name: "Vera Taleworth",
        tier: "bronze",
        leaguepoint: 1000,
        level: 200,
      },
      {
        rank: 2,
        name: "Taleworth",
        tier: "bronze",
        leaguepoint: 900,
        level: 100,
      },
      {
        rank: 3,
        name: "era orth",
        tier: "bronze",
        leaguepoint: 800,
        level: 400,
      },
      {
        rank: 4,
        name: "aeworh",
        tier: "bronze",
        leaguepoint: 700,
        level: 10,
      },
      {
        rank: 5,
        name: "Vwqeorth",
        tier: "bronze",
        leaguepoint: 600,
        level: 200,
      },
      {
        rank: 6,
        name: "qorth",
        tier: "bronze",
        leaguepoint: 500,
        level: 50,
      },
    ],
  }),
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
  },
  created() {
    this.searched = this.users;
  },
};
</script>