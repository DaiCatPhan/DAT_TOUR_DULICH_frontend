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

export default {
  listRoomOfUser,
  listRoomOfAdmin,
  create,
};
