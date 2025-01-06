import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  RoomMe,
  AccountMe,
  RentalRooms,
  RentalManagement,
  BillManagement,
  TaskList,
  ListServicesRequest,
} from "../../components/Section/MyAccount";

function MyAccountPage() {
  const [searchParams] = useSearchParams();
  const [positionNum, setPositionNum] = useState(1);
  const { authData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData?.user) {
      navigate("/");
    }
  }, [authData, navigate]);

  useEffect(() => {
    const position = searchParams.get("position");
    if (position) {
      setPositionNum(Number(position));
    }
  }, [searchParams]);

  const userRole = authData?.user?.role;

  const tabs = [
    {
      id: 1,
      label: "Thông tin tài khoản",
      roles: [
        "user",
        "landlord",
        "staff_cleaner",
        "staff_movinger",
        "staff_repairer",
      ],
      component: <AccountMe />,
      isVisible: true,
    },
    {
      id: 2,
      label: "Trọ của tôi",
      roles: ["user"],
      component: <RoomMe />,
      isVisible: userRole === "user",
    },
    {
      id: 3,
      label: "Phòng cho thuê",
      roles: ["landlord"],
      component: <RentalRooms />,
      isVisible: userRole === "landlord",
    },
    {
      id: 4,
      label: "Quản lý cho thuê",
      roles: ["landlord"],
      component: <RentalManagement />,
      isVisible: userRole === "landlord",
    },
    {
      id: 5,
      label: "Hóa đơn",
      roles: ["landlord"],
      component: <BillManagement />,
      isVisible: false,
    },
    {
      id: 6,
      label: "Nhiệm vụ",
      roles: ["staff_cleaner", "staff_movinger", "staff_repairer"],
      component: <TaskList />,
      isVisible:
        userRole === "staff_cleaner" ||
        userRole === "staff_movinger" ||
        userRole === "staff_repairer",
    },
    {
      id: 7,
      label: "Yêu cầu dịch vụ",
      roles: ["user", "landlord"],
      component: <ListServicesRequest />,
      isVisible: true,
    },
  ];

  return (
    <section
      className="border-0 border-t border-solid border-zinc-400 flex"
      style={{ minHeight: "calc(100svh - 2.35rem)" }}
    >
      <aside className="bg-zinc-100 max-w-96 border-0 border-r border-solid border-zinc-400">
        <div className="border-0 border-b border-solid border-zinc-400 text-center p-4">
          <FaUser size={32} color="blue" />
          <h4 className="text-primary text-xl">{authData?.user?.name}</h4>
        </div>
        <div>
          {tabs.map(
            (tab) =>
              tab.isVisible &&
              tab.roles.includes(userRole) && (
                <h3
                  key={tab.id}
                  onClick={() => navigate(`?position=${tab.id}`)}
                  className={`border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400 ${
                    positionNum === tab.id ? "underline" : ""
                  }`}
                >
                  {tab.label}
                </h3>
              )
          )}
        </div>
      </aside>
      <div className="p-8 flex-1 min-h-[82vh]">
        {tabs.find((tab) => tab.id === positionNum)?.component || (
          <p>Không tìm thấy nội dung phù hợp.</p>
        )}
      </div>
    </section>
  );
}

export default MyAccountPage;
