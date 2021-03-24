<template>
  <v-main>
    <Header />
    <div>
      스토어 페이지
      <router-link to="productMng">이동</router-link>
    </div>
  </v-main>
</template>

<script>
import Header from '../components/Header';
export default {
  name: 'Main',
  components: {
    Header,
  },
};
</script>
