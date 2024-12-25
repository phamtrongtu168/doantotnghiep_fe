import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
// Hàm lấy thông tin người dùng từ localStorage
const getUserFromLocalStorage = () => {
  const authData = JSON.parse(localStorage.getItem("authData") || "null");
  if (!authData || !authData.token) return {};
  try {
    const { token, user } = authData;
    return { token, user };
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};
export const useAuth = () => {
  const [authData, setAuthData] = useState(getUserFromLocalStorage);
  // Hàm cập nhật thông tin tài khoản dựa trên sự kiện
  const handleAccountChange = useCallback(() => {
    const newAccount = getUserFromLocalStorage();
    setAuthData(newAccount);
  }, []);
  useEffect(() => {
    window.addEventListener("accountChange", handleAccountChange);
    window.addEventListener("storage", (event) => {
      if (event.key === "authData") {
        handleAccountChange();
      }
    });
    return () => {
      window.removeEventListener("accountChange", handleAccountChange);
      window.removeEventListener("storage", handleAccountChange);
    };
  }, [handleAccountChange]);
  const dispatchAccountChangeEvent = () => {
    const event = new CustomEvent("accountChange");
    window.dispatchEvent(event);
  };
  const login = useCallback(() => {
    dispatchAccountChangeEvent();
    setAuthData(getUserFromLocalStorage());
    toast.success("Đăng nhập thành công!");
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("authData");
    dispatchAccountChangeEvent();
    setAuthData({});
    toast.success("Đã đăng xuất tài khoản!");
  }, []);
  const updateAccount = useCallback((updatedInfo) => {
    const currentUser = JSON.parse(localStorage.getItem("authData") || "{}");
    const newUser = { ...currentUser, ...updatedInfo };
    localStorage.setItem("authData", JSON.stringify(newUser));
    dispatchAccountChangeEvent();
    setAuthData(getUserFromLocalStorage());
  }, []);
  return { authData, login, logout, updateAccount };
};
