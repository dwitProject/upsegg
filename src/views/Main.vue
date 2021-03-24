<template>
  <v-main>
    <Header />
    <div>
      메인페이지입니다
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
