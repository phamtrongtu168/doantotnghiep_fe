import React, { useEffect, useState } from "react";
import { get } from "../../services/api/ServiceRequestService";
import { assignTask } from "../../services/api/ServiceRequestService"; // Hàm API giao nhiệm vụ
import { getAllUsers } from "../../services/api/UserService"; // Hàm API lấy danh sách nhân viên
import { toast } from "react-toastify";

function ServiceRequestManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở/đóng Modal
  const [selectedRequest, setSelectedRequest] = useState(null); // Yêu cầu được chọn
  const [users, setUsers] = useState([]); // Danh sách nhân viên
  const [selectedUser, setSelectedUser] = useState(null); // Nhân viên được chọn

  // Fetch dữ liệu yêu cầu dịch vụ
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const data = await get();
      if (data) {
        setRequests(data);
      }
      setLoading(false);
    };

    fetchRequests();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAllUsers();
      if (data) {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);
  // Xử lý giao nhiệm vụ
  const handleAssignTask = async (requestId, staffId) => {
    try {
      const response = await assignTask(requestId, staffId);
      console.log(response);
      toast.success("Giao nhiệm vụ thành công");
    } catch (error) {
      console.error(error);
      toast.error("Giao nhiệm vụ thất bại");
    }
  };
  const handleSave = (staffId) => {
    setSelectedUser(staffId);
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý yêu cầu dịch vụ</h2>
      </div>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">
                Người yêu cầu
              </th>
              <th className="border border-gray-300 px-4 py-2">Loại dịch vụ</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
              <th className="border border-gray-300 px-4 py-2">Ngày yêu cầu</th>
              <th className="border border-gray-300 px-4 py-2">
                Nhân viên phụ trách
              </th>
              <th className="border border-gray-300 px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50"
                  onClick={() => setSelectedRequest(request)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.user?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.service?.service_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* if pending display Chờ xử lý */}
                    {request?.status === "pending"
                      ? "Chờ xử lý"
                      : request?.status === "approved"
                      ? "Đã giao"
                      : request?.status === "completed"
                      ? "Đã hoàn thành"
                      : "Đã hủy"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.service_date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.staff?.name || "Chưa phân công"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {request?.status === "pending" && (
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Giao nhiệm vụ
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  Không có dữ liệu yêu cầu dịch vụ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal Giao Nhiệm Vụ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">Giao nhiệm vụ</h3>
            <p className="mb-4">
              Yêu cầu dịch vụ:{" "}
              <span className="font-semibold">{selectedRequest?.id}</span>
            </p>
            <label className="block mb-4">
              Chọn nhân viên:
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                onChange={(e) => handleSave(e.target.value)}
              >
                <option value="">-- Chọn nhân viên --</option>
                {selectedRequest?.service?.service_type === "moving"
                  ? users
                      .filter((staff) => staff.role === "staff_movinger")
                      .map((staff, index) => (
                        <option key={index} value={staff.id}>
                          {staff.name} - ({staff.role})
                        </option>
                      ))
                  : selectedRequest?.service?.service_type === "cleaning"
                  ? users
                      .filter((staff) => staff.role === "staff_cleaner")
                      .map((staff, index) => (
                        <option key={index} value={staff.id}>
                          {staff.name} - ({staff.role})
                        </option>
                      ))
                  : users
                      .filter((staff) => staff.role === "staff_repairer")
                      .map((staff, index) => (
                        <option key={index} value={staff.id}>
                          {staff.name} - ({staff.role})
                        </option>
                      ))}
              </select>
            </label>
            <div className="flex justify-end">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  handleAssignTask(selectedRequest?.id, selectedUser)
                }
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceRequestManagement;
