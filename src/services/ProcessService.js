import axios from "../utils/customize-axios";

const createProcessTour = (data) => {
  return axios.post("/api/v1/process/create", data);
};

const createDestination = (data) => {
  return axios.post("/api/v1/process/createDestination", data);
};

const deleteDestination = (data) => {
  return axios.delete("/api/v1/process/deleteDestination", {
    data: data,
  });
};

export default { createProcessTour, createDestination, deleteDestination };
