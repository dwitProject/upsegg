<template>
  <div class="header">
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
  </div>
</template>
<script>
export default {
  name: 'Header',
  data: () => ({
    items: [
      { text: '로고', path: '/' },
      { text: '랭킹', path: '/ranking' },
      { text: '스토어', path: '/store' },
      { text: '커뮤니티', path: '/community' },
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
