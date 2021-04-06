import axios from 'axios';

export default {
  get: () => axios.get(`${process.env.VUE_APP_BASE}/sales-orders`),
  put: (id) => axios.put(`${process.env.VUE_APP_BASE}/sales-orders/${id}`),
  del: (id) => axios.delete(`${process.env.VUE_APP_BASE}/sales-orders/${id}`),
};
