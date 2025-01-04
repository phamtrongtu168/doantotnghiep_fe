import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { getAllByLandlord, getAllByUser } from "../../services/api/RoomService";
import ModalAddRoom from "../Modal/ModalAddRoom";
import RoomCard from "../../ui/RoomCard";
import moment from "moment";
import { getAll as getAllBill } from "../../services/api/BillService";
import { useLocation, useNavigate } from "react-router-dom";
import axiosAuth from "../../utils/axiosAuth";
import { TaskCard } from "../../ui/TaskCard";
import { getAll as getAllServiceRequest } from "../../services/api/ServiceRequestService";
import ModalConfirm from "../Modal/ModalConfirm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BillService,
  RentalManagementService,
  ServiceRequestService,
} from "../../services/api";
import { CiEdit } from "react-icons/ci";
import { RENTAL_MANAGERMENT } from "../../common";

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

  const handlePayment = async (transaction_id, totalBill) => {
    try {
      // Dữ liệu yêu cầu tạo thanh toán
      const requestData = {
        transaction_id: transaction_id, // ID hóa đơn
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

  if (!roomsMe) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trọ của tôi</h2>
      {roomsMe.map((roomData, idx) => {
        const { room, rentalBills } = roomData;

        return (
          <div key={idx} className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{`Tên phòng: ${room.name}`}</h3>
            <div className="mt-4 space-y-3">
              {[{ label: "Địa chỉ", value: room.address }].map(
                ({ label, value }, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-medium text-gray-600">{label}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                )
              )}
              {[
                {
                  label: "Giá thuê",
                  value: roomData.rental_price ? room.price : 0,
                },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
              {[
                { label: "Ngày bắt đầu hợp đồng", value: roomData.start_date },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
              {[
                { label: "Ngày kết thúc hợp đồng", value: roomData.end_date },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
              {rentalBills &&
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
                      <p>Tiền phòng: {rentalBill.transaction_id} VNĐ</p>
                      <p className="font-medium">
                        Tổng: {calculateTotal(room, rentalBill)} VNĐ
                      </p>
                      {rentalBill.status !== "paid" && (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-sm shadow-md hover:bg-blue-600 active:scale-95 transition-transform"
                          onClick={() =>
                            handlePayment(
                              rentalBill.transaction_id,
                              calculateTotal(room, rentalBill)
                            )
                          }
                        >
                          Thanh toán
                        </button>
                      )}
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
export function RentalManagement() {
  const navigate = useNavigate();
  const [itemUpdate, setItemUpdate] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { data: roomsLandlord = [], refetch } = useQuery({
    queryKey: ["roomsLandlord"],
    queryFn: () => getAllByLandlord(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await RentalManagementService.update(
        itemUpdate?.rental_management[0]?.id,
        data
      );
      toast.success("Sửa hợp đồng thành công");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleItemUpdate = (item) => {
    setIsModal(true);
    setItemUpdate(item);
    setValue("rental_price", item.price);
    setValue("start_date", item?.rental_management[0]?.start_date);
    setValue("end_date", item?.rental_management[0]?.end_date);
    setValue("status", item.rental_management[0]?.status);
  };
  const formatCurrency = (value) => {
    return value
      ? new Intl.NumberFormat("vi-VN").format(value) + "đ"
      : "Chưa có giá";
  };

  const formatDateRange = (start, end) =>
    start && end
      ? `${moment(start).format("DD/MM/YYYY")} đến ${moment(end).format(
          "DD/MM/YYYY"
        )}`
      : "Chưa có ngày";

  const filteredRooms = roomsLandlord.filter(
    (room) => room?.rental_management?.length > 0
  );

  const handleBill = (roomId) => {
    navigate(`/my-account?position=5&roomId=${roomId}`);
  };
  const handleConfirmation = async (roomId) => {
    try {
      const res = await RentalManagementService.updateConfirm(roomId);
      console.log(res);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Quản lý cho thuê</h1>
      <div className="flex flex-col gap-4 mt-4">
        {filteredRooms?.map((room, index) => (
          <div key={index} className="relative">
            <h3 className="font-normal">
              Phòng: {room.name || `Phòng ${index + 1}`}
            </h3>
            <button
              className="absolute top-4 right-4 flex p-0.5 cursor-pointer"
              onClick={() => handleItemUpdate(room)}
            >
              <CiEdit />
            </button>
            <div className="w-1/2 border-2 border-solid border-zinc-400 p-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  Giá:{" "}
                  <span>
                    {formatCurrency(
                      room?.rental_management?.rental_price || room.price
                    )}
                  </span>
                </p>
                <p>
                  Người thuê hiện tại:{" "}
                  <span>
                    {room?.rental_management[0]?.tenant?.name ||
                      "Chưa có người thuê"}
                  </span>
                </p>
                <p>
                  Địa chỉ: <span>{room.address || "Chưa có địa chỉ"}</span>
                </p>
                <p>
                  Số điện thoại:{" "}
                  <span>
                    {room?.rental_management[0]?.tenant?.phone ||
                      "Chưa có số điện thoại"}
                  </span>
                </p>
                <p>
                  Hợp đồng từ:{" "}
                  <span>
                    {formatDateRange(
                      room?.rental_management[0]?.start_date,
                      room?.rental_management[0]?.end_date
                    )}
                  </span>
                </p>
                <p>
                  Trạng thái:{" "}
                  <span>
                    {room?.rental_management[0]?.status === "active"
                      ? "Đang cho thuê"
                      : room?.rental_management[0]?.status === "pending"
                      ? "Chờ xử lý"
                      : room?.rental_management[0]?.status === "completed"
                      ? "Đã hoàn thành"
                      : "Chưa có trạng thái"}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                {room?.rental_management[0]?.status === "pending" && (
                  <button
                    onClick={() =>
                      handleConfirmation(room?.rental_management[0]?.id)
                    }
                    className=" cursor-pointer text-black border-spacing-1 p-2.5 font-bold rounded mt-4 mr-auto block"
                  >
                    Xác nhận cho thuê
                  </button>
                )}
                <button
                  onClick={() => handleBill(room?.id)}
                  className="bg-primary cursor-pointer text-white border-none p-2.5 font-bold rounded mt-4 ml-auto block"
                >
                  Hóa đơn thanh toán
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalConfirm
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        title={"Sửa hợp đồng"}
        children={
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 grid grid-cols-1 gap-4"
            >
              <label>
                <b className="text-sm">Giá</b>
                <input
                  placeholder="Giá"
                  {...register("rental_price")}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </label>
              <label>
                <b className="text-sm">Ngày bắt đầu</b>
                <input
                  type="date"
                  placeholder="Ngày bắt đầu"
                  {...register("start_date")}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </label>
              <label>
                <b className="text-sm">Ngày kết thúc</b>
                <input
                  type="date"
                  placeholder="Ngày kết thúc"
                  {...register("end_date")}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </label>
              <label>
                <b className="text-sm">Trạng thái</b>
                <select
                  {...register("status")}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                >
                  <option value="">-- Trạng thái --</option>
                  {RENTAL_MANAGERMENT?.map((item, index) => (
                    <option key={index} value={item?.value}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="p-2.5 bg-primary border-none text-white rounded cursor-pointer font-bold"
              >
                Lưu thay đổi
              </button>
            </form>
          </>
        }
      />
    </div>
  );
}
export function BillManagement() {
  const [isModal, setIsModal] = useState(false);
  const location = useLocation(); // Lấy thông tin URL hiện tại
  const searchParams = new URLSearchParams(location.search); // Phân tích query string
  const roomId = searchParams.get("roomId");
  const { data: billLandlords, refetch } = useQuery({
    queryKey: ["bill-landlords"],
    queryFn: () => getAllBill(roomId),
    refetchOnMount: true,
  });
  const { data: roomsLandlord = [] } = useQuery({
    queryKey: ["roomsLandlord"],
    queryFn: () => getAllByLandlord(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const targetRoom = roomsLandlord.find((room) => room.id == roomId);
  console.log(targetRoom);
  const onSubmit = async (data) => {
    try {
      await BillService.create(data);
      reset();
      refetch();
      toast.success("Thêm hóa đơn thành công");
    } catch (error) {
      console.log(error);
    }
  };

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
      default:
        return "Chưa thanh toán";
    }
  };
  // if (!billLandlords) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-zinc-600">{`Hóa đơn thanh toán phòng: ${billLandlords?.room?.name}`}</h3>
          <button
            onClick={() => setIsModal(true)}
            className="bg-primary cursor-pointer font-bold text-white rounded-lg px-4 py-2.5 mt-4 border-none"
          >
            Thêm hóa đơn
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {billLandlords?.bills?.map((rentalBill, billIdx) => (
            <div key={billIdx} className="p-4 bg-gray-100 rounded-lg mt-3">
              <p className="text-gray-800">
                <b>Trạng thái:</b>{" "}
                <span
                  className={`font-semibold ${getStatusColor(
                    rentalBill?.status
                  )}`}
                >
                  {getStatusLabel(rentalBill?.status)}
                </span>
              </p>
              <div className="mt-3 space-y-2 text-gray-700">
                <p>
                  Hóa đơn từ: {rentalBill?.start_date} đến{" "}
                  {rentalBill?.end_date}
                </p>
                <p>Tiền điện: {rentalBill?.electricity_usage} kWh</p>
                <p>Tiền nước: {rentalBill?.water_usage} m³</p>
                <p>Tiền phòng: {billLandlords?.room?.price} VNĐ</p>
                <p className="font-medium">
                  Tổng: {calculateTotal(billLandlords?.room, rentalBill)} VNĐ
                </p>
              </div>
            </div>
          ))}
        </div>
        <ModalConfirm
          isOpen={isModal}
          onClose={() => setIsModal(false)}
          title={"Hóa đơn"}
          children={
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 grid grid-cols-1 gap-4"
              >
                <input
                  type="hidden"
                  {...register("rental_id")}
                  value={targetRoom?.rental_management[0]?.id}
                />{" "}
                {/* <label>
                  <b className="text-sm">Chọn phòng đã thuê</b>
                  <select
                    {...register("rental_id")}
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  >
                    <option value="">-- Chọn phòng đã thuê --</option>
                    {roomsLandlord?.map((room, index) => (
                      <option key={index} value={room?.id}>
                        {room?.name}
                      </option>
                    ))}
                  </select>
                </label> */}
                <label>
                  <b className="text-sm">Ngày bắt đầu</b>
                  <input
                    type="date"
                    placeholder="Ngày bắt đầu"
                    {...register("start_date")}
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  />
                </label>
                <label>
                  <b className="text-sm">Ngày kết thúc</b>
                  <input
                    type="date"
                    placeholder="Ngày kết thúc"
                    {...register("end_date")}
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  />
                </label>
                <label>
                  <b className="text-sm">Số điện sử dụng</b>
                  <input
                    type="number"
                    placeholder="Số điện sử dụng"
                    {...register("electricity_usage")}
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  />
                </label>
                <label>
                  <b className="text-sm">Số nước sử dụng</b>
                  <input
                    type="number"
                    placeholder="Số nước sử dụng"
                    {...register("water_usage")}
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="p-2.5 bg-primary border-none text-white rounded cursor-pointer font-bold"
                >
                  Thêm hóa đơn
                </button>
              </form>
            </>
          }
        />
      </div>
    </div>
  );
}

export function TaskList() {
  const { data: tasks, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllServiceRequest,
  });
  const handleConfirm = async (id) => {
    try {
      const res = await ServiceRequestService.updateConfirm(id);
      console.log(res);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {tasks?.map((task, index) => (
        <TaskCard
          key={index}
          taskId={task?.id}
          room={task?.room}
          service={task?.service}
          address={task?.address}
          movingFrom={task?.moving_from}
          movingTo={task?.moving_to}
          requestDate={task?.request_date}
          user={task?.user}
          status={task?.status}
          vchildren={
            <>
              <button
                onClick={() => handleConfirm(task?.id)}
                className="border-none p-2 rounded bg-zinc-100 text-black"
              >
                Đã hoàn thành
              </button>
            </>
          }
        />
      ))}
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
