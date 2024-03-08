import axios from "../utils/customize-axios";

const createComment = (data) => {
  return axios.post("/api/v1/comment/create", data);
};

const readAll_CMB_Log = (data) => {
  return axios.get(`/api/v1/comment/readAll_CMB_Log?${data}`);
};

export default {
  createComment,
  readAll_CMB_Log,
};
