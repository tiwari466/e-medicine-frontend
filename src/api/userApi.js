import axiosClient from "./axiosClient";

export const getUserList = () =>
  axiosClient.get("/Users/getUserList");