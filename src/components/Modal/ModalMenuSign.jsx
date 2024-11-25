import React, { useEffect, useState } from 'react';

const ModalMenuSign = ({ isOpen, typeModal, onClose }) => {
    console.log(typeModal);
    const [typeModalSign, setTypeModalSign] = useState(0);
    console.log(typeModalSign);
    
    useEffect(() => {
        setTypeModalSign(typeModal)
    }, [typeModal]);
    
    if (!isOpen) return null;

    return (
        <div className='fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center' onClick={onClose}>
            <div className='min-w-96 w-max' onClick={(e) => e.stopPropagation()}>
                {
                    typeModalSign == 1 &&
                    <div className='bg-white p-8 rounded-lg'>
                        <h2 className='text-center mb-8 font-normal text-zinc-500'>Đăng ký</h2>
                        <form action="" className='flex flex-col gap-4'>
                            <label htmlFor="" className='flex gap-2'>
                                <input className='p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Họ' />
                                <input className='p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Tên' />
                            </label>
                            <label htmlFor="">
                                <input className='w-full p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Tên đăng nhập' />
                            </label>
                            <label htmlFor="">
                                <input className='w-full p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Mật Khẩu' />
                            </label>
                            <label htmlFor="">
                                <input className='w-full p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Xác Nhận Mật Khẩu' />
                            </label>
                            <button className='p-2.5 bg-primary text-white rounded-md border-none font-bold text-base'>Đăng ký</button>
                        </form>
                        <p className='text-center my-8'>Bạn đã có tài khoản? <strong className='text-primary cursor-pointer' onClick={()=>setTypeModalSign(2)}>Đăng nhập ngay.</strong> </p>
                    </div>
                }
                {typeModalSign == 2 &&
                    <div className='bg-white p-8 rounded-lg'>
                        <h2 className='text-center mb-8 font-normal text-zinc-500'>Đăng nhập</h2>
                        <form action="" className='flex flex-col gap-4'>
                            <label htmlFor="">
                                <input className='w-full p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Tên đăng nhập' />
                            </label>
                            <label htmlFor="">
                                <input className='w-full p-3 rounded-md border-zinc-400 border outline-none' type="text" placeholder='Mật Khẩu' />
                            </label>
                            <button className='p-2.5 bg-primary text-white rounded-md border-none font-bold text-base'>Đăng nhập</button>
                        </form>
                        <p className='text-right my-4 text-primary'>Quên mật khẩu?</p>
                        <p className='text-center my-8'>Bạn chưa có tài khoản? <strong className='text-primary cursor-pointer' onClick={()=>setTypeModalSign(1)}>Tạo tài khoản.</strong> </p>
                    </div>
                }
            </div>
        </div>
    );
};

export default ModalMenuSign;