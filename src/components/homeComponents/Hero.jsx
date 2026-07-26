import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Fresh Vegetables & Fruits",
      subtitle: "Get up to 30% OFF on organic items",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      title: "Daily Breakfast & Dairy Essentials",
      subtitle: "Fresh milk, butter, and eggs delivered to your doorstep",
      image: "https://www.led.com/sites/led/files/styles/large/public/images/how-is-the-grocery-store-footprint-changing-850x567.jpg?itok=Ky-MLRIW",
      buttonText: "Explore More"
    }
  ];

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-gray-100  overflow-hidden shadow-md">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="w-full h-full bg-cover bg-center flex items-center px-8 md:px-16"
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})` }}
            >
              <div className="text-white max-w-lg">
                <span className="text-green-400 font-semibold uppercase tracking-wider text-sm md:text-base">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                  {slide.title}
                </h1>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;