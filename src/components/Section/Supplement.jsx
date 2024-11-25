import React from "react";
import item2 from "../../assets/images/cleaner-icon.png";
import item3 from "../../assets/images/moving-icon.png";
import item4 from "../../assets/images/repair-icon.png";
import { Element } from "react-scroll";

const Supplement = () => {
  return (
    <Element name="utils">
      <section className="py-8">
        <h2 className="text-center uppercase my-4 text-4xl">Tiện ích đi kèm</h2>
        <p className="text-center my-6">
          Chúng tôi cung cấp nhiều tiện ích khác nhau bạn có thể sử dụng một cách
          nhanh chóng và thuận lợi nhất.
        </p>
        <div className="my-4 grid grid-cols-3 gap-12">
          <div>
            <img className="w-full aspect-[4/3] p-12" src={item2} alt="" />
            <h3 className="uppercase text-2xl text-center mb-4">Dọn dẹp</h3>
            <p>
              Chúng tôi cung cấp dịch vụ dọn dẹp để có thể dọn dẹp và sắp xếp
              không gian sống của bạn 1 cách sạch sẽ tối ưu về thời gian và kinh
              phí.
            </p>
          </div>
          <div>
            <img className="w-full aspect-[4/3] p-12" src={item3} alt="" />
            <h3 className="uppercase text-2xl text-center mb-4">Chuyển trọ</h3>
            <p>
              Chúng tôi cung cấp dịch vụ dọn dẹp để có thể dọn dẹp và sắp xếp
              không gian sống của bạn 1 cách sạch sẽ tối ưu về thời gian và kinh
              phí.
            </p>
          </div>
          <div>
            <img className="w-full aspect-[4/3] p-12" src={item4} alt="" />
            <h3 className="uppercase text-2xl text-center mb-4">Sửa chữa</h3>
            <p>
              Chúng tôi cung cấp xe những người thợ sữa chữa nơi ở của bạn mỗi khi
              bạn gặp sự cố.
            </p>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Supplement;
