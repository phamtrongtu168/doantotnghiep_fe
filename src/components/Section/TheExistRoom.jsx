import React, { useRef } from 'react';
import item from '../../assets/images/item1.png';
import turnleft from '../../assets/icons/turnleft-icon.svg';
import turnright from '../../assets/icons/turnright-icon.svg';
import { Element } from "react-scroll";


const TheExistRoom = () => {
    const containerRef = useRef(null);

    const handleTurnLeft = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const scrollAmount = containerWidth / 5; // Cuộn 1/5 chiều rộng

            containerRef.current.scrollBy({
                left: -scrollAmount, // Cuộn sang trái
                behavior: 'smooth',
            });
        }
    };

    // Hàm cuộn sang phải (1/5 chiều rộng)
    const handleTurnRight = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const scrollAmount = containerWidth / 5; // Cuộn 1/5 chiều rộng

            containerRef.current.scrollBy({
                left: scrollAmount, // Cuộn sang phải
                behavior: 'smooth',
            });
        }
    };
    return (
        <Element name='the-exist-room'>
            <section id="topElement" className='mt-36'>
                <h1 className='text-center uppercase my-4 text-4xl pt-8'>Phòng hiện có</h1>
                <p className='text-center'>Các phòng đa dạng với sức chứa khác nhau.</p>
                <div className='relative'>
                    <div ref={containerRef} className='flex scroll-hidden gap-4 justify-between my-16'>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>
                        <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-1/5'>
                            <img className='rounded-lg aspect-[13/10] w-full' src={item} alt="" />
                            <figcaption className='p-2'>
                                <strong className='block'>3.000.000vnd/tháng</strong>
                                <p className='my-2'>AnThuong09 Apartment</p>
                                <p className='my-2'>09 An thượng 1 - Ngũ Hành Sơn</p>
                                <p className='my-2'>1 bed - bath</p>
                                <button className='w-full cursor-pointer mt-2 text-base p-0.5 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white '>Đặt phòng</button>
                            </figcaption>
                        </div>

                    </div>
                    <div className='absolute top-1/2 -left-2' style={{ transform: 'translateY(-50%)' }}>
                        <img onClick={handleTurnLeft} className='max-w-16 cursor-pointer' src={turnleft} alt="" />
                    </div>
                    <div className='absolute top-1/2 -right-2' style={{ transform: 'translateY(-50%)' }}>
                        <img onClick={handleTurnRight} className='max-w-16 cursor-pointer' src={turnright} alt="" />
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default TheExistRoom;