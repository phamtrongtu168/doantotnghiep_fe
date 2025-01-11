import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService, UserService } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const ModalMenuSignStaff = ({ isOpen, typeModal, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
    reset: resetForm1,
  } = useForm();

  const [typeModalSign, setTypeModalSign] = useState(0);
  useEffect(() => {
    setTypeModalSign(typeModal);
  }, [typeModal]);

  const onSubmitForm1 = async (data) => {
    try {
      const payload = {
        ...data,
        role: data.role.trim(), // Đảm bảo loại bỏ khoảng trắng
      };
      await UserService.register(payload);
      resetForm1();
      onClose();
      toast.success("Thêm tài khoản thành công!");
    } catch (error) {
      console.error("Error during registration:", error.response.data);
      toast.error("Đăng ký thất bại: " + error.response.data.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="min-w-[28rem] w-max" onClick={(e) => e.stopPropagation()}>
        {typeModalSign == 1 && (
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-center mb-8 font-normal text-zinc-500">
              Đăng ký
            </h2>
            <form
              onSubmit={handleSubmitForm1(onSubmitForm1)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="">
                <input
                  {...registerForm1("name", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="text"
                  placeholder="Tên"
                />
                {errorsForm1 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm1?.name?.message}
                  </small>
                )}
              </label>
              <label htmlFor="">
                <input
                  {...registerForm1("email", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="text"
                  placeholder="Email"
                />
                {errorsForm1 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm1?.email?.message}
                  </small>
                )}
              </label>
              <label htmlFor="">
                <input
                  {...registerForm1("password", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="password"
                  placeholder="Mật Khẩu"
                />
                {errorsForm1 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm1?.password?.message}
                  </small>
                )}
              </label>
              <label htmlFor="">
                <input
                  {...registerForm1("password_confirmation", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="password"
                  placeholder="Xác Nhận Mật Khẩu"
                />
                {errorsForm1 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm1?.password_confirmation?.message}
                  </small>
                )}
              </label>
              <div className="flex gap-4 text-zinc-600">
                <span>Vai trò</span>
                <label className="flex gap-2">
                  <input
                    value="staff_cleaner"
                    type="radio"
                    {...registerForm1("role", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  Nhân viên vệ sinh
                </label>
                <label className="flex gap-2">
                  <input
                    value="staff_movinger"
                    type="radio"
                    {...registerForm1("role", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  Nhân viên chuyển nhà
                </label>
                <label className="flex gap-2">
                  <input
                    value="staff_repairer"
                    type="radio"
                    {...registerForm1("role", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  Nhân viên sửa chữa
                </label>
              </div>
              {errorsForm1 && (
                <small className="text-red-500 block mt-2">
                  {errorsForm1?.role?.message}
                </small>
              )}
              <button className="cursor-pointer p-2.5 bg-primary text-white rounded-md border-none font-bold text-base">
                Thêm tài khoản
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMenuSignStaff;
