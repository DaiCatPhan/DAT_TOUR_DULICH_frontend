import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const createVoucher = (data) => {
  return axios.post("/api/v1/voucher/create", data);
};

const updateVoucher = (data) => {
  return axios.put("/api/v1/voucher/update", data);
};

const deleteVoucher = (data) => {
  return axios.delete("/api/v1/voucher/delete", {
    data: data,
  });
};

const readAllVoucher = (data) => {
  return axios.get(`/api/v1/voucher/readAll?${data}`);
};

export default {
  createVoucher,
  updateVoucher,
  deleteVoucher,
  readAllVoucher,
};
