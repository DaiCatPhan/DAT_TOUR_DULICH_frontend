import axios from "axios";

// Tạo ra phiên bản axios mà theo í của mình
const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("accsessToken")}`,
};

const handleRefetshToken = async () => {
  const res = await instance.post("/api/v1/auth/refresh");
  if (res) {
    return res.data.DT;
  } else {
    return null;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const NO_RETRY_HEADER = "x-no-retry";

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const accsessToken = await handleRefetshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (accsessToken) {
        error.config.headers["Authorization"] = `Bearer ${accsessToken}`;
        localStorage.setItem("accsessToken", accsessToken);
        return instance.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
