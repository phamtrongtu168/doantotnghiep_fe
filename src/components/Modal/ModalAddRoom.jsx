import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {
  getAllDistrict,
  getAllProvince,
} from "../../services/api/SuperShipService";
import Select from "react-select";
import { RoomService } from "../../services/api";
import { toast } from "react-toastify";
export default function ModalAddRoom({ isOpen, onClose }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getAllProvince(),
  });
  const { data: districts, isLoading: isLoadingDistricts } = useQuery(
    ["districts", selectedProvince?.code],
    () => getAllDistrict(selectedProvince?.code),
    {
      enabled: !!selectedProvince,
    }
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const imageFiles = Array.from(data.images);
      const formData = {
        ...data,
        images: imageFiles, // Gắn mảng ảnh vào
        province_id: selectedProvince?.code || "",
        district_id: selectedDistrict?.code || "",
      };
      console.log(formData);
      await RoomService.create(formData);
      reset();
      setSelectedProvince(null);
      setSelectedDistrict(null);
      onClose();
      toast.success("Tạo phòng thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setDistrictOptions(districts[selectedOption.value] || []);
    setCode(selectedOption.value);
  };
  // Xử lý khi quận huyện thay đổi
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "inherit", // Màu nền ăn theo màu của thẻ cha
      borderColor: "#ccc", // Thêm border color nếu cần
      padding: "0",
      fontSize: "16px",
      borderRadius: "8px",
      border: "none",
      boxShadow: "none", // Loại bỏ shadow (nếu có)
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "inherit", // Màu nền menu ăn theo thẻ cha
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm bóng cho menu
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ddd" : "#fff", // Thay đổi màu khi option được chọn
      color: state.isSelected ? "#000" : "#333",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none", // Ẩn mũi tên xuống
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // Ẩn đường phân cách giữa icon và ô chọn
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888", // Thay đổi màu chữ của placeholder
    }),
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Tạo Phòng Mới</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-2 gap-4"
        >
          {/* Tên phòng */}
          <div>
            <label className="block text-sm font-medium">Tên phòng:</label>
            <input
              type="text"
              {...register("name", { required: "Tên phòng là bắt buộc" })}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <small className="text-red-500 text-xs">
                {errors.name.message}
              </small>
            )}
          </div>
          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium">Mô tả:</label>
            <textarea
              {...register("description", { required: "Mô tả là bắt buộc" })}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
            ></textarea>
            {errors.description && (
              <small className="text-red-500 text-xs">
                {errors.description.message}
              </small>
            )}
          </div>
          {/* Giá */}
          <div>
            <label className="block text-sm font-medium">Giá phòng:</label>
            <input
              type="number"
              {...register("price", { required: "Giá là bắt buộc" })}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
            />
            {errors.price && (
              <small className="text-red-500 text-xs">
                {errors.price.message}
              </small>
            )}
          </div>
          {/* Diện tích */}
          <div>
            <label className="block text-sm font-medium">Diện tích (m²):</label>
            <input
              type="number"
              {...register("area", { required: "Diện tích là bắt buộc" })}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
            />
            {errors.area && (
              <small className="text-red-500 text-xs">
                {errors.area.message}
              </small>
            )}
          </div>
          {/* Các thuộc tính khác */}
          {[
            { label: "Số người ở tối đa", key: "max_occupants" },
            { label: "Số điều hòa", key: "air_conditioners" },
            { label: "Số bếp", key: "kitchens" },
            { label: "Số tủ lạnh", key: "refrigerators" },
            { label: "Số máy giặt", key: "washing_machines" },
            { label: "Số nhà vệ sinh", key: "toilets" },
            { label: "Số phòng tắm", key: "bathrooms" },
            { label: "Số phòng ngủ", key: "bedrooms" },
            { label: "Wi-Fi", key: "wifi" },
            { label: "Giá điện", key: "electricity_rate" },
            { label: "Giá nước", key: "water_rate" },
          ].map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium">{item.label}:</label>
              <input
                type="number"
                {...register(item.key, {
                  required: `${item.label} là bắt buộc`,
                })}
                className="w-full border outline-none border-gray-300 rounded-md p-2"
              />
              {errors[item.key] && (
                <small className="text-red-500 text-xs">
                  {errors[item.key]?.message}
                </small>
              )}
            </div>
          ))}
          {/* Tỉnh/Thành phố */}
          <div>
            <label className="block text-sm font-medium">Tỉnh/Thành phố:</label>
            <Select
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinces}
              styles={customStyles}
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.code}
              menuPortalTarget={document.body}
              placeholder="Chọn tỉnh thành"
            />
            {errors.province_id && (
              <small className="text-red-500 text-xs">
                {errors.province_id.message}
              </small>
            )}
          </div>
          {/* Quận/Huyện */}
          <div>
            <label className="block text-sm font-medium">Quận/Huyện:</label>
            <Select
              options={districts}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              menuPortalTarget={document.body}
              styles={customStyles}
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.code}
              placeholder="Chọn quận huyện"
              isDisabled={!selectedProvince} // Disable quận huyện nếu chưa chọn tỉnh thành
            />
            {errors.district_id && (
              <small className="text-red-500 text-xs">
                {errors.district_id.message}
              </small>
            )}
          </div>
          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium">Địa chỉ:</label>
            <input
              type="text"
              {...register("address", { required: "Địa chỉ là bắt buộc" })}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
            />
            {errors.address && (
              <small className="text-red-500 text-xs">
                {errors.address.message}
              </small>
            )}
          </div>
          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium">Hình ảnh phòng:</label>
            <input
              type="file"
              {...register("images[]")}
              multiple
              className="w-full"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="border-none cursor-pointer font-bold px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="border-none cursor-pointer font-bold px-4 py-2 bg-blue-500 text-white rounded"
            >
              Tạo phòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
