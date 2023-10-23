import axios from "axios";

// Create Instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, // 5000ms => 5s
  /* withCredentials: true, */ // คำสั่งที่กำหนดให้ axios สามารถส่ง cookie ไปที่ server ได้
});

// เพิ่ม request interceptor
instance.interceptors.request.use(
  (config) => {
    // ทำการเซ็ต config บางอย่างก่อนที่จะส่ง request เช่น เซ็ต token ก่อนส่ง request
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      config.headers["X-Api-Key"] = apiKey; // ส่งไปใน header ในชื่อ X-Api-Key
    }
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;// ส่งไปใน header ในชื่อ Authorization
    }
    return config;
  },
  (error) => {
    // เมื่อการส่ง request มีข้อผิดพลาดจะเข้ามาทำงานตรงนี้
    return Promise.reject(error);
  }
);

// เพิ่ม response interceptor
instance.interceptors.response.use(
  (response) => {
    // หากได้รับ status code ที่อยู่ในช่วง 2xx จะเข้ามาทำงานตรงนี้
    return response;
  },
  (error) => {
    // หากได้รับ status code ที่ไม่ได้อยู่ในช่วง 2xx จะเข้ามาทำงานตรงนี้
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
