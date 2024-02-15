import axios from "../utils/customize-axios";

const createProcessTour = (data) => {
  return axios.post("/api/v1/process/create", data);
};

const updateProcessTour = (data) => {
  return axios.put("/api/v1/process/update", data);
};

export default { createProcessTour, updateProcessTour };
