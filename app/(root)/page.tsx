import Banner from "@/components/custom/home/banner";
import BrandSwiper from "@/components/custom/home/brandsSwiper";
import FeatureCards from "@/components/custom/home/featureCard";
import Hero from "@/components/custom/home/hero";
import ProductSwiper from "@/components/custom/product/productSwiper";
import { getSearchProducts } from "@/lib/api/apiProducts";
import { auth } from "@/lib/auth";
import getLocaleStrings from "@/localization";

export default async function Home() {
  const res = await auth();
  const locals = await getLocaleStrings();
  const searchProducts = await getSearchProducts();
  return (
    <>
      <Hero />
      <FeatureCards />
      <ProductSwiper headLine={locals.offers} products={searchProducts} />
      {/* <BrandSwiper
        headLine="Browse all"
        highlight="Categories"
        subHeadign="Choose from a wide range of medicines, health products, and personal care products – everything you need in one place."
      /> */}
      {/* <ProductSwiper products={searchProducts} headLine="Unique Products" /> */}
      {/* <BrandSwiper headLine="" highlight="Brands" subHeadign="" /> */}
      {/* <ProductSwiper products={searchProducts} headLine="Top Rated Products" /> */}
      {/* <Banner /> */}
      {/* <BrandSwiper headLine="Top" highlight="Rated Brands" subHeadign="" /> */}
      {/* <ProductSwiper
        products={searchProducts}
        headLine="Top Selling Products"
      /> */}
    </>
  );
}
