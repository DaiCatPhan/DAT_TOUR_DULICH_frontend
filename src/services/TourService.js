import axios from "../utils/customize-axios";

const createTour = (data) => {
  return axios.post("/api/v1/tour/create", data);
};

const updateTour = (data) => {
  return axios.put("/api/v1/tour/update", data);
};

const getTour = (data) => {
  return axios.get(`/api/v1/tour/read?${data}`);
};

const getTours = (data) => {
  return axios.get(`/api/v1/tour/readAll?${data}`);
};

const uploadImageTour = (data) => {
  return axios.patch("/api/v1/tour/uploadImageTour", data);
};

export default { createTour, uploadImageTour, getTour, getTours, updateTour };
