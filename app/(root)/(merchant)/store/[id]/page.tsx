import Banner from "@/components/custom/home/banner";
import BrandSwiper from "@/components/custom/home/brandsSwiper";
import ProductSwiper from "@/components/custom/product/productSwiper";
import StoreHero from "@/components/custom/store/storeHero";
import React from "react";

const StorePage = () => {
  return (
    <>
      <StoreHero />
      {/* <ProductSwiper headLine="Offers" />
      <BrandSwiper
        headLine="Browse all"
        highlight="Categories"
        subHeadign="Choose from a wide range of medicines, health products, and personal care products – everything you need in one place."
      />
      <ProductSwiper headLine="Unique Products" />
      <BrandSwiper headLine="" highlight="Brands" subHeadign="" />
      <ProductSwiper headLine="Top Rated Products" />
      <Banner />
      <BrandSwiper headLine="Top" highlight="Rated Brands" subHeadign="" />
      <ProductSwiper headLine="Top Selling Products" /> */}
    </>
  );
};

export default StorePage;
