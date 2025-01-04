import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import RoomCard from "../../ui/RoomCard";

function RoomPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [roomsPerPage] = useState(6); // Số phòng hiển thị mỗi trang
  const location = useLocation();
  const dataRooms = location.state?.data || [];

  useEffect(() => {
    setSortedRooms(dataRooms);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    let sorted = [...dataRooms];

    if (sortValue === "low-to-high") {
      sorted.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortValue === "high-to-low") {
      sorted.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    setSortedRooms(sorted);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi sắp xếp
  };

  // Tính toán danh sách phòng thuộc trang hiện tại
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div className="px-16">
      <div className="flex justify-between bg-[#e1e1e1] p-3 rounded-md my-4">
        <p className="text-lg text-zinc-600">{dataRooms.length} Phòng</p>
        <div className="flex gap-2">
          <p className="text-lg text-zinc-600">Sắp xếp:</p>
          <select
            onChange={handleSortChange}
            className="bg-transparent border-none text-primary outline-none text-lg cursor-pointer"
          >
            <option value="">Mặc định</option>
            <option value="low-to-high">Giá (Thấp - Cao)</option>
            <option value="high-to-low">Giá (Cao - Thấp)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-12">
        {currentRooms.map((room, index) => (
          <RoomCard
            key={index}
            link={`/room/${room?.id}`}
            image={room?.images[0]?.image_url}
            price={room.price}
            name={room.name}
            address={room.address}
            details={room.details}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedRooms.length / roomsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RoomPage;
