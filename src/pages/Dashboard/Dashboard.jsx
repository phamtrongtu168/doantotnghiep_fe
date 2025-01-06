import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import ServiceRequestManagement from "./pages/ServiceRequestManagement";

function Dashboard() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-300 text-white w-64 flex flex-col">
          <div className="p-4 font-bold text-lg bg-gray-300 text-center">
            Trang quản lý
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/users"
                  className="block p-2 rounded hover:bg-gray-400"
                >
                  Quản lý người dùng
                </Link>
              </li>
              <li>
                <Link
                  to="/service-requests"
                  className="block p-2 rounded hover:bg-gray-400"
                >
                  Quản lý yêu cầu dịch vụ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route
              path="/service-requests"
              element={<ServiceRequestManagement />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
