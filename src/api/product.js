import axios from 'axios';

export default {
  // GET http://localhost:8080/products
  get: () => axios.get(`${process.env.VUE_APP_BASE}/products`),

  // POST http://localhost:8080/products
  post: (product) =>
    axios.post(`${process.env.VUE_APP_BASE}/products`, product),

  // PUT http://localhost:8080/products/{id}
  put: (id) => axios.put(`${process.env.VUE_APP_BASE}/products/${id}`),

  // DELETE http://localhost:8080/products/{id}
  del: (id) => axios.delete(`${process.env.VUE_APP_BASE}/products/${id}`),
};
