import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/api/UserService";
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Quản lý người dùng
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-medium">
              <tr>
                <th className="px-6 py-4 border border-gray-300">ID</th>
                <th className="px-6 py-4 border border-gray-300">Tên</th>
                <th className="px-6 py-4 border border-gray-300">Email</th>
                <th className="px-6 py-4 border border-gray-300">Vai trò</th>
                <th className="px-6 py-4 border border-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-6 py-4 border border-gray-300">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      <button className="text-sm px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100">
                        Sửa thông tin{" "}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 border border-gray-300"
                  >
                    Không có dữ liệu người dùng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
