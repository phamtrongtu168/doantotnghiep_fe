import { useQuery } from "react-query";
import { steps } from "../../data";
import { getAll } from "../../services/api/ServiceService";
import { getAllByUser } from "../../services/api/RoomService";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { ServiceRequestService } from "../../services/api";

function CleaningServicePage(props) {
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
      console.log(data);
      await ServiceRequestService.create(data);
      reset();
      toast.success("Đặt lịch thành công");
    } catch (error) {
      console.log(error);
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
    <>
      <div className="relative">
        <img
          className="w-full aspect-[7/2]"
          src="https://picsum.photos/1600/400?random=1"
          alt=""
        />
        <h2
          className="absolute top-1/2 left-0 uppercase text-center w-full text-6xl text-white text-shadow w-1/2 leading-snug"
          style={{ transform: "translateY(-50%)" }}
        >
          Dịch vụ dọn dẹp
        </h2>
      </div>
      <div className="">
        <h2 className="text-primary text-4xl text-center my-4">
          Liên hệ đặt dịch vụ
        </h2>
        <div className="bg-zinc-200 p-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-4 max-w-md mx-auto"
          >
            <input
              type="hidden"
              value={firstCleanService?.id}
              {...register("service_id")}
            />
            <label className="cursor-pointer space-x-2">
              <input type="checkbox" checked={isRoom} onChange={handleToggle} />
              <span>Trạng thái: {isRoom ? "Có phòng" : "Địa chỉ khác"}</span>
            </label>
            {isRoom && (
              <label>
                <b className="text-sm">Chọn phòng</b>
                <select
                  {...register("room_id")}
                  className="w-full p-3 text-lg border border-gray-300 rounded outline-none"
                >
                  <option value="">-- Chọn phòng --</option>
                  {roomsMe?.map((room, index) => (
                    <option key={index} value={room?.room?.id}>
                      {room?.room?.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {!isRoom && (
              <label>
                <b className="text-sm">Nhập địa chỉ</b>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ dọn dẹp"
                  {...register("address_other")}
                  className="w-full p-2.5 text-lg border border-gray-300 rounded outline-none"
                />
              </label>
            )}
            <label>
              <b className="text-sm">Nhập ghi chú</b>
              <input
                type="text"
                placeholder="Ghi chú"
                {...register("description")}
                className="w-full p-2.5 text-lg border border-gray-300 rounded outline-none"
              />
            </label>
            <button
              type="submit"
              className="py-2 px-10 mx-auto bg-primary text-white cursor-pointer border-none rounded text-lg w-max"
            >
              Đặt lịch
            </button>
          </form>
        </div>
      </div>
      <div className="mb-16 px-32 ">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Quy trình làm việc.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg flex flex-col justify-center items-center"
            >
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-lg text-gray-600 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CleaningServicePage;
