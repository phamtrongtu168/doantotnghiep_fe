import React, { useRef } from "react";
import item from "../../assets/images/item1.png";
import turnleft from "../../assets/icons/turnleft-icon.svg";
import turnright from "../../assets/icons/turnright-icon.svg";
import { Element } from "react-scroll";
import { useQuery } from "react-query";
import { getRoomAvailable } from "../../services/api/RoomService";
import RoomCard from "../../ui/RoomCard";

const TheExistRoom = () => {
  const { data: rooms } = useQuery({
    queryKey: ["room-list-1"],
    queryFn: () => getRoomAvailable(),
  });
  const containerRef = useRef(null);

  const handleTurnLeft = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollAmount = containerWidth / 5; // Cuộn 1/5 chiều rộng

      containerRef.current.scrollBy({
        left: -scrollAmount, // Cuộn sang trái
        behavior: "smooth",
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
        behavior: "smooth",
      });
    }
  };
  console.log(rooms);
  return (
    <Element name="the-exist-room">
      <section id="topElement" className="mt-36">
        <h1 className="text-center uppercase my-4 text-4xl pt-8">
          Phòng hiện có
        </h1>
        <p className="text-center">Các phòng đa dạng với sức chứa khác nhau.</p>
        <div className="relative">
          <div
            ref={containerRef}
            className="flex scroll-hidden gap-4 justify-between my-16 "
          >
            {rooms &&
              rooms?.map((room, index) => (
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
          {rooms?.length > 5 && (
            <>
              <div
                className="absolute top-1/2 -left-2"
                style={{ transform: "translateY(-50%)" }}
              >
                <img
                  onClick={handleTurnLeft}
                  className="max-w-16 cursor-pointer"
                  src={turnleft}
                  alt=""
                />
              </div>
              <div
                className="absolute top-1/2 -right-2"
                style={{ transform: "translateY(-50%)" }}
              >
                <img
                  onClick={handleTurnRight}
                  className="max-w-16 cursor-pointer"
                  src={turnright}
                  alt=""
                />
              </div>
            </>
          )}
        </div>
      </section>
    </Element>
  );
};

export default TheExistRoom;
