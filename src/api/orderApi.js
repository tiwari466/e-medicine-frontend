import axiosClient from "./axiosClient";

export const placeOrder = (payload) =>
  axiosClient.post(
    "/Order/placeOrder",
    payload
  );

export const getUserOrders = (userId) =>
  axiosClient.get(
    `/Order/userOrderList/${userId}`
  );

export const getOrderDetails = (
  userId,
  orderId
) =>
  axiosClient.get(
    `/Order/orderDetails/${userId}/${orderId}`
  );

export const cancelOrder = (payload) =>
  axiosClient.post(
    "/Order/cancelOrder",
    payload
  );

export const downloadInvoice = (
  userId,
  orderId
) =>
  axiosClient.get(
    `/Invoice/downloadInvoice?user_id=${userId}&order_id=${orderId}`,
    {
      responseType: "blob",
    }
  );