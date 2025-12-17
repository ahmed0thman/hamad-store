import FeatureCards from "@/components/custom/home/featureCard";
import Hero from "@/components/custom/home/hero";
import {
  getAllCategories,
  getBrandsBytitle,
  getProductsBytitle,
} from "@/lib/api/apiProducts";
import { auth } from "@/lib/auth";
import { homeSEO } from "@/lib/seo";
import getLocaleStrings from "@/localization";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const BrandSwiper = dynamic(
  () => import("@/components/custom/home/brandsSwiper"),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted" />,
  }
);
const ProductSwiper = dynamic(
  () => import("@/components/custom/product/productSwiper"),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted" />,
  }
);

export const metadata = homeSEO;

export default async function Home() {
  const session = await auth();
  console.log("token:", session?.accessToken);
  console.log("user data:", session?.user);
  const locals = await getLocaleStrings();
  // Get Products
  const offersProducts = await getProductsBytitle("offers");
  const uniqueProducts = await getProductsBytitle("features");
  const topRatesProducts = await getProductsBytitle("top-rates");
  const topSellingProducts = await getProductsBytitle("top-selling");
  // Get Categories
  const homeCategories = await getAllCategories();
  // Get Brands
  const brandCategories = await getBrandsBytitle();

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
