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
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteBannerT } from "@/types";

const HeroSlider = ({ banners }: { banners?: siteBannerT[] }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="heroCarousel h-full"
      >
        {banners && banners.length > 0 ? (
          banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={banner.path || "/images/banners/Hero.png"}
                fill
                alt="hero"
                className="object-cover object-center"
                priority={true}
                onError={(e) => {
                  e.currentTarget.src = "/images/banners/Hero.png";
                }}
              />
              <div className="absolute z-10 flex-center h-full w-full pointer-events-none">
                <div className="wrapper ">
                  <div className="flex flex-col text-gray-500 py-10 justify-center gap-6 h-full max-w-[740px] bg-white/70 backdrop-blur-[3px] dark:bg-black/30 px-4 sm:px-6 md:px-8 lg:px-10 pointer-events-auto rounded-md">
                    <h1 className="text-teal-600 text-xl sm:text-3xl lg:text-5xl font-semibold lg:leading-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                      {banner.banner_head_text}
                    </h1>
                    <div className="space-y-6">
                      <h4 className="md:text-xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)] text-teal-800">
                        {banner.banner_head_detail_text}
                      </h4>
                    </div>
                    <Button asChild>
                      <Link
                        href="/products"
                        className=" w-fit pointer-events-auto"
                      >
                        <span className="text-lg leading-1 font-sans">
                          اشتري الان
                        </span>
                        <ArrowRight className="auto-dir" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className=""></div>
        )}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
