import axios from 'axios'
export default {
  list: () => axios.get(`${process.env.VUE_APP_ORDER}/carts`),
  post: (cart) => axios.post(`${process.env.VUE_APP_ORDER}/carts`, cart),
  del: (id) => axios.del(`${process.env.VUE_APP_ORDER}/carts/${id}`),
}