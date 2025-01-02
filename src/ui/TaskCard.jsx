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
}) => {
  const [taskStatus, setTaskStatus] = useState(status);
  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Nhiệm vụ: {taskId}</div>
        <p className="text-gray-700 text-base">Phòng: {room.name}</p>
        <p className="text-gray-700 text-base">Người yêu cầu: {user.name}</p>
        <p className="text-gray-700 text-base">
          Tên dịch vụ: {service.service_name}
        </p>
        <p className="text-gray-700 text-base">Địa chỉ phòng: {room.address}</p>
        <p className="text-gray-700 text-base">{address}</p>
        <p className="text-gray-700 text-base">Chuyển từ: {movingTo}</p>
        <p className="text-gray-700 text-base">Chuyển đến: {movingFrom}</p>
        <p className="text-gray-700 text-base">Ngày yêu cầu: {requestDate}</p>
        <div className="text-gray-700 text-base">
          <label htmlFor="status">Trạng thái: </label>
          <select
            id="status"
            value={taskStatus}
            onChange={handleStatusChange}
            className={`border p-2 rounded cursor-pointer`}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
