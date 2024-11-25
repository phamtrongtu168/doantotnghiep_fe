import React, { useState } from 'react';
import Slider from 'react-slick';
import RoomDetail from '../../components/Section/RoomDetail';
import bgPlaceholder from '../../assets/images/background-xam.jpg';

function RoomDetailPage(props) {
    // Mảng các đường dẫn ảnh
    const imageUrls = [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5'
    ];

    const settings = {
        infinite: true, // Vòng lặp vô tận
        speed: 500, // Tốc độ chuyển slide
        slidesToShow: 3, // Số ảnh hiển thị cùng lúc
        slidesToScroll: 1, // Số ảnh cuộn mỗi lần
    };

    return (
        <>
            <Slider {...settings}>
                {imageUrls.map((url, index) => {
                    const [isLoaded, setIsLoaded] = useState(false);

                    return (
                        <div key={index} className="w-max">
                            <img
                                src={isLoaded ? url : bgPlaceholder} // Hiển thị ảnh hoặc placeholder
                                alt={`Slide ${index + 1}`}
                                onLoad={() => setIsLoaded(true)} // Đổi trạng thái khi ảnh tải xong
                                className="w-full h-auto px-1 aspect-[3/2]"
                            />
                        </div>
                    );
                })}
            </Slider>
            <RoomDetail />
        </>
    );
}

export default RoomDetailPage;
