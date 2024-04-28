import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const listRoomOfUser = (data) => {
  return axios.get(`/api/v1/message/listRoomOfUser?${data}`);
};

const listRoomOfAdmin = (data) => {
  return axios.get(`/api/v1/message/listRoomOfAdmin`);
};

const create = (data) => {
  return axios.post(`/api/v1/message/create`, data);
};

const update = (data) => {
  return axios.put(`/api/v1/message/update`, data);
};

export default {
  listRoomOfUser,
  listRoomOfAdmin,
  create,
  update,
};
