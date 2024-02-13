import axios from "../utils/customize-axios";

const createDestination = (data) => {
  return axios.post("/api/v1/destination/create", data);
};

const deleteDestination = (data) => {
  return axios.delete("/api/v1/destination/delete", {
    data: data,
  });
};

export default { createDestination, deleteDestination };
