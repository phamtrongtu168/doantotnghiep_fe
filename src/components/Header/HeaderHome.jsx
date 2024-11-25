import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import ModalMenuSign from "../Modal/ModalMenuSign";
import { Link } from "react-scroll";

const HeaderHome = () => {
  const [isModalSign, setIsModalSign] = useState(false);
  const [typeModalSign, setTypeModalSign] = useState(0);

  const handleRegister = () => {
    setIsModalSign(true);
    setTypeModalSign(1);
  };
  const handleLogin = () => {
    setIsModalSign(true);
    setTypeModalSign(2);
  };
  const handleReset = () => {
    setIsModalSign(false);
    setTypeModalSign(0);
  };

  return (
    <>
      <header className="">
        <nav className="flex w-full justify-between py-6 px-20">
          <LinkRouter to={"/"} className="cursor-pointer">
            <h1 className="text-3xl">
              T<span className="text-primary">W</span>S.COM
            </h1>
          </LinkRouter>
          <ul className="flex gap-8 items-center">
            {
              location.pathname === '/' &&
              <>
                <li>
                  <Link to="home" smooth={true} offset={-86} className="cursor-pointer">Trang Chủ</Link>
                </li>
                <li>
                  <Link to="the-exist-room" smooth={true} className="cursor-pointer">Phòng</Link>
                </li>
                <li>
                  <Link to="utils" smooth={true} className="cursor-pointer">Tiện Ích</Link>
                </li>
                <li>
                  <Link to="tips" smooth={true} className="cursor-pointer">Mẹo</Link>
                </li>
                <li>
                  <Link to="about-us" smooth={true} className="cursor-pointer">Về Chúng Tôi</Link>
                </li>
              </>
            }

            <li className="rounded-md border border-primary border-solid px-2 py-1.5 text-primary">
              <button
                onClick={handleRegister}
                className="text-primary text-base bg-transparent border-none cursor-pointer"
              >
                Đăng ký
              </button>
              <span className="text-primary mx-1">|</span>
              <button
                onClick={handleLogin}
                className="text-primary text-base bg-transparent border-none cursor-pointer"
              >
                Đăng nhập
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <ModalMenuSign
        isOpen={isModalSign}
        typeModal={typeModalSign}
        onClose={handleReset}
      />
    </>
  );
};

export default HeaderHome;
