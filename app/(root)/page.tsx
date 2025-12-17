import Hero from "@/components/custom/home/hero";
import FeatureCards from "@/components/custom/home/featureCard";
import {
  getAllCategories,
  getBrandsBytitle,
  getProductsBytitle,
} from "@/lib/api/apiProducts";
import { auth } from "@/lib/auth";
import { homeSEO } from "@/lib/seo";
import getLocaleStrings from "@/localization";
import dynamic from "next/dynamic";

// Only lazy load heavy Swipers that are far below the fold
const BrandSwiper = dynamic(
  () => import("@/components/custom/home/brandsSwiper")
);
const ProductSwiper = dynamic(
  () => import("@/components/custom/product/productSwiper")
);

export const metadata = homeSEO;

export default async function Home() {
  const session = await auth();
  const locals = await getLocaleStrings();

  // Parallel data fetching to reduce loading time
  const [
    offersProducts,
    uniqueProducts,
    topRatesProducts,
    topSellingProducts,
    homeCategories,
    brandCategories,
  ] = await Promise.all([
    getProductsBytitle("offers"),
    getProductsBytitle("features"),
    getProductsBytitle("top-rates"),
    getProductsBytitle("top-selling"),
    getAllCategories(),
    getBrandsBytitle(),
  ]);

  return (
    <>
      <Hero />
      <FeatureCards />
      {offersProducts && offersProducts.length > 0 && (
        <ProductSwiper
          headLine={locals.offers}
          products={offersProducts}
          showAll
        />
      )}
      <BrandSwiper
        items={homeCategories}
        headLine={locals.browseAll}
        highlight={locals.categories}
        subHeadign={locals.categoriesSubheading}
      />
      {uniqueProducts && uniqueProducts.length > 0 && (
        <ProductSwiper
          products={uniqueProducts}
          headLine={locals.uniqueProducts}
          showAll
        />
      )}
      <BrandSwiper
        items={brandCategories}
        headLine={locals.browseAll}
        highlight={locals.brands}
        subHeadign={locals.brandsSubheading}
      />
      {topRatesProducts && topRatesProducts.length > 0 && (
        <ProductSwiper
          products={topRatesProducts}
          headLine={locals.topRatedProducts}
          showAll
        />
      )}
      {/* <Banner /> */}
      <BrandSwiper
        items={brandCategories}
        headLine={locals.top}
        highlight={locals.ratedBrands}
        subHeadign=""
      />
      {topSellingProducts && topSellingProducts.length > 0 && (
        <ProductSwiper
          products={topSellingProducts}
          headLine={locals.topSellingProducts}
          showAll
        />
      )}
    </>
  );
}
