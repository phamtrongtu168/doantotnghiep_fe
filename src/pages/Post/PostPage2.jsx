import React from "react";

export default function PostPage2() {
  return (
    <>
      <div
        className="bg-cover bg-center aspect-[9/2] relative"
        style={{
          backgroundImage:
            "url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-19.jpg')",
        }}
      >
        <h2 className="text-5xl p-16 absolute bottom-0 text-white text-shadow">
          Máy tính tiền thuê nhà.
        </h2>
      </div>
      <section className="p-16">
        <h2 className="text-[#2348ff] text-3xl">
          Tôi có thể mua được bao nhiêu?
        </h2>
        <form className="w-3/4">
          <div className="grid grid-cols-2 gap-8">
            <label className="flex flex-col gap-4">
              <span>Bạn đang chuyển đến thành phố nào?</span>
              <input className="text-base p-3 rounded-lg border-none bg-zinc-200 outline-zinc-600" />
            </label>
            <div className="flex flex-col gap-4">
              <span>Số phòng ngủ</span>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <input type="radio" className="hidden" />
                  <span className="p-2.5 cursor-pointer rounded-lg block bg-zinc-200">
                    1 phòng
                  </span>
                </label>
                <label className="block">
                  <input type="radio" className="hidden" />
                  <span className="p-2.5 cursor-pointer rounded-lg block bg-zinc-200">
                    2 phòng
                  </span>
                </label>
                <label className="block">
                  <input type="radio" className="hidden" />
                  <span className="p-2.5 cursor-pointer rounded-lg block bg-zinc-200">
                    3 phòng
                  </span>
                </label>
                <label className="block">
                  <input type="radio" className="hidden" />
                  <span className="p-2.5 cursor-pointer rounded-lg block bg-zinc-200">
                    4 phòng
                  </span>
                </label>
              </div>
            </div>
            <label className="flex flex-col  gap-4">
              <span>Thu nhập trước thuế hàng năm</span>
              <input className="text-base p-3 rounded-lg border-none bg-zinc-200 outline-zinc-600" />
            </label>
            <label className="flex flex-col  gap-4">
              <span>Chi phí hàng tháng</span>
              <input className="text-base p-3 rounded-lg border-none bg-zinc-200 outline-zinc-600" />
            </label>
          </div>
          <button
            type="submit"
            className="mt-8 py-3 px-4 text-base rounded-lg bg-[#2348ff] border-none text-white"
          >
            Tra cứu
          </button>
        </form>
      </section>
    </>
  );
}
