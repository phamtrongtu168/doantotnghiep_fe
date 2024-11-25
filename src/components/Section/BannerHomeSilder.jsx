import React, { useEffect, useRef, useState } from "react";
import iconSearch from "../../assets/icons/search.svg";
import { IoLocation } from "react-icons/io5";
import { RiPriceTagFill } from "react-icons/ri";
import { BsCalendar2CheckFill } from "react-icons/bs";
import ImageSlider from "../ImageSlider";
import supBanner1 from "../../assets/images/sup1-banner.png";
import supBanner2 from "../../assets/images/sup2-banner.png";
import supBanner3 from "../../assets/images/sup3-banner.jpg";
import supBanner4 from "../../assets/images/sup4-banner.jpg";
import supBanner5 from "../../assets/images/sup5-banner.jpg";
import downpageIcon from "../../assets/icons/downpage-icon.svg";
import { getAllDistrict, getAllProvince } from "../../services/api/SuperShipService";
import { useQuery } from "react-query";
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { RoomService } from "../../services/api";
import { Element } from "react-scroll";
import { useNavigate } from "react-router-dom";


const BannerHomeSilder = () => {
  const images = [supBanner1, supBanner2, supBanner3, supBanner4, supBanner5];
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => getAllProvince(),
  });

  const { data: districts, isLoading: isLoadingDistricts } = useQuery(
    ['districts', selectedProvince?.code],
    () => getAllDistrict(selectedProvince?.code),
    {
      enabled: !!selectedProvince,
    }
  );

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
      backgroundColor: 'inherit', // Màu nền ăn theo màu của thẻ cha
      borderColor: '#ccc', // Thêm border color nếu cần
      padding: '0',
      fontSize: '16px',
      borderRadius: '8px',
      border: "none",
      boxShadow: 'none', // Loại bỏ shadow (nếu có)
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'inherit', // Màu nền menu ăn theo thẻ cha
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Thêm bóng cho menu
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ddd' : '#fff', // Thay đổi màu khi option được chọn
      color: state.isSelected ? '#000' : '#333',
      padding: '8px',
      borderRadius: '4px',
      cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none', // Ẩn mũi tên xuống
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none', // Ẩn đường phân cách giữa icon và ô chọn
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#888', // Thay đổi màu chữ của placeholder
    }),
  };
  const handleToTop = () => {
    const element = document.getElementById("topElement");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (data) => {
    try {
      data.province_id = selectedProvince?.code || "";
      data.district_id = selectedDistrict?.code || "";
      const response = await RoomService.getAll(data)
      console.log(response);
      navigate("/rooms", { state: response });
    } catch (error) {

    }

  };

  return (
    <Element name="home">
      <section className="relative p-8 bg-main-home rounded-xl h-[76vh]">
        <div className="flex gap-8">
          <div className="w-3/5">
            <h1 className="text-6xl text-primary">Phòng Đặc Biệt</h1>
            <strong className="block text-white text-3xl leading-normal text-shadow">
              Giá: 3.000k/tháng
            </strong>
            <strong className="block text-white text-3xl leading-normal text-shadow">
              Địa chỉ: 296 Võ Nguyên Giáp, <br /> Ngũ Hành Sơn, Đà Nẵng
            </strong>
            <p className="py-8 text-white text-lg">
              Phòng được thiết kế với không gian sông rộng rãi và tháng mát xung
              quanh với nhiều dịch vụ tiện ích khác nhau có tầm nhìn ra biển và
              ánh sáng tự nhiên vào mỗi buổi sáng.
            </p>
            <button className="bg-primary cursor-pointer text-white border-none px-8 py-2 rounded text-lg">
              Thuê Ngay
            </button>
          </div>
          <div className="w-2/5">
            <ImageSlider images={images} />
          </div>
        </div>
        <div className="absolute left-8 right-8 -bottom-[8vh] py-1 px-6 bg-white shadow-black rounded-xl shadow-2xl">
          <ul className="flex font-medium uppercase py-2 overflow-x-auto">
            <li className="flex items-center gap-2 flex-1 whitespace-nowrap px-4 min-w-96">
              <IoLocation size={24} /> Khu vực/ Địa điểm
            </li>
            <li className="flex items-center gap-2 flex-1 whitespace-nowrap px-4">
              <RiPriceTagFill size={24} /> Mức giá
            </li>
            <li className="flex items-center gap-2 flex-1 whitespace-nowrap px-4">
              <BsCalendar2CheckFill size={20} /> Số người ở
            </li>
          </ul>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="flex py-4 gap-2 overflow-x-auto">
            <div className="bg-[#e1e1e1] flex flex-1 px-3 pt-2 rounded gap-4 min-w-96">
              <label className="flex flex-col w-full" htmlFor="">
                <span className="text-zinc-600">Chọn tỉnh thành </span>
                <Select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  options={provinces}
                  styles={customStyles}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.code}
                  menuPortalTarget={document.body}
                  placeholder='Chọn tỉnh thành'
                />
              </label>
              <label className="flex flex-col w-full" htmlFor="">
                <span className="text-zinc-600">Quận/ Huyện</span>
                <Select
                  options={districts}
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  menuPortalTarget={document.body}
                  styles={customStyles}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.code}
                  placeholder="Chọn quận huyện"
                  isDisabled={!selectedProvince}  // Disable quận huyện nếu chưa chọn tỉnh thành
                />
              </label>
            </div>
            <i className="border-r-[0px] border-solid border-zinc-400 h-12 my-auto"></i>
            <label
              className="flex flex-col flex-1 bg-[#e1e1e1] px-3 py-2 rounded"
              htmlFor=""
            >
              <span className="text-zinc-600">Giá từ</span>
              <input
                className="p-1 outline-none border-none bg-[#e1e1e1] leading-7 text-base"
                type="text"
                {...register('price_from',)}
              />
            </label>
            <i className="border-r-[0px] border-solid border-zinc-400 h-12 my-auto"></i>
            <label
              className="flex flex-col flex-1 bg-[#e1e1e1] px-3 py-2 rounded"
              htmlFor=""
            >
              <span className="text-zinc-600">Số lượng </span>
              <input
                className="p-1 outline-none border-none bg-[#e1e1e1] leading-7 text-base"
                type="text"
                {...register('max_occupants',)}
              />
            </label>
            <button className="px-5 flex justify-center items-center text-white bg-primary rounded border-none cursor-pointer">
              <img src={iconSearch} alt="" />
            </button>
          </form>
          <div className="flex justify-center">
            <img onClick={handleToTop} src={downpageIcon} className="max-w-12 -mb-[2.5rem] cursor-pointer" alt="Scroll to top" />
          </div>
        </div>
      </section>
    </Element>
  );
};

export default BannerHomeSilder;
