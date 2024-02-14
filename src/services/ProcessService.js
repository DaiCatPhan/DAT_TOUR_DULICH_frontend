import axios from "../utils/customize-axios";

const createProcessTour = (data) => {
  return axios.post("/api/v1/process/create", data);
};

export default { createProcessTour };
