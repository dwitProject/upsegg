<template>
  <div id="app">
    <p>Detail</p>

    <h1>상세화면</h1>
    <v-app>
      <v-container class="grey lighten-5">
        <v-row class="test1" no-gutters>
          <v-col md="4">
            <v-img src="../../assets/rv.jpg" width="500" height="500"> </v-img>
          </v-col>
          <v-col md="3" offset-md="3">
            <v-text> 리븐 피규어 </v-text> <br />
            <v-text> 85,000 </v-text>
            <v-text> 당일 배송 </v-text>
            <v-text> 수량 </v-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test1</v-list-item-title>
                <v-list-item-title>Test2</v-list-item-title>
                <v-list-item-title>Test3</v-list-item-title>
                <v-list-item-title>Test4</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  mounted() {
    console.log("--id--");
    console.log(this.$route.params.id);
  },
};
</script>

<style>
h1,
p {
  text-align: center;
}
</style>