import React from "react";
import tips1 from "../../assets/images/tips1.png";
import tips2 from "../../assets/images/tips2.png";
import tips3 from "../../assets/images/tips3.png";
import { Element } from "react-scroll";


const TipsToStay = () => {
  return (
    <Element name="tips">
      <section className="flex py-20">
        <div className="w-1/2  dot-pattern">
          <div className="p-14">
            <h3 className="text-5xl uppercase">
              Mẹo vặt ở <span className="text-primary">trọ</span>{" "}
            </h3>
            <p className="my-8 leading-relaxed">
              Mẹo vặt có thể giúp bạn có thể lựa chọn được phòng phù hợp và các
              mẹo khác giúp bạn thích nghi với nơi mới...
            </p>
            <button className="bg-primary cursor-pointer text-white border-none px-8 py-2 rounded text-lg">
              Xem ngay
            </button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col pl-8">
          <div className="flex gap-4 p-4 ">
            <img className="house-frame w-1/2 aspect-square" src={tips1} alt="" />
            <div>
              <h4 className="uppercase text-xl">11 bước cần làm khi thuê trọ</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Veritatis quod cum laboriosam perspiciatis quam aperiam architecto
                repellendus iste eum magni.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 ">
            <img className="house-frame w-1/2 aspect-square" src={tips2} alt="" />
            <div>
              <h4 className="uppercase text-xl">11 bước cần làm khi thuê trọ</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Veritatis quod cum laboriosam perspiciatis quam aperiam architecto
                repellendus iste eum magni.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 ">
            <img className="house-frame w-1/2 aspect-square" src={tips3} alt="" />
            <div>
              <h4 className="uppercase text-xl">11 bước cần làm khi thuê trọ</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Veritatis quod cum laboriosam perspiciatis quam aperiam architecto
                repellendus iste eum magni.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default TipsToStay;
