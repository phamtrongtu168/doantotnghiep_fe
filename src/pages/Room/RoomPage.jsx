import { useState } from "react";
import { rooms } from "../../data";
import Pagination from "../../ui/Pagination";
import RoomCard from "../../ui/RoomCard";
import { useLocation } from "react-router-dom";


function RoomPage(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const dataRooms = location.state?.data;

    const handlePageChange = (page) => {
      console.log("Page:", page);
      setCurrentPage(page);
    };
    console.log(dataRooms)
    return (
        <div className='px-16'>
            <div className='flex justify-between bg-[#e1e1e1] p-3 rounded-md my-4'>
                <p className='text-lg text-zinc-600'>306 Phòng</p>
                <div className='flex gap-2'>
                    <p className='text-lg text-zinc-600'>Sắp xếp:</p>
                    <select className='bg-transparent border-none text-primary outline-none text-lg'>
                        <option className='' value="">Giá (Thấp - Cao)</option>
                        <option className='' value="">Giá (Cao - Thấp)</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-12'>
                {dataRooms?.map((room, index) => (
                    <RoomCard
                        key={index}
                        link={room.link}
                        imageSrc={room.imageSrc}
                        price={room.price}
                        name={room.name}
                        address={room.address}
                        details={room.details}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default RoomPage;