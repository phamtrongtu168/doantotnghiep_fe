import { steps } from "../../data";


function CleaningServicePage(props) {
    return (
        <>
            <div className="relative">
                <img className="w-full aspect-[7/2]" src="https://picsum.photos/1600/400?random=1" alt="" />
                <h2
                    className="absolute top-1/2 left-0 uppercase text-center w-full text-6xl text-white text-shadow w-1/2 leading-snug"
                    style={{ transform: 'translateY(-50%)' }}
                >
                    Dịch vụ dọn dẹp
                </h2>
            </div>
            <div className=''>
                <h2 className='text-primary text-4xl text-center my-4'>Liên hệ đặt dịch vụ</h2>
                <div className='bg-zinc-200 p-2'>
                    <form action="" className='flex flex-col gap-4 my-4 max-w-md mx-auto'>
                        <input className='py-3 px-4 text-lg border rounded border-black outline-none' type="text" placeholder='Tên' />
                        <input className='py-3 px-4 text-lg border rounded border-black outline-none' type="text" placeholder='Email' />
                        <input className='py-3 px-4 text-lg border rounded border-black outline-none' type="text" placeholder='Số điện thoại' />
                        <input className='py-3 px-4 text-lg border rounded border-black outline-none' type="text" placeholder='Điện chỉ' />
                        <input className='py-3 px-4 text-lg border rounded border-black outline-none' type="text" placeholder='Ghi chú' />
                        <button className='py-2 px-10 mx-auto bg-primary text-white cursor-pointer border-none rounded text-lg w-max'>Đặt lịch</button>
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