import React from "react";
import tips1 from "../../assets/images/tips1.png";
import tips2 from "../../assets/images/tips2.png";
import tips3 from "../../assets/images/tips3.png";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";

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
          <Link to="/post/1">
            <div className="flex gap-4 p-4 ">
              <img
                className="house-frame w-1/2 aspect-square max-w-40"
                src={tips1}
                alt=""
              />
              <div>
                <h4 className="uppercase text-xl">
                  11 bước cần làm khi thuê trọ
                </h4>
                <p>
                  Săn tìm căn hộ có thể rất thú vị nhưng cũng đầy choáng ngợp.
                  Đơn giản hóa nhiệm vụ bằng cách tổ chức.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/post/2">
            <div className="flex gap-4 p-4 ">
              <img
                className="house-frame w-1/2 aspect-square max-w-40"
                src={tips2}
                alt=""
              />
              <div>
                <h4 className="uppercase text-xl">
                  Máy tính tiền thuê: Bạn nên chi bao nhiêu cho tiền thuê nhà?
                </h4>
                <p>
                  Hãy cho chúng tôi biết thu nhập, chi phí và vị trí mong muốn
                  của bạn. Chúng tôi sẽ giúp bạn tìm được ngân sách thuê phù
                  hợp.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/post/3">
            <div className="flex gap-4 p-4 ">
              <img
                className="house-frame w-1/2 aspect-square max-w-40"
                src={tips3}
                alt=""
              />
              <div>
                <h4 className="uppercase text-xl">
                  Cách Lựa Chọn Nơi Ở Thích Hợp Cho Công Việc Và Sinh Sống
                </h4>
                <p>
                  Lựa chọn đúng đắn từ ban đầu giúp bạn tiết kiệm thời gian và
                  tiền bạc.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </Element>
  );
};

export default TipsToStay;
