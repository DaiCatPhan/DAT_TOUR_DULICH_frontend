import axios from "../utils/customize-axios";

const create = (data) => {
  return axios.post("/api/v1/viewed/create", data);
};

const deleteViewed = (data) => {
  return axios.delete("/api/v1/viewed/delete", {
    data: data,
  });
};

const readAll = (data) => {
  return axios.get(`/api/v1/viewed/reads?${data}`);
};

export default { create, deleteViewed, readAll };
