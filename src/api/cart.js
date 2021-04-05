import axios from 'axios'
export default {
  list: () => axios.get(`${process.env.VUE_APP_BASE}/carts`),
  post: (cart) => axios.post(`${process.env.VUE_APP_BASE}/carts`, cart),
  del: (id) => axios.del(`${process.env.VUE_APP_BASE}/carts/${id}`),
}