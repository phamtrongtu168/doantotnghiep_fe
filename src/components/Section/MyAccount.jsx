import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { getAllByLandlord, getAllByUser } from "../../services/api/RoomService";
import ModalAddRoom from "../Modal/ModalAddRoom";
import RoomCard from "../../ui/RoomCard";
import axios from "axios";
import axiosAuth from "../../utils/axiosAuth";

export function AccountMe() {
  const { authData, logout } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false),
    [isEditingEmail, setIsEditingEmail] = useState(false),
    [isEditingPhone, setIsEditingPhone] = useState(false),
    [isEditingDate, setIsEditingDate] = useState(false);

  const [name, setName] = useState(authData?.user?.name),
    [email, setEmail] = useState(authData?.user?.email),
    [phone, setPhone] = useState(authData?.user?.phone),
    [dateOfBirth, setDateOfBirth] = useState(authData?.user?.date_of_birth);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
  return (
    <>
      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Thông tin tài khoản
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Tên tài khoản
            </label>
            <div className="flex items-center gap-4">
              {isEditingName ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                />
              ) : (
                <p className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                  {name}
                </p>
              )}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsEditingName(!isEditingName)}
              >
                {isEditingName ? "Lưu" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center gap-4">
              {isEditingEmail ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                />
              ) : (
                <p className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                  {email}
                </p>
              )}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsEditingEmail(!isEditingEmail)}
              >
                {isEditingEmail ? "Lưu" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center gap-4">
              {isEditingPhone ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                />
              ) : (
                <p className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                  {phone}
                </p>
              )}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsEditingPhone(!isEditingPhone)}
              >
                {isEditingPhone ? "Lưu" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Ngày sinh
            </label>
            <div className="flex items-center gap-4">
              {isEditingDate ? (
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                />
              ) : (
                <p className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                  {dateOfBirth}
                </p>
              )}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsEditingDate(!isEditingDate)}
              >
                {isEditingDate ? "Lưu" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Vai trò
            </label>
            <p className="bg-gray-100 px-4 py-2 rounded-lg">
              {authData?.user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Đăng xuất
          </button>
        </form>
      </div>
    </>
  );
}

export function RoomMe() {
  const { data: roomsMe } = useQuery({
    queryKey: ["room-me"],
    queryFn: getAllByUser,
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600";
      case "unpaid":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  const getStatusLabel = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "unpaid":
        return "Chưa thanh toán";
      default:
        return "Chưa có hóa đơn";
    }
  };

  if (!roomsMe) return null;
  const handlePayment = async (transaction_id, totalBill) => {
    try {
      // Dữ liệu yêu cầu tạo thanh toán
      const requestData = {
        rental_bill_id: transaction_id, // ID hóa đơn
        amount: totalBill / 100, // Số tiền cần thanh toán
      };

      // Gửi yêu cầu tới backend
      const response = await axiosAuth.post(
        "http://127.0.0.1:8000/vnpay/create-payment",
        requestData
      );

      if (response.data && response.data.payment_url) {
        // Chuyển hướng người dùng tới URL thanh toán của VNPAY
        window.location.href = response.data.payment_url;
      } else {
        console.error("Không tìm thấy URL thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo yêu cầu thanh toán:", error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trọ của tôi</h2>
      {roomsMe.map((roomData, idx) => {
        const { room, rentalBills } = roomData;
        const rentalBill = rentalBills[0];
        return (
          <div key={idx} className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{`Tên phòng: ${room.name}`}</h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Địa chỉ", value: room.address },
                { label: "Giá thuê", value: `${roomData.rental_price} VNĐ` },
                {
                  label: "Ngày bắt đầu hợp đồng",
                  value: roomData?.start_date,
                },
                {
                  label: "Ngày kết thúc hợp đồng",
                  value: roomData?.end_date,
                },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
              {rentalBills &&
                rentalBills.length > 0 &&
                rentalBills.map((rentalBill, billIdx) => (
                  <div
                    key={billIdx}
                    className="p-4 bg-gray-100 rounded-lg mt-3"
                  >
                    <p className="text-gray-800">
                      <b>Trạng thái:</b>{" "}
                      <span
                        className={`font-semibold ${getStatusColor(
                          rentalBill.status
                        )}`}
                      >
                        {getStatusLabel(rentalBill.status)}
                      </span>
                    </p>
                    <div className="mt-3 space-y-2 text-gray-700">
                      <p>
                        Hóa đơn từ: {rentalBill.start_date} đến{" "}
                        {rentalBill.end_date}
                      </p>
                      <p>Tiền điện: {rentalBill.electricity_usage} kWh</p>
                      <p>Tiền nước: {rentalBill.water_usage} m³</p>
                      <p>Tiền phòng: {roomData.price} VNĐ</p>
                      <p>Tiền phòng: {rentalBill.transaction_id} VNĐ</p>

                      <p className="font-medium">
                        Tổng: {calculateTotal(room, rentalBill)} VNĐ
                      </p>
                      <button
                        onClick={() =>
                          handlePayment(
                            rentalBill.transaction_id,
                            calculateTotal(room, rentalBill)
                          )
                        }
                      >
                        Thanh toán
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RentalRooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: roomsLandlord } = useQuery({
    queryKey: ["roomsLandlord"],
    queryFn: () => getAllByLandlord(),
  });
  return (
    <div>
      <div className="flex justify-between">
        <h1>Phòng cho thuê</h1>
        <button
          className="bg-primary border-none cursor-pointer hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm phòng
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8 my-8">
        {roomsLandlord?.map((room, index) => (
          <RoomCard
            key={index}
            name={room?.name}
            link={`/room/${room?.id}`}
            image={room?.images[0]?.image_url}
            address={room?.address}
            price={room?.price}
            tenant={room?.rental_management[0]?.tenant?.name}
          />
        ))}
      </div>
      <ModalAddRoom
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Hàm tính tổng chi phí
function calculateTotal(room, rentalBill) {
  const electricityCost = rentalBill?.electricity_usage * room.electricity_rate;
  const waterCost = rentalBill?.water_usage * room.water_rate;
  const rent = parseFloat(room.price);
  return electricityCost + waterCost + rent;
}
