import React, { useEffect } from "react";
import TheExistRoom from "../../components/Section/TheExistRoom";
import Supplement from "../../components/Section/Supplement";
import TipsToStay from "../../components/Section/TipsToStay";
import BannerHomeSilder from "../../components/Section/BannerHomeSilder";
import AboutUs from "../../components/Section/AboutUs";
import axiosAuth from "../../utils/axiosAuth";

function HomePage() {
  useEffect(() => {
    // Kiểm tra xem có chạy trong trình duyệt không
    if (typeof window !== "undefined") {
      // Lấy tham số từ URL
      const params = new URLSearchParams(window.location.search);
      const transactionStatus = params.get("vnp_TransactionStatus");
      const responseCode = params.get("vnp_ResponseCode");
      const transactionId = params.get("vnp_TxnRef");

      if (transactionStatus && responseCode && transactionId) {
        // Gửi yêu cầu xác nhận thanh toán tới backend
        handlePaymentReturn(transactionId, transactionStatus, responseCode);
      }
    }
  }, []);

  const handlePaymentReturn = async (
    transactionId,
    transactionStatus,
    responseCode
  ) => {
    try {
      if (transactionStatus === "00" && responseCode === "00") {
        const response = await axiosAuth.get(
          "http://127.0.0.1:8000/vnpay/return",
          {
            params: {
              transaction_id: transactionId,
            },
          }
        );

        if (response.data.success) {
          alert("Thanh toán thành công!");
          // Thực hiện reload dữ liệu hoặc cập nhật giao diện nếu cần
          window.location.reload();
        } else {
          alert("Có lỗi khi cập nhật trạng thái thanh toán. Vui lòng thử lại.");
        }
      } else {
        alert("Thanh toán thất bại.");
      }

      // Xóa các tham số khỏi URL sau khi xử lý
      window.history.replaceState(null, "", window.location.pathname);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu tới server:", error);
    }
  };

  return (
    <div className="px-12">
      <BannerHomeSilder />
      <TheExistRoom />
      <Supplement />
      <TipsToStay />
      <AboutUs />
    </div>
  );
}

export default HomePage;
