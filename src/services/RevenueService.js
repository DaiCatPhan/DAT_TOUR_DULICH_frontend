import axios from "../utils/customize-axios";

// ------------------ VOUCHER -------------------

const Dashboard = (data) => {
  return axios.get(`/api/v1/statistical/dashboard`);
};

const revenueTour = (data) => {
  return axios.get(`/api/v1/statistical/revenueTour?${data}`);
};

const revenueToursMonth = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursMonth?${data}`);
};

const revenueToursYear = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursYear?${data}`);
};

const revenueToursCancel = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursCancel?${data}`);
};

const revenueToursCancelMonth = (data) => {
  return axios.get(`/api/v1/statistical/revenueToursCancelMonth?${data}`);
};

export default {
  Dashboard,
  revenueTour,
  revenueToursMonth,
  revenueToursYear,
  revenueToursCancel,
  revenueToursCancelMonth,
};
