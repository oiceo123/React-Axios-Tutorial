import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    // get api key
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      config.headers["X-Api-Key"] = apiKey;
    }
    // get access token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorize");
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
