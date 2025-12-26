"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { siteBannerT } from "@/types";
import { Pagination } from "swiper/modules";

export default function StoreHeroSwiper({
  banners,
}: {
  banners: siteBannerT[];
}) {
  if (!banners || banners.length === 0) {
    return (
      <Image
        src="/images/uploads/store-hero.jpg"
        fill
        alt="Store Hero"
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 z-0">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="heroCarousel h-full"
        watchSlidesProgress={true}
        speed={600}
      >
        {banners && banners.length > 0 ? (
          banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={banner.path || "/images/banners/Hero.png"}
                fill
                alt={banner.banner_head_text || "hero"}
                className="object-cover object-center"
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "low"}
                quality={85}
                sizes="100vw"
                onError={(e) => {
                  e.currentTarget.src = "/images/banners/Hero.png";
                }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
              <div className="absolute z-10 flex-center h-full w-full pointer-events-none">
                <div className="wrapper ">
                  <div className="flex flex-col text-gray-700 dark:text-gray-300 py-10 justify-center gap-6 h-full max-w-[740px] bg-white/70 backdrop-blur-sm dark:bg-black/30 px-4 sm:px-6 md:px-8 lg:px-10 pointer-events-auto rounded-md will-change-transform">
                    <h1 className="text-teal-600 text-xl sm:text-3xl lg:text-5xl font-semibold lg:leading-20 drop-shadow-md">
                      {banner.banner_head_text}
                    </h1>
                    <div className="space-y-6">
                      <h2 className="md:text-xl font-medium drop-shadow-sm text-gray-100">
                        {banner.banner_head_detail_text}
                      </h2>
                    </div>
                    {/* <Button asChild>
                      <Link
                        href="/products"
                        className=" w-fit pointer-events-auto"
                      >
                        <span className="text-lg leading-1 font-sans">
                          {t("buyNow")}
                        </span>
                        <ArrowRight className="auto-dir" />
                      </Link>
                    </Button> */}
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
}
