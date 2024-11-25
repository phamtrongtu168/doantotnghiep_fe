import { packages, reasons, steps } from "../../data";

function UtilitiesPage(props) {
  return (
    <div>
      <main>
        <div className="relative">
          <img
            className="w-full aspect-[7/2] object-cover"
            src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div
            className=" absolute top-1/2 left-1/2 flex flex-col w-1/2 justify-center items-center gap-5"
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <h2 className="text-7xl md:text-6xl uppercase  text-white text-shadow w-full leading-snug text-center ">
              DỊCH VỤ CHUYỂN TRỌ CHUYÊN NGHIỆP
            </h2>

            <button className="w-max px-7 p-1 bg-[#4561ec] border-2 border-[#4561ec] text-white text-2xl rounded-lg cursor-pointer hover:bg-white hover:text-[#4561ec]">
              Xem Các Gói
            </button>
          </div>
        </div>
        <div className="mb-16 mt-10 px-32">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Tại sao lại chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div key={index} className="p-6 bg-gray-400 rounded-lg">
                <h3 className="font-bold mb-2 text-center">{reason.title}</h3>
                <p className="text-sm text-gray-600 text-center">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        ;
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Lựa chọn gói dịch vụ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-300 px-32 py-10">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg text-center bg-white"
              >
                <h3 className="font-bold mb-4">{pkg.name}</h3>
                <p className="text-sm mb-4">{pkg.description}</p>
                <p className="text-xl font-bold text-blue-600 mb-4">
                  {pkg.price}
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 cursor-pointer border-0">
                  Chọn Gói
                </button>
              </div>
            ))}
          </div>
        </div>
        ;
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
        ;
      </main>
    </div>
  );
}

export default UtilitiesPage;
