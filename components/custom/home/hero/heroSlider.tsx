"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css";

import "./styles.css";
// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

const HeroSlider = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="heroCarousel h-full"
      >
        <SwiperSlide>
          <Image
            src="/images/banners/hero.png"
            fill
            alt="hero"
            className="object-cover object-center"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banners/hero.png"
            fill
            alt="hero"
            className="object-cover object-center"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banners/hero.png"
            fill
            alt="hero"
            className="object-cover object-center"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
