import React from "react";
import { Link } from "react-router-dom";

const HorizontalRoomCard = ({
  link,
  image,
  price,
  name,
  address,
  details,
  tenant,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex bg-[#f4f4f4] rounded-sm shadow-md p-4 w-full">
      <Link
        to={link}
        className="flex-shrink-0 w-40 h-32 overflow-hidden rounded-lg"
      >
        <img className="object-cover w-full h-full" src={image} alt={name} />
      </Link>
      <div className="flex flex-col justify-between flex-grow ml-4">
        <div>
          <strong className="text-lg">{formatPrice(price)}</strong>
          <p className="text-sm text-gray-600 mt-1">{name}</p>
          <p className="text-sm text-gray-500">{address}</p>
          <p className="text-sm text-gray-400 mt-2">{details}</p>
          <span className="text-sm text-right text-gray-500">
            {tenant} {tenant && "(Đã thuê)"} {!tenant && "(Chưa thuê)"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={link}
            className="text-sm text-primary border-[1px] border-primary py-1 px-3 rounded hover:bg-primary hover:text-white"
          >
            {"Xem chi tiết"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalRoomCard;
