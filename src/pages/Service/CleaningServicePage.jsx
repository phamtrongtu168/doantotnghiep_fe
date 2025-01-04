import { useQuery } from "react-query";
import { steps } from "../../data";
import { getAll } from "../../services/api/ServiceService";
import { getAllByUser } from "../../services/api/RoomService";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { ServiceRequestService } from "../../services/api";

function CleaningServicePage() {
  const [isRoom, setIsRoom] = useState(true);

  const { data: services } = useQuery({
    queryKey: ["service-list"],
    queryFn: () => getAll(),
  });

  const { data: roomsMe } = useQuery({
    queryKey: ["room-me"],
    queryFn: () => getAllByUser(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await ServiceRequestService.create(data);
      reset();
      toast.success("Đặt lịch thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error(error);
    }
  };

  const handleToggle = (event) => {
    setIsRoom(event.target.checked);
    reset();
  };

  const cleanServices = services?.filter(
    (service) => service.service_type === "clean"
  );
  const firstCleanService = cleanServices?.[0];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://top10totnhat.net/wp-content/uploads/2021/10/Dich-vu-ve-sinh-don-dep-nha-da-nang.jpg"
          alt="Dịch vụ dọn dẹp"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="text-white text-5xl md:text-6xl font-bold text-center uppercase">
            Dịch vụ dọn dẹp
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Liên hệ đặt dịch vụ
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="hidden"
            value={firstCleanService?.id}
            {...register("service_id")}
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isRoom}
              onChange={handleToggle}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium">
              {isRoom ? "Địa chỉ khác" : "Phòng của tôi"}
            </span>
          </label>

          {isRoom ? (
            <div>
              <label className="block mb-2 text-sm font-medium">
                Chọn phòng
              </label>
              <select
                {...register("room_id", { required: "Vui lòng chọn phòng" })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">-- Chọn phòng --</option>
                {roomsMe?.map((room, index) => (
                  <option key={index} value={room?.room?.id}>
                    {room?.room?.name}
                  </option>
                ))}
              </select>
              {errors.room_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.room_id.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block mb-2 text-sm font-medium">
                Nhập địa chỉ
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ dọn dẹp"
                {...register("address_other", {
                  required: "Vui lòng nhập địa chỉ",
                })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.address_other && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address_other.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Nhập ghi chú
            </label>
            <input
              type="text"
              placeholder="Ghi chú"
              {...register("description")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white text-lg font-semibold rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Đặt lịch
          </button>
        </form>
      </div>

      {/* Steps Section */}
      <div className="py-12 px-6 lg:px-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Quy trình làm việc
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center"
            >
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CleaningServicePage;
