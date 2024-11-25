
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;
const axiosPublic = axios.create({
  baseURL: `${apiUrl}/`,
});

axiosPublic.interceptors.request.use(
  (config) => {
    // Hiển thị toast loading nếu cần
    config.toastId = toast.loading('Đang xử lý...', {closeButton: true});
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    // Tắt toast loading khi thành công
    toast.dismiss(response.config.toastId);
    return response;
  },
  (error) => {
    // Tắt toast loading khi gặp lỗi
    toast.dismiss(error.config.toastId);

    if (error.code === 'ERR_NETWORK') {
      toast.error('Máy chủ đang gặp sự cố!');
    } else if (error.response) {
      // Tùy chỉnh theo từng mã lỗi cụ thể từ server
      const statusCode = error.response.status;
      const errorMsg = `Lỗi từ server: ${statusCode} - ${error.response.statusText}`;

      if (statusCode >= 500) {
        toast.error('Lỗi server, vui lòng thử lại sau!');
      } else if (statusCode === 404) {
        toast.error('Không tìm thấy tài nguyên yêu cầu.');
      } else if (statusCode === 403) {
        toast.error('Bạn không có quyền thực hiện hành động này.');
      } else {
        toast.error(errorMsg);
      }
    } else {
      toast.error('Đã xảy ra lỗi không xác định.');
    }

    return Promise.reject(error);
  }
);

export default axiosPublic;
