import React, { useState } from "react";
import UserManagement from "./../pages/User/UserManagement";
import ServiceRequestManagement from "./../pages/Service/ServiceRequestManagement";

function Dashboard() {
  // Trạng thái quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState("users");

  // Hàm hiển thị nội dung tương ứng
  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "service-requests":
        return <ServiceRequestManagement />;
      default:
        return <div>Vui lòng chọn một mục từ sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-100 text-white w-64 flex flex-col">
        <div className="p-4 font-bold text-lg bg-gray-400 text-center">
          Trang quản lý
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`block w-full text-left border-none p-2 ${
                  activeTab === "users" ? "bg-gray-300" : "hover:bg-gray-500"
                }`}
              >
                Quản lý người dùng
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("service-requests")}
                className={`block w-full text-left border-none  p-2 ${
                  activeTab === "service-requests"
                    ? "bg-gray-300"
                    : "hover:bg-gray-500"
                }`}
              >
                Quản lý yêu cầu dịch vụ
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
