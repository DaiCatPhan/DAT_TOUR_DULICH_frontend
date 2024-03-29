import axios from "../utils/customize-axios";

const loginApi = ({ email, password }) => {
  return axios.post("/api/v1/auth/login", { email, password });
};

const logoutApi = () => {
  return axios.get("/api/v1/auth/logout");
};

const registerApi = (data) => {
  return axios.post("/api/v1/auth/register", data);
};

const fetchProfile = () => {
  return axios.get("/api/v1/auth/fetchProfile");
};

const LogoutApi = () => {
  return axios.post("/api/v1/auth/logout");
};

const refetshTokenApi = () => {
  return axios.get("/api/v1/auth/refresh");
};

export default {
  registerApi,
  loginApi,
  fetchProfile,
  logoutApi,
  LogoutApi,
  refetshTokenApi,
};
