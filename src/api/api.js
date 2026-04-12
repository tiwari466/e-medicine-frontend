import axios from "axios";

const API_BASE_URL = "https://localhost:44302/api";

console.log("API BASE URL:", API_BASE_URL);


// Main API instance (NO Content-Type here)
export const api = axios.create({
  baseURL: API_BASE_URL,
});


// Debug interceptor
api.interceptors.request.use((config) => {

  console.log(
    "REQUEST:",
    config.method?.toUpperCase(),
    config.baseURL + config.url
  );

  console.log("BODY:", config.data);

  return config;
});


// =================== AUTH ===================

export const registerUser = (user) =>
  api.post("/Users/register", user);

export const loginUser = (user) =>
  api.post("/Users/login", user);


// =================== PROFILE ===================

export const updateProfile = (user) =>
  api.put("/Users/updateProfile", user);


// IMPORTANT: Upload (NO JSON HEADER)
export const uploadProfilePic = (data) =>
  api.post("/Users/uploadProfilePic", data);


// =================== ADMIN ===================

export const getUserList = () =>
  api.get("/Admin/userList");

export const addUpdateMedicine = (medicine) =>
  api.post("/Admin/addUpdateMedicine", medicine);


// =================== CART ===================

export const addToCart = (cart) =>
  api.post("/Cart/addToCart", cart);

export const getCartItems = (userId) =>
  api.get(`/Cart/getCartItems/${userId}`);

export const removeCartItem = (cartId) =>
  api.delete(`/Cart/removeCartItem/${cartId}`);

export const updateCartQty = (payload) =>
  api.put(`/Cart/updateCartQty`, payload);


// =================== ORDER ===================

export const getUserOrders = (userId) =>
  api.get(`/Order/userOrderList/${userId}`);

export const placeOrder = (payload) =>
  api.post("/Order/placeOrder", payload);

export const getOrderDetails = (userId, orderId) =>
  api.get(`/Order/orderDetails/${userId}/${orderId}`);

export const cancelOrder = (payload) =>
  api.post("/Order/cancelOrder", payload);


// =================== INVOICE ===================

export const downloadInvoice = (userId, orderId) =>
  api.get(
    `/Invoice/downloadInvoice?user_id=${userId}&order_id=${orderId}`,
    { responseType: "blob" }
  );
