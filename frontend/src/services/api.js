const BASE_URL = "http://localhost:5000/api";

export const getProducts = () => fetch(`${BASE_URL}/products`);
export const getProductById = (id) => fetch(`${BASE_URL}/products/${id}`);
export const createOrder = (data) =>
  fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });