<template>
  <v-breadcrumbs class="pa-0" :items="items">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  name: "breadcrumbs",
  props: ["sales", "product", "cart"],
  data() {
    return {
      items: [
        {
          text:"Home",
          href: "/",
          disabled: false,
        },
        {
          text: "매출 통계",
          href: "/#/sales-stat",
          disabled: this.sales,
        },
        {
          text: "상품 통계",
          href: "/#/product-stat",
          disabled: this.product,
        },
        {
          text: "장바구니 통계",
          href: "/#/cart-stat",
          disabled: this.cart,
        },
      ],
    };
  },
};
</script>
 
