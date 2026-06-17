import axiosClient from "./axiosClient";

export const getMedicines = () =>
  axiosClient.get(
    "/Admin/getMedicines"
  );

export const addUpdateMedicine =
  (payload) =>
    axiosClient.post(
      "/Admin/addUpdateMedicine",
      payload
    );