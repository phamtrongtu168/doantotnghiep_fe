import React from "react";
import aboutUs from "../../assets/images/team-icon.png";
import icon1 from "../../assets/images/aboutus_icon1.png";
import icon2 from "../../assets/images/aboutus_icon2.png";
import icon3 from "../../assets/images/aboutus_icon3.png";
import { Element } from "react-scroll";


const AboutUs = () => {
  return (
    <Element name="about-us">
      <section className="flex p-4 my-20">
        <img className="p-12 w-1/2" src={aboutUs} alt="" />
        <div className="p-12">
          <h3 className="uppercase text-zinc-400 font-normal text-base">
            About Us
          </h3>
          <h4 className="text-4xl font-bold my-4">Chúng tôi có gì?</h4>
          <p className="text-primary text-3xl my-4">
            Bất cứ gì bạn cần thuê trọ.
          </p>
          <p className="text-xl text-zinc-500">
            Đội ngũ vận hành nhiều năm đem lại một số lượng khách hàng rất lớn và
            hàng trăm căn hộ chúng tôi đang sở hữu.
          </p>
          <div className="flex p-4 my-16 shadow-md rounded-md">
            <div className="flex flex-col justify-center items-center flex-1 p-2">
              <img className="w-24 object-cover" src={icon1} alt="" />
              <p className="text-xl text-zinc-500">Team</p>
              <strong className="text-3xl text-[#723bcf]">100+</strong>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-2 border-0 border-r border-l border-solid border-zinc-400">
              <img className="w-24 object-cover" src={icon2} alt="" />
              <p className="text-xl text-zinc-500">Apartment</p>
              <strong className="text-3xl text-[#f14e87]">100+</strong>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-2">
              <img className="w-24 object-cover" src={icon3} alt="" />
              <p className="text-xl text-zinc-500">Client</p>
              <strong className="text-3xl text-[#723bcf]">1010+</strong>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default AboutUs;
