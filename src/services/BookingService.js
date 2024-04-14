import axios from "../utils/customize-axios";

const create = (data) => {
  return axios.post("/api/v1/booking/create", data);
};

const update = (data) => {
  return axios.put(`/api/v1/booking/update`, data);
};

const read = (data) => {
  return axios.get(`/api/v1/booking/read?${data}`);
};

const readAll = (data) => {
  return axios.get(`/api/v1/booking/readAll?${data}`);
};

const createVNP = (data) => {
  return axios.post("/api/v1/booking/vnpay/create_payment_url", data);
};

const vnpay_return = (data) => {
  return axios.get(`/api/v1/booking/vnpay/vnpay_return?${data}`);
};

export default { create, read, readAll, update, createVNP, vnpay_return };
