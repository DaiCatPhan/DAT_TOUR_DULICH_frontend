import axios from "../utils/customize-axios";

const createTour = (data) => {
  return axios.post("/api/v1/tour/create", data);
};

const uploadImageTour = (data) => {
  return axios.patch("/api/v1/tour/uploadImageTour", data);
};

export default { createTour, uploadImageTour };

 
