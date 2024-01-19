import axios from "../utils/customize-axios";

const createProcessTour = (data) => {
  return axios.post("/api/v1/process/create", data);
};

const createDestination = (data) => {
  return axios.post("/api/v1/process/createDestination", data);
};

export default { createProcessTour , createDestination};
