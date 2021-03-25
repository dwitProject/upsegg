<template>
  <div class="container">
    <AdminNav />
    <v-main>
      <h3>매출 통계/분석 페이지</h3>
    </v-main>
  </div>
</template>

<script>
import AdminNav from "../../components/AdminNav";
export default {
  name: "sales-stat",
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