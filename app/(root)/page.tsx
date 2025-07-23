import Banner from "@/components/custom/home/banner";
import BrandSwiper from "@/components/custom/home/brandsSwiper";
import FeatureCards from "@/components/custom/home/featureCard";
import Hero from "@/components/custom/home/hero";
import ProductSwiper from "@/components/custom/product/productSwiper";

export default async function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ProductSwiper headLine="Offers" />
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
      <ProductSwiper headLine="Top Selling Products" />
    </>
  );
}
