import axios from 'axios'
export default {
  list: () => axios.get(`${process.env.VUE_APP_ORDER}/purchase-orders`),
  post: (order) => axios.post(`${process.env.VUE_APP_ORDER}/purchase-orders`, order),
  detail: (orderId) => axios.post(`${process.env.VUE_APP_ORDER}/purchase-orders/${orderId}/details`),
  getOrderId: (id) => axios.get(`${process.env.VUE_APP_ORDER}/purchase-orders/${id}`),
}