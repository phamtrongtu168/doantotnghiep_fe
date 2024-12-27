import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { getAllByUser } from "../../services/api/RoomService";

export function AccountMe() {
  const { authData } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false),
    [isEditingEmail, setIsEditingEmail] = useState(false),
    [isEditingPhone, setIsEditingPhone] = useState(false),
    [isEditingDate, setIsEditingDate] = useState(false);

  const [name, setName] = useState(authData?.user?.name),
    [email, setEmail] = useState(authData?.user?.email),
    [phone, setPhone] = useState(authData?.user?.phone),
    [dateOfBirth, setDateOfBirth] = useState(authData?.user?.date_of_birth);
  return (
    <>
      <h2 className="mb-8 text-zinc-600">Thông tin</h2>
      <form className="w-1/2">
        <b className="text-zinc-600">Tên tài khoản</b>
        <div className="my-2 flex gap-2 items-center">
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2.5 rounded w-full outline-none"
            />
          ) : (
            <p className="w-full py-2">{name}</p>
          )}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsEditingName(!isEditingName)}
          >
            {isEditingName ? "Save" : "Edit"}
          </span>
        </div>

        <b className="text-zinc-600">Email</b>
        <div className="my-2 flex gap-2 items-center">
          {isEditingEmail ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2.5 rounded w-full outline-none"
            />
          ) : (
            <p className="w-full py-2">{email}</p>
          )}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsEditingEmail(!isEditingEmail)}
          >
            {isEditingEmail ? "Save" : "Edit"}
          </span>
        </div>

        <b className="text-zinc-600">Số điện thoại</b>
        <div className="my-2 flex gap-2 items-center">
          {isEditingPhone ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2.5 rounded w-full outline-none"
            />
          ) : (
            <p className="w-full py-2">{phone}</p>
          )}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsEditingPhone(!isEditingPhone)}
          >
            {isEditingPhone ? "Save" : "Edit"}
          </span>
        </div>

        <b className="text-zinc-600">Ngày sinh</b>
        <div className="my-2 flex gap-2 items-center">
          {isEditingDate ? (
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="border p-2.5 rounded w-full outline-none"
            />
          ) : (
            <p className="w-full py-2">{dateOfBirth}</p>
          )}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setIsEditingDate(!isEditingDate)}
          >
            {isEditingDate ? "Save" : "Edit"}
          </span>
        </div>
        <b className="text-zinc-600">Vai trò</b>
        <div>
          <p className="py-2">{authData?.user?.role}</p>
        </div>
      </form>
    </>
  );
}

export function RoomMe() {
  const { data: roomsMe } = useQuery({
    queryKey: ["room-me"],
    queryFn: () => getAllByUser(),
  });

  if (!roomsMe) {
    return null;
  }

  return (
    <>
      <h2 className="mb-8 text-zinc-600">Trọ của tôi</h2>
      {roomsMe.map((roomData, index) => {
        const rentalManager = roomData;
        const room = roomData.room;
        const rentalBill = roomData.rentalBills[0]; // Giả sử chỉ lấy hóa đơn đầu tiên

        return (
          <div key={index} className="mb-8">
            <h3 className="uppercase">{`Tên phòng: ${room.name}`}</h3>
            <div className="flex flex-col gap-2 my-4">
              <div className="flex gap-4">
                <b>Địa chỉ:</b>
                <p className="text-zinc-600">{room.address}</p>
              </div>
              <div className="flex gap-4">
                <b>Giá thuê:</b>
                <p className="text-zinc-600">{room.price} VNĐ</p>
              </div>
              <div className="flex gap-4">
                <b>Ngày bắt đầu hợp đồng:</b>
                <p className="text-zinc-600">{rentalManager?.start_date}</p>
              </div>
              <div className="flex gap-4">
                <b>Ngày kết thúc hợp đồng:</b>
                <p className="text-zinc-600">{rentalManager?.end_date}</p>
              </div>
              <div className="flex flex-col gap-4 bg-zinc-200 w-1/2 p-2 rounded">
                <strong>
                  Chi phí từ: {rentalBill?.start_date} đến{" "}
                  {rentalBill?.end_date}
                </strong>
                <strong>Tiền điện: {rentalBill?.electricity_usage} kWh</strong>
                <strong>Tiền nước: {rentalBill?.water_usage} m³</strong>
                <strong>Tiền phòng: {room.price} VNĐ</strong>
                <strong>Tổng: {calculateTotal(room, rentalBill)} VNĐ</strong>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

// Hàm tính tổng chi phí
function calculateTotal(room, rentalBill) {
  const electricityCost = rentalBill?.electricity_usage * room.electricity_rate;
  const waterCost = rentalBill?.water_usage * room.water_rate;
  const rent = parseFloat(room.price);
  return electricityCost + waterCost + rent;
}
