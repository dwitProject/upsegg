<template>
  <div class="container">
    <AdminNav />
    <v-main>
      <h3>장바구니 통계/분석 페이지</h3>
    </v-main>
  </div>
</template>

<script>
import AdminNav from "../../components/AdminNav";
export default {
  name: "cart-stat",
  components: {
    AdminNav,
  },
};
</script>
<style>
.container {
  display: flex;
  height: 100%;
}
</style>
