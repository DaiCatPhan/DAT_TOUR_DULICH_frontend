import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const listRoomOfUser = (data) => {
  return axios.get(`/api/v1/message/listRoomOfUser?${data}`);
};

export default {
  listRoomOfUser,
}; 
