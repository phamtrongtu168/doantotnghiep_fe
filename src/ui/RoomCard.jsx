import React from "react";
import { Link, useLocation } from "react-router-dom";

const RoomCard = ({ link, image, price, name, address, details, tenant }) => {
  const { pathname } = useLocation(); // Lấy đường dẫn hiện tại

  // Hàm định dạng giá
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Loại bỏ phần thập phân
    }).format(price);
  };

  return (
    <div className="bg-[#e8e8e8] rounded-lg min-w-64 w-full">
      <Link to={link}>
        <img
          className="rounded-lg aspect-[13/10] w-full"
          src={image}
          alt={name}
        />
      </Link>
      <figcaption className="p-2">
        <strong className="block">{formatPrice(price)}</strong>
        <p className="my-2">{name}</p>
        <p className="my-2">{address}</p>
        <p className="my-2">{details}</p>
        <Link
          to={link}
          className="w-full text-base cursor-pointer my-2.5 p-1 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white"
        >
          {pathname === "/my-account" ? "Xem chi tiết" : "Thuê phòng"}
        </Link>
        <span className="block my-2 text-right">
          {tenant} {tenant && "(Đã thuê)"}
        </span>
      </figcaption>
    </div>
  );
};

export default RoomCard;
