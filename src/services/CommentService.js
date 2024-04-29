import axios from "../utils/customize-axios";

const createComment = (data) => {
  return axios.post("/api/v1/comment/create", data);
};

const updateComment = (data) => {
  return axios.put("/api/v1/comment/update", data);
};

const deleteComment = (data) => {
  return axios.delete("/api/v1/comment/delete", {
    data: data,
  });
};

const review = (data) => {
  return axios.get(`/api/v1/comment/review?${data}`);
};

const readAll = (data) => {
  return axios.get(`/api/v1/comment/readAll?${data}`);
};

export default {
  createComment,
  readAll,
  updateComment,
  deleteComment,
  review,
};
