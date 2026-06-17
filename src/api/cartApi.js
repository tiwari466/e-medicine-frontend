import axiosClient from "./axiosClient";

export const addToCart = (payload) =>
  axiosClient.post(
    "/Cart/addToCart",
    payload
  );

export const getCartItems = (userId) =>
  axiosClient.get(
    `/Cart/getCartItems/${userId}`
  );

export const removeCartItem = (id) =>
  axiosClient.delete(
    `/Cart/removeCartItem/${id}`
  );

export const updateCartQty = (payload) =>
  axiosClient.put(
    "/Cart/updateCartQty",
    payload
  );