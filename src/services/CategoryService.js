import axios from "../utils/customize-axios";

const createCategory = (data) => {
  return axios.post("/api/v1/category/create", data);
};

const readAllCategory = (data) => {
  return axios.get(`/api/v1/category/readAll?${data}`);
};

const deleteCategory = (data) => {
  return axios.delete("/api/v1/category/delete", {
    data: data,
  });
};

export default { createCategory, readAllCategory, deleteCategory };
