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
  // const res = await instance.get("/api/v1/auth/refresh");
  // console.log("checkRefetsh", res);
  console.log("handleRefetshToken");
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

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.config && error.response && +error.response.status === 401) {
      handleRefetshToken();
      // return updateToken().then((token) => {

      // });
    }
    return Promise.reject(error);
  }
);

export default instance;
