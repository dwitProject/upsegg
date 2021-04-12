import axios from 'axios'
export default {
  list: () => axios.get(`${process.env.VUE_APP_ORDER_BASE}/purchase-orders`),
  post: (order) => axios.post(`${process.env.VUE_APP_ORDER_BASE}/purchase-orders`, order),
  detail: (orderId) => axios.post(`${process.env.VUE_APP_ORDER_BASE}/purchase-orders/${orderId}/details`),
  getOrderId: (id) => axios.get(`${process.env.VUE_APP_ORDER_BASE}/purchase-orders/${id}`),
  getProductId: (id) => axios.get(`${process.env.VUE_APP_ORDER_BASE}/products/${id}`),
  get: () => axios.get(`${process.env.VUE_APP_ORDER_BASE}/products`),
  // POST http://localhost:8080/products
}