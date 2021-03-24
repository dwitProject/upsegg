<template>
  <v-app-bar app color="blue" flat>
    <v-img
      src="../assets/logo2.png"
      max-height="70"
      max-width="100"
      @click="navigateTo(home)"
    ></v-img>

    <v-tabs fixed-tabs centered color="white">
      <v-tab v-for="(item, i) in items" :key="i" @click="navigateTo(item)">
        {{ item.text }}
      </v-tab>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-text-field
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 5px"
          type="password"
        ></v-text-field>
        <v-text-field color="deep-purple" label="Phone number"></v-text-field>
      </v-form>
    </v-tabs>
  </v-app-bar>

  <!-- <div class="header">
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="navigateTo(item)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div> -->
</template>
<script>
export default {
  name: "Header",
  data: () => ({
    home: { path: "/" },
    items: [
      { text: "랭킹", path: "/ranking" },
      { text: "스토어", path: "/store" },
      { text: "커뮤니티", path: "/community" },
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
