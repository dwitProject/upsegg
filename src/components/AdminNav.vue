<template>
  <v-navigation-drawer :mini-variant.sync="mini" app>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Admin</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="navigateTo(item)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'adminNav',
  data: () => ({
    items: [
      { text: '상품관리', icon: '😁', path: '/productMng' },
      { text: '주문관리', icon: '😃', path: '/orderMng' },
      { text: '매출 통계', icon: '💡', path: '/sales-stat' },
      { text: '상품 통계', icon: '💡', path: '/product-stat' },
      { text: '장바구니 통계', icon: '💡', path: '/cart-stat' },
    ],
    mini: false,
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

<style lang="scss">
.v-icon.v-icon {
  font-style: normal;
}
</style>
