import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  RoomMe,
  AccountMe,
  RentalRooms,
} from "../../components/Section/MyAccount";

function MyAccountPage(props) {
  const [searchParams] = useSearchParams();
  const [positionNum, setPositionNum] = useState(1);
  const { authData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authData?.user) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    // Lấy giá trị từ URL tham số, ví dụ: ?position=5
    const position = searchParams.get("position");
    if (position) {
      setPositionNum(Number(position)); // Chuyển thành số nếu cần
    }
  }, [searchParams, positionNum]);
  return (
    <section
      className="border-0 border-t border-solid border-zinc-400 flex "
      style={{ minHeight: "calc(100svh - 2.35rem)" }}
    >
      <aside className="bg-zinc-100 max-w-96 border-0 border-r border-solid border-zinc-400">
        <div className="border-0 border-b border-solid border-zinc-400 text-center p-4">
          <FaUser size={32} color="blue" />
          <h4 className="text-primary text-xl">{authData?.user?.name}</h4>
        </div>
        <div className="">
          <h3
            onClick={() => navigate("?position=1")}
            className={`border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400 ${
              positionNum === 1 ? "underline" : ""
            }`}
          >
            Thông tin tài khoản
          </h3>
          <h3
            onClick={() => navigate("?position=2")}
            className={`border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400 ${
              positionNum === 2 ? "underline" : ""
            }`}
          >
            Trọ của tôi
          </h3>

          {authData?.user?.role === "landlord" && (
            <h3
              onClick={() => navigate("?position=3")}
              className={`border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400 ${
                positionNum === 3 ? "underline" : ""
              }`}
            >
              Phòng cho thuê
            </h3>
          )}
        </div>
      </aside>
      <div className="p-8 flex-1 min-h-[82vh]">
        {positionNum === 1 && <AccountMe />}
        {positionNum === 2 && <RoomMe />}
        {positionNum === 3 && authData?.user?.role === "landlord" && (
          <RentalRooms />
        )}
      </div>
    </section>
  );
}

export default MyAccountPage;
