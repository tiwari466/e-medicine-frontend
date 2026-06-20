import axiosClient from "./axiosClient";

/**
 * Get logged-in user profile
 */
export const getProfile = (userId) =>
  axiosClient.get(`/Users/${userId}`);

/**
 * Update profile
 */
export const updateProfile = (payload) =>
  axiosClient.put(
    "/Users/updateProfile",
    payload
  );

/**
 * Upload profile picture
 */
export const uploadProfilePic = (formData) =>
  axiosClient.post(
    "/Users/uploadProfilePic",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );