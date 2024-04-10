import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------
const revenueTour = (data) => {
  return axios.get(`/api/v1/statistical/revenueTour?${data}`);
};

const revenueToursMonth = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursMonth?${data}`);
};

const revenueToursYear = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursYear?${data}`);
};

export default { revenueTour, revenueToursMonth, revenueToursYear };
