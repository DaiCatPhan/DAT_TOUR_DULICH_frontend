import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const listRoomOfUser = (data) => {
  return axios.get(`/api/v1/message/listRoomOfUser?${data}`);
};

const listRoomOfAdmin = (data) => {
  return axios.get(`/api/v1/message/listRoomOfAdmin`);
};

export default {
  listRoomOfUser,
  listRoomOfAdmin,
};
