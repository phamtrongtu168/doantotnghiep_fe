import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-8">
      {/* Container with overflow hidden */}
      <div className="overflow-hidden">
        {/* Image container */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 75}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-[75%] flex-shrink-0 p-2.5">
              {/* Image frame */}
              <div className="relative w-full pb-[111.11%] overflow-hidden rounded-l">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl border-2 border-solid border-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-8 transform -translate-y-1/2 p-2 bg-transparent border-none rounded-full shadow-lg cursor-pointer z-10"
      >
        <FaChevronLeft size={32} color="white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-8 transform -translate-y-1/2 p-2 bg-transparent border-none rounded-full shadow-lg cursor-pointer z-10"
      >
        <FaChevronRight size={32} color="white" />
      </button>
    </div>
  );
};

export default ImageSlider;
