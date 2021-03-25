import axios from 'axios';

export default {
  // POST http://localhost:8080/products
  post: (product) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/products`, product),
  // GET http://localhost:8080/products
  get: () => axios.get(`${process.env.VUE_APP_API_BASE}/products`),
};
