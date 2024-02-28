import axios from "../utils/customize-axios";

const createBlog = (data) => {
  return axios.post("/api/v1/blog/create", data);
};
const updateBlog = (data) => {
  return axios.put("/api/v1/blog/update", data);
};
const readBlog = (data) => {
  return axios.get(`/api/v1/blog/read?${data}`);
};
const readAllBlog = (data) => {
  return axios.get(`/api/v1/blog/readAll?${data}`);
};
const deleteBlog = (data) => {
  return axios.delete("/api/v1/blog/delete", data);
};

export default { createBlog, updateBlog, deleteBlog, readBlog, readAllBlog };
