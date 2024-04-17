import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const createVoucher = (data) => {
  console.log('result >>',data);
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

// VOUCHER USER
const createVoucherUser = (data) => {
  return axios.post("/api/v1/voucher/create_voucherUser", data);
};

const readVoucherUser = (data) => {
  return axios.get(`/api/v1/voucher/read_voucherUser?${data}`);
};

export default {
  createVoucher,
  updateVoucher,
  deleteVoucher,
  readAllVoucher,
  createVoucherUser,
  readVoucherUser,
};
