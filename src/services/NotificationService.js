import axios from "../utils/customize-axios";

const create = (data) => {
  return axios.post("/api/v1/notification/create", data);
};

const read = (data) => {
  return axios.get(`/api/v1/notification/read?${data}`);
};

const readID = (data) => {
  return axios.get(`/api/v1/notification/readID?${data}`);
};

const update = (data) => {
  return axios.put(`/api/v1/notification/update`, data);
};

export default { create, read, readID, update };
