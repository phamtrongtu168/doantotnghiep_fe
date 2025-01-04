import React from "react";

export default function PostPage3() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          Cách Lựa Chọn Nơi Ở Thích Hợp Cho Công Việc Và Sinh Sống
        </h1>
      </header>
      <main style={styles.content}>
        <p style={styles.paragraph}>
          Việc chọn nơi ở lý tưởng là một quyết định quan trọng, ảnh hưởng đến
          cả công việc và chất lượng cuộc sống. Dưới đây là các yếu tố cần cân
          nhắc:
        </p>
        <h2 style={styles.subtitle}>1. Vị trí địa lý</h2>
        <p style={styles.paragraph}>
          Hãy cân nhắc khoảng cách từ nơi ở đến nơi làm việc, các trung tâm
          thương mại và dịch vụ công cộng như trường học, bệnh viện, siêu thị.
          Điều này không chỉ giúp bạn tiết kiệm thời gian di chuyển mà còn cải
          thiện sự tiện nghi trong cuộc sống hàng ngày.
        </p>
        <h2 style={styles.subtitle}>2. Ngân sách và chi phí</h2>
        <p style={styles.paragraph}>
          Lập kế hoạch tài chính cụ thể trước khi chọn nơi ở. Hãy xác định ngân
          sách hàng tháng cho tiền thuê nhà, phí dịch vụ, điện nước và các chi
          phí sinh hoạt khác. Đừng quên dự trù các khoản chi phí phát sinh.
        </p>
        <h2 style={styles.subtitle}>3. Môi trường sống</h2>
        <p style={styles.paragraph}>
          Môi trường sống đóng vai trò quan trọng trong việc duy trì sức khỏe
          tinh thần và thể chất. Hãy chọn khu vực có không gian xanh, ít tiếng
          ồn và an ninh tốt. Việc sống trong một môi trường lành mạnh sẽ giúp
          bạn giảm căng thẳng sau những giờ làm việc căng thẳng.
        </p>
        <h2 style={styles.subtitle}>4. Tiện nghi và cơ sở hạ tầng</h2>
        <p style={styles.paragraph}>
          Các yếu tố như internet tốc độ cao, hệ thống giao thông thuận tiện,
          chỗ đậu xe và các tiện ích chung như phòng gym, hồ bơi sẽ nâng cao
          chất lượng cuộc sống. Đặc biệt, nếu bạn làm việc từ xa, một nơi ở có
          không gian làm việc thoải mái là rất quan trọng.
        </p>
        <h2 style={styles.subtitle}>5. Tìm kiếm và kiểm tra</h2>
        <p style={styles.paragraph}>
          Trước khi quyết định, hãy kiểm tra kỹ hợp đồng thuê nhà, các điều
          khoản bảo trì, và trò chuyện với hàng xóm để hiểu thêm về môi trường
          sống. Việc khảo sát thực tế sẽ giúp bạn tránh các rủi ro không đáng
          có.
        </p>
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 - Nền tảng giúp bạn tìm kiếm không gian sống lý tưởng.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: "20px",
    maxWidth: "800px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  content: {
    lineHeight: "1.6",
    color: "#555",
  },
  paragraph: {
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "10px",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "10px 0",
    borderTop: "1px solid #ccc",
  },
  footerText: {
    fontSize: "14px",
    color: "#777",
  },
};
