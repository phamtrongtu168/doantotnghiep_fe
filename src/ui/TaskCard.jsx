import React, { useState } from "react";
export const TaskCard = ({
  room,
  taskId,
  service,
  address,
  user,
  movingTo,
  movingFrom,
  requestDate,
  status,
  children,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Nhiệm vụ: {taskId}</div>
        <p className="text-gray-700 text-base">Phòng: {room?.name}</p>
        <p className="text-gray-700 text-base">Người yêu cầu: {user?.name}</p>
        <p className="text-gray-700 text-base">
          Tên dịch vụ: {service?.service_name}
        </p>
        <p className="text-gray-700 text-base">
          Địa chỉ phòng: {room?.address}
        </p>
        <p className="text-gray-700 text-base">{address}</p>
        <p className="text-gray-700 text-base">Chuyển từ: {movingTo}</p>
        <p className="text-gray-700 text-base">Chuyển đến: {movingFrom}</p>
        <p className="text-gray-700 text-base">Ngày yêu cầu: {requestDate}</p>
        <div className="text-gray-700 text-base">
          <label htmlFor="status">Trạng thái: {status}</label>
        </div>
        {status === "pending" && children}
      </div>
    </div>
  );
};
