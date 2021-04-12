import axios from 'axios';

export default {
  // GET http://localhost:8080/products
  get: () => axios.get(`${process.env.VUE_APP_BASE}/products`),

  getProductId: (id) => axios.get(`${process.env.VUE_APP_ORDER}/products/${id}`),
  // POST http://localhost:8080/products
  post: (product) =>
    axios.post(`${process.env.VUE_APP_BASE}/products`, product),

  uploadFile: (productId, form) =>
    axios.post(
      `${process.env.VUE_APP_BASE}/products/${productId}/product-files`,
      form,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    ),

  // PUT http://localhost:8080/products/{id}
  put: (id, payload) =>
    axios.put(`${process.env.VUE_APP_BASE}/products/${id}`, payload),

  // DELETE http://localhost:8080/products/{id}
  del: (id) => axios.delete(`${process.env.VUE_APP_BASE}/products/${id}`),
};
