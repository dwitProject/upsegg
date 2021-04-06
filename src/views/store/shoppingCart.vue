<template>
  <div class="shopping-cart">
    <h1>장바구니</h1>
    <table>
      <caption>
        장바구니 목록
      </caption>
      <tr>
        <th>이름</th>
        <th>가격</th>
        <th>수량</th>
      </tr>
      <tr v-for="cart in carts" :key="cart.id">
        <td>{{ cart.name }}</td>
        <td>{{ cart.price }}</td>
        <td>{{ cart.quantity }}</td>
      </tr>
      <tr>
        <th>총계</th>
        <td colspan="2" {{ total }}></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "shoppingCart",
  computend: {
    carts() {
      return this.$store.getters.cartBooks;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>