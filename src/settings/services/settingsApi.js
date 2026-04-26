import axios from "axios";

const BASE_URL = "https://localhost:44302/api";

// Notification
export const getNotificationSettings = async () => {
  const res = await axios.get(`${BASE_URL}/settings/notifications`);
  return res.data;
};

export const saveNotificationSettings = async (data) => {
  const res = await axios.post(`${BASE_URL}/settings/notifications`, data);
  return res.data;
};