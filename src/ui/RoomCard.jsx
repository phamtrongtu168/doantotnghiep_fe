import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ link, imageSrc, price, name, address, details }) => {
  return (
    <div className='bg-[#e8e8e8] rounded-lg min-w-64 w-full'>
      <Link to={link}>
        <img className='rounded-lg aspect-[13/10] w-full' src={imageSrc} alt={name} />
      </Link>
      <figcaption className='p-2'>
        <strong className='block'>{price}</strong>
        <p className='my-2'>{name}</p>
        <p className='my-2'>{address}</p>
        <p className='my-2'>{details}</p>
        <button className='w-full text-base cursor-pointer mt-2 p-1 rounded text-primary border-[2px] border-solid border-primary hover:bg-primary hover:text-white'>
          Đặt phòng
        </button>
      </figcaption>
    </div>
  );
};

export default RoomCard;
