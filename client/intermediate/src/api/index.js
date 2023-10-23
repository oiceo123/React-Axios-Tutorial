import axios from "axios";

// Create Instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, // 5000ms => 5s
  /* withCredentials: true, */ // คำสั่งที่กำหนดให้ axios สามารถส่ง cookie ไปที่ server ได้
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // ทำการเซ็ต config บางอย่างก่อนที่จะส่ง request เช่น เซ็ต token ก่อนส่ง request
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
    // เมื่อการส่ง request มีข้อผิดพลาดจะเข้ามาทำงานตรงนี้
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // หากได้รับ status code ที่อยู่ในช่วง 2xx จะเข้ามาทำงานตรงนี้
    return response;
  },
  (error) => {
    // หากได้รับ error จาก response จะเข้ามาทำงานตรงนี้
    if (error.response && error.response.status === 401) {
      console.log("Unauthorize");
      return;
    }
    return Promise.reject(error);
  }
);

// Global axios
/* axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; */

export default instance;
