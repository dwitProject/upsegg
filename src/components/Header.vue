<template>
  <v-app-bar app color="blue" flat>
    <v-img
      src="@/assets/image/logo2.png"
      max-height="70"
      max-width="100"
      @click="navigateTo(home)"
    ></v-img>

    <v-tabs fixed-tabs centered color="white">
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab v-for="(item, i) in items" :key="i" @click="navigateTo(item)">
        {{ item.text }}
      </v-tab>
      <md-autocomplete
        class="search"
        v-model="selectedEmployee"
        :md-options="employees"
        md-layout="box"
        ><v-btn
          color="white"
          @click="
            $router.push({
              name: `Search`,
              params: { id: name },
            })
          "
          >검색</v-btn
        >
        <label>Search...</label>
      </md-autocomplete>
    </v-tabs>
  </v-app-bar>
</template>
<script>
export default {
  name: "Header",
  data: () => ({
    home: { path: "/" },
    items: [
      { text: "커뮤니티", path: "/board" },
      { text: "스토어", path: "/store" },
      { text: "랭킹", path: "/ranking" },
    ],
    selectedEmployee: null,
    employees: [
      "Jim Halpert",
      "Dwight Schrute",
      "Michael Scott",
      "Pam Beesly",
      "Angela Martin",
      "Kelly Kapoor",
      "Ryan Howard",
      "Kevin Malone",
      "Creed Bratton",
      "Oscar Nunez",
      "Toby Flenderson",
      "Stanley Hudson",
      "Meredith Palmer",
      "Phyllis Lapin-Vance",
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