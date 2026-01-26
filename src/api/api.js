import axios from "axios";

const API_BASE_URL = "http://localhost:5249/api"; // Your .NET backend URL

console.log("API BASE URL:", API_BASE_URL);
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  console.log("REQUEST:", config.method?.toUpperCase(), config.baseURL + config.url);
  console.log("BODY:", config.data);
  return config;
});
// Example API calls
export const registerUser = (user) => api.post("/Users/registration", user);
export const loginUser = (user) => api.post("/Users/login", user);
export const updateProfile = (user) => api.post("/Users/updateProfile", user);
export const getUserList = () => api.get("/Admin/userList");
export const addUpdateMedicine = (medicine) => api.post("/Admin/addUpdateMedicine", medicine);
export const addToCart = (cart) => api.post("/Cart/addToCart", cart);
export const getUserOrders = (userId) =>api.get(`/Order/userOrderList/${userId}`);
export const getMedicines = () => api.get("/Admin/getMedicines"); // Fetch all medicines
export const getCartItems = (userId) => api.get(`/Cart/getCartItems/${userId}`);
export const removeCartItem = (cartId) => api.delete(`/Cart/removeCartItem/${cartId}`);
export const updateCartQty = (payload) => api.put(`/Cart/updateCartQty`, payload);
export const uploadProfilePic = (formData) => api.post("/Users/uploadProfilePic", formData, { headers: { "Content-Type": "multipart/form-data", },});
export const placeOrder = (payload) => api.post("/Order/placeOrder", payload);

