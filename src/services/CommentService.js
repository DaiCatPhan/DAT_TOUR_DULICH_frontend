import axios from "../utils/customize-axios";

const createComment = (data) => {
  return axios.post("/api/v1/comment/create", data);
};

const readAll_CMB_Log = (data) => {
  return axios.get(`/api/v1/comment/readAll_CMB_Log?${data}`);
};

const updateComment = (data) => {
  return axios.put("/api/v1/comment/update", data);
};

const deleteComment = (data) => {
  return axios.delete("/api/v1/comment/delete", {
    data: data,
  });
};

export default {
  createComment,
  readAll_CMB_Log,
  updateComment,
  deleteComment,
};
