import { services, steps } from "../../data";

function AboutPage(props) {
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
              DỊCH VỤ SỮA CHỮA <br />
              24/7
            </h2>

            <button className="w-max px-7 p-1 bg-[#4561ec] border-2 border-[#4561ec] text-white text-2xl rounded-lg cursor-pointer hover:bg-white hover:text-[#4561ec]">
              Xem Các Gói
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Các gói dịch vụ sửa chữa.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden pb-4"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-lg text-gray-600 text-center">
                    {service.desc}
                  </p>

                  <p className="text-2xl font-bold text-center py-2">
                    {service.price}
                  </p>
                  <button className="mt-4 w-max text-sm bg-blue-500 text-white py-2 rounded-md border-2 border-transparent  px-6 float-right cursor-pointer hover:bg-white hover:text-blue-500 hover:border-solid hover:border-2 hover:border-blue-500">
                    Đặt Lịch
                  </button>
                </div>
              </div>
            ))}
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
      </main>
    </div>
  );
}

export default AboutPage;
