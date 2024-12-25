import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService, UserService } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const ModalMenuSign = ({ isOpen, typeModal, onClose }) => {
  const { login } = useAuth();
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
    reset: resetForm1,
  } = useForm();
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
    reset: resetForm2,
  } = useForm();
  const [typeModalSign, setTypeModalSign] = useState(0);
  useEffect(() => {
    setTypeModalSign(typeModal);
  }, [typeModal]);

  const onSubmitForm1 = async (data) => {
    console.log("Form 1 Data:", data);
    try {
      await UserService.register(data);
      resetForm1();
      onClose();
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  // Xử lý submit form 2
  const onSubmitForm2 = async (data) => {
    console.log("Form 2 Data:", data);
    try {
      const response = await AuthService.login(data);
      const authData = {
        user: response.user,
        token: response.token,
      };
      localStorage.setItem("authData", JSON.stringify(authData));
      resetForm2();
      onClose();
      login();
    } catch (error) {
      console.log(error);
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
                  type="text"
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
                  type="text"
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
                    value="user"
                    type="radio"
                    {...registerForm1("role", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  Khách thuê
                </label>
                <label className="flex gap-2">
                  <input
                    value="landlord"
                    type="radio"
                    {...registerForm1("role", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  Chủ trọ
                </label>
              </div>
              {errorsForm1 && (
                <small className="text-red-500 block mt-2">
                  {errorsForm1?.role?.message}
                </small>
              )}
              <button className="cursor-pointer p-2.5 bg-primary text-white rounded-md border-none font-bold text-base">
                Đăng ký
              </button>
            </form>
            <p className="text-center my-8">
              Bạn đã có tài khoản?{" "}
              <strong
                className="text-primary cursor-pointer"
                onClick={() => setTypeModalSign(2)}
              >
                Đăng nhập ngay.
              </strong>{" "}
            </p>
          </div>
        )}
        {typeModalSign == 2 && (
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-center mb-8 font-normal text-zinc-500">
              Đăng nhập
            </h2>
            <form
              onSubmit={handleSubmitForm2(onSubmitForm2)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="">
                <input
                  {...registerForm2("email", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="text"
                  placeholder="Email"
                />
                {errorsForm2 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm2?.email?.message}
                  </small>
                )}
              </label>
              <label htmlFor="">
                <input
                  {...registerForm2("password", {
                    required: "Trường là bắt buộc!",
                  })}
                  className="w-full p-3 rounded-md border-zinc-400 border outline-none"
                  type="text"
                  placeholder="Mật Khẩu"
                />
                {errorsForm2 && (
                  <small className="text-red-500 block mt-2">
                    {errorsForm2?.password?.message}
                  </small>
                )}
              </label>
              <button className="p-2.5 bg-primary text-white rounded-md border-none font-bold text-base">
                Đăng nhập
              </button>
            </form>
            <p className="text-right my-4 text-primary">Quên mật khẩu?</p>
            <p className="text-center my-8">
              Bạn chưa có tài khoản?{" "}
              <strong
                className="text-primary cursor-pointer"
                onClick={() => setTypeModalSign(1)}
              >
                Tạo tài khoản.
              </strong>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalMenuSign;
