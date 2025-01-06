export const RENTAL_MANAGERMENT = [
  { id: 1, value: "active", name: "Hoạt động" },
  { id: 2, value: "pending", name: "Đang xử lý" },
  { id: 3, value: "completed", name: "Đã xử lý" },
  { id: 4, value: "cancelled", name: "Bị hủy bỏ" },
];

export const USER_ROLE = [
  { id: 1, value: "landlord", name: "Chủ nhà" },
  { id: 2, value: "tenant", name: "Người thuê" },
  { id: 3, value: "admin", name: "Quản trị viên" },
  { id: 4, value: "staff_repairer", name: "Nhân viên sửa chữa" },
  { id: 5, value: "staff_cleaner", name: "Nhân viên dọn dẹp" },
  { id: 6, value: "staff_movinger", name: "Nhân viên chuyển trọ" },
];

export const SERVICE_TYPE = [
  { id: 1, value: "cleaning", name: "Dọn dẹp" },
  { id: 2, value: "repair", name: "Sửa chữa" },
  { id: 3, value: "moving", name: "Chuyển trọ" },
];

export const STATUS_SERVICE = [
  { id: 1, value: "pending", name: "Đang chờ" },
  { id: 2, value: "", name: "Đang thực hiện" },
  { id: 3, value: "completed", name: "Đã hoàn thành" },
  { id: 4, value: "cancelled", name: "Đã hủy" },
];
