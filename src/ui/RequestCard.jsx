import React, { useState } from "react";
export const RequestCard = ({
  room,
  service,
  address,
  movingTo,
  movingFrom,
  serviceDate,
  status,
  children,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-6 py-4">
        {room?.name && (
          <p className="text-gray-700 text-base">Phòng: {room?.name}</p>
        )}
        <p className="text-gray-700 text-base">
          Tên dịch vụ: {service?.service_name}
        </p>
        <p className="text-gray-700 text-base">Địa chỉ: {room?.address}</p>
        <p className="text-gray-700 text-base">{address}</p>
        {movingTo && (
          <p className="text-gray-700 text-base">Chuyển từ: {movingTo}</p>
        )}
        {movingFrom && (
          <p className="text-gray-700 text-base">Chuyển đến: {movingFrom}</p>
        )}
        <p className="text-gray-700 text-base">Ngày yêu cầu: {serviceDate}</p>
        <div className="text-gray-700 text-base">
          <label htmlFor="status">Trạng thái: {status}</label>
        </div>
        {children}{" "}
      </div>
    </div>
  );
};
