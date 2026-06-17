import axiosClient from "./axiosClient";

export const updateProfile = (
  payload
) =>
  axiosClient.put(
    "/Users/updateProfile",
    payload
  );

export const uploadProfilePic = (
  payload
) =>
  axiosClient.post(
    "/Users/uploadProfilePic",
    payload
  );