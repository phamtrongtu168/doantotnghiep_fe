import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import RoomDetail from "../../components/Section/RoomDetail";

import bgPlaceholder from "../../assets/images/background-xam.jpg";
import item1 from "../../assets/icons/area-icon.svg";
import item2 from "../../assets/icons/bed-icon.svg";
import item3 from "../../assets/icons/airconditioner-icon.svg";
import item4 from "../../assets/icons/kitchen-icon.svg";
import item5 from "../../assets/icons/wifi-icon.svg";
import item6 from "../../assets/icons/fidge-icon.svg";
import item7 from "../../assets/icons/wc-icon.svg";
import item8 from "../../assets/icons/bath-icon.svg";
import item9 from "../../assets/icons/washing-icon.svg";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getById } from "../../services/api/RoomService";
import { useForm } from "react-hook-form";
import { RentalManagementService } from "../../services/api";
function RoomDetailPage(props) {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { data: room } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getById(id),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const authData = localStorage.getItem("authData");

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUser(parsedAuthData.user);
    }
  }, []);
  const onSubmit = (data) => {
    try {
      if (user?.id && data) {
        data.tenant_id = user.id;
        data.room_id = room.id;

        const startDate = new Date(data.start_date);
        let endDate = new Date(startDate);

        // Thêm ngày dựa trên hợp đồng
        switch (data.end_date) {
          case "1":
            endDate.setMonth(startDate.getMonth() + 1);
            break;
          case "6":
            endDate.setMonth(startDate.getMonth() + 6);
            break;
          case "12":
            endDate.setFullYear(startDate.getFullYear() + 1);
            break;
          case "":
            // Không có thay đổi cho 'Chọn Sau'
            break;
          default:
            break;
        }

        data.end_date = endDate.toISOString().split("T")[0]; // Chuyển đổi ngày thành định dạng YYYY-MM-DD
        const res = RentalManagementService.create(data);
        console.log(res);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    infinite: true, // Vòng lặp vô tận
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 3, // Số ảnh hiển thị cùng lúc
    slidesToScroll: 1, // Số ảnh cuộn mỗi lần
  };
  console.log(room);
  return (
    <>
      <Slider {...settings}>
        {(room?.images?.length
          ? room.images
          : Array(3).fill({ image_url: bgPlaceholder })
        ) // Sử dụng ảnh placeholder nếu không có ảnh
          .map((item, index) => (
            <div key={index} className="w-max">
              <img
                src={item?.image_url || bgPlaceholder} // Hiển thị ảnh hoặc placeholder
                alt={`Slide ${index + 1}`}
                className="w-full h-auto px-1 aspect-[3/2]"
                onError={(e) => (e.target.src = bgPlaceholder)} // Đổi sang ảnh placeholder nếu ảnh bị lỗi
              />
            </div>
          ))}
      </Slider>

      <section className="px-12">
        <div className="relative flex gap-4">
          <div>
            <strong className="text-3xl block">{room?.price} vnd/tháng</strong>
            <strong className="uppercase text-[2rem]">{room?.name}</strong>
            <p>{room?.address}</p>
            <p>
              {room?.bedrooms} phòng ngủ - {room?.toilets} nhà vệ sinh
            </p>
            <big>Quản lý bởi {room?.landlord?.name}</big>
            <strong className="block mt-4">Mô tả</strong>
            <p className="leading-6">{room?.description}</p>
          </div>
          <div className="-mt-20 border-solid border-zinc-400 border-2 p-3 bg-white rounded min-w-96 max-w-min ml-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-8"
            >
              <label>
                <strong>Người thuê</strong>
                <input
                  className="w-full p-2 outline-none"
                  {...register("tenant_id")}
                  disabled
                  defaultValue={user?.name}
                />
                <p className="text-red-500">{errors.tenant_id?.message}</p>
              </label>
              <label className="flex gap-1 whitespace-nowrap flex-col">
                <strong>Ngày chuyển đến</strong>
                <input
                  type="date"
                  className="w-full p-2 outline-none"
                  {...register("start_date", {
                    required: "Trường là bắt buộc!",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                />
                <small className="text-red-500">
                  {errors.end_date?.message}
                </small>
              </label>
              <strong>Hợp đồng</strong>
              <div className="flex gap-4">
                <label className="flex gap-1 whitespace-nowrap">
                  <input
                    type="radio"
                    value={1}
                    {...register("end_date", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  <b>1 Tháng</b>
                </label>
                <label className="flex gap-2 whitespace-nowrap">
                  <input
                    type="radio"
                    value={6}
                    {...register("end_date", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  <b>6 Tháng</b>
                </label>
                <label className="flex gap-2 whitespace-nowrap">
                  <input
                    type="radio"
                    value={12}
                    {...register("end_date", {
                      required: "Trường là bắt buộc!",
                    })}
                  />
                  <b>12 Tháng</b>
                </label>
                <label className="flex gap-2 whitespace-nowrap" htmlFor="">
                  <input type="radio" />
                  <b>Chọn Sau</b>
                </label>
              </div>
              <p>
                Điều khoản: Đối với thuê trọ thời hạn hợp đồng tối thiểu là 1
                tháng. Nếu bạn không đồng ý vui lòng không đặt phòng để tránh
                xảy ra tranh chấp giữa các bên. Với hợp đồng thời hạn dài sẽ
                được nhiều ưu đãi về giá.
              </p>
              <button className="py-2 px-3 rounded bg-primary text-white cursor-pointer border-none font-bold text-base w-max ml-auto">
                Thuê phòng
              </button>
            </form>
          </div>
        </div>
        <div className="border-2 border-solid border-zinc-500 rounded p-4 mt-8">
          <strong className="">Điểm nổi bật</strong>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item1} alt="" />
              <p className="text-zinc-600">Diện tích</p>
              <b>{room?.area} m2</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item2} alt="" />
              <p className="text-zinc-600">Phòng ngủ</p>
              <b>{room?.bedrooms}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item3} alt="" />
              <p className="text-zinc-600">Điều hòa</p>
              <b>{room?.air_conditioners}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item4} alt="" />
              <p className="text-zinc-600">Nhà bếp</p>
              <b>{room?.kitchens}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item5} alt="" />
              <p className="text-zinc-600">Wifi</p>
              <b>{room?.wifi}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item6} alt="" />
              <p className="text-zinc-600">Tủ lạnh</p>
              <b>{room?.refrigerators}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item7} alt="" />
              <p className="text-zinc-600">Nhà vệ sinh</p>
              <b>{room?.toilets}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item8} alt="" />
              <p className="text-zinc-600">Nhà tắm</p>
              <b>{room?.bathrooms}</b>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap p-2">
              <img className="max-w-12" src={item9} alt="" />
              <p className="text-zinc-600">Máy giặc</p>
              <b>{room?.washing_machines}</b>
            </div>
          </div>
        </div>
        <div className="border-2 border-solid border-zinc-500 rounded mt-8 mb-28">
          <div className="bg-zinc-200 p-3">
            <p>Thông tin bổ sung.</p>
          </div>
          <div className="p-3">
            <p className="leading-6">
              Các tính năng đặc biệt: Gần các xa lộ chính, Trung tâm máy tính,
              Cảnh quan tươi tốt, Có đồ nội thất cho thuê từ CORT, Mặt bằng rộng
              rãi gồm một phòng ngủ, Căn hộ theo phong cách nhà phố, Giao thông,
              Bãi đậu xe dưới tầng trệt. Cách 20m có công viên rộng rãi. Được
              phép nuôi thú cưng (Với 1 số quy định nhất định).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default RoomDetailPage;
