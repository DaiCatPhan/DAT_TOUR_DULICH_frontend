import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const revenueTour = (data) => {
  return axios.get(`/api/v1/statistical/revenueTour?${data}`);
};

const revenueTours = (data) => {
  return axios.get(`/api/v1/statistical/revenueTours?${data}`);
};

export default { revenueTour, revenueTours };
