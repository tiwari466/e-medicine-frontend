import axiosClient from "./axiosClient";

export const loginUser = (payload) =>
  axiosClient.post(
    "/Users/login",
    payload
  );

export const registerUser = (payload) =>
  axiosClient.post(
    "/Users/register",
    payload
  );