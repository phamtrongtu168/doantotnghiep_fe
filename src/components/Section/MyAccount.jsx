import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";

function MyAccount(props) {
    const [positionNum, setPositionNum] = useState(1);

    return (
        <section className='border-0 border-t border-solid border-zinc-400 flex'>
            <aside className='bg-zinc-100 max-w-96 border-0 border-r border-solid border-zinc-400'>
                <div className='border-0 border-b border-solid border-zinc-400 text-center p-4'>
                    <FaUser size={32} color='blue' />
                    <h4 className='text-primary text-xl'>Phạm Tứ</h4>
                </div>
                <div className=''>
                    <h3 onClick={() => setPositionNum(1)} className='border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400'>Thông tin tài khoản</h3>
                    <h3 onClick={() => setPositionNum(2)} className='border-0 border-b border-solid font-normal hover:underline cursor-pointer py-3 px-6 border-zinc-400'>Trọ của tôi</h3>
                </div>

            </aside>
            <div className='p-8 flex-1 min-h-[82vh]'>
                {
                    positionNum === 1 &&
                    <>
                        <h2 className='mb-8 text-zinc-600'>Thông tin</h2>
                        <form action="">
                            <b className='text-zinc-600'>Tên tài khoản</b>
                            <div className='my-2 flex gap-2'><p>phamtrongtu</p><span className='text-primary'>Edit</span></div>
                            <b className='text-zinc-600'>Mật khẩu</b>
                            <div className='my-2 flex gap-2'><p>*************</p><span className='text-primary'>Edit</span></div>

                            <label className='flex flex-col gap-2 my-2' htmlFor="">
                                <span>Số điện thoại</span>
                                <input className='p-2 rounded border-zinc-400 w-1/3 outline-none' type="text" />
                            </label>
                            <label className='flex flex-col gap-2 my-2' htmlFor="">
                                <span>Số điện thoại</span>
                                <input className='p-2 rounded border-zinc-400 w-1/3 outline-none' type="text" />
                            </label>
                        </form>
                    </>
                }
                {
                    positionNum === 2 &&
                    <>
                        <h2 className='mb-8 text-zinc-600'>Trọ của tôi</h2>
                        <h2 className='uppercase'>Tên phòng: Phòng A101</h2>
                        <div className='flex flex-col gap-2 my-4'>
                            <div className='flex gap-4'>
                                <b>Địa chỉ:</b>
                                <p className='text-zinc-600'>09 An Thượng 09, Ngũ Hành Sơn, Đà Nẵng</p>
                            </div>
                            <div className='flex gap-4'>
                                <b>Giá thuê:</b>
                                <p className='text-zinc-600'>3.000.000 VNĐ</p>
                            </div>
                            <div className='flex gap-4'>
                                <b>Ngày bắt đầu hợp đồng:</b>
                                <p className='text-zinc-600'>16/09/2023</p>
                            </div>
                            <div className='flex gap-4'>
                                <b>Ngày kết thúc hợp đồng:</b>
                                <p className='text-zinc-600'>16/09/2024</p>
                            </div>
                        </div>

                    </>
                }
            </div>
        </section>
    );
}

export default MyAccount;