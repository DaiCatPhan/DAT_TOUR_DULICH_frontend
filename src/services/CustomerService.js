import axios from "../utils/customize-axios";

const readAll = (data) => {
  return axios.get(`/api/v1/customer/readAll?${data}`);
};

const update = (data) => {
  return axios.put(`/api/v1/customer/update`, data);
};

const create = (data) => {
  return axios.patch("/api/v1/customer/create", data);
};

const deleteCus = (data) => {
  return axios.delete("/api/v1/customer/delete", {
    data: data,
  });
};

export default { readAll, update, create, deleteCus };
