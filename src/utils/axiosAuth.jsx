import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosAuth = axios.create({
  baseURL: `${apiUrl}/api/auth`,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const accessToken = authData ? authData.token : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Lỗi 401: Unauthorized");
      localStorage.removeItem("authData");
      toast.warning("Đã hết phiên đăng nhập");
    } else if (error.code === "ERR_NETWORK") {
      toast.error("Máy chủ đang gặp sự cố !");
    }
    return Promise.reject(error);
  }
);

export default axiosAuth;
