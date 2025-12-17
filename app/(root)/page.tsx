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
import { Suspense } from "react";

// Lazy load below-the-fold components to reduce initial JavaScript
const FeatureCards = dynamic(
  () => import("@/components/custom/home/featureCard"),
  {
    loading: () => <div className="h-64 animate-pulse bg-muted" />,
  }
);
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
      <Suspense
        fallback={
          <div className="h-64 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        <FeatureCards />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        {offersProducts && offersProducts.length > 0 && (
          <ProductSwiper
            headLine={locals.offers}
            products={offersProducts}
            showAll
          />
        )}
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        <BrandSwiper
          items={homeCategories}
          headLine={locals.browseAll}
          highlight={locals.categories}
          subHeadign={locals.categoriesSubheading}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        {uniqueProducts && uniqueProducts.length > 0 && (
          <ProductSwiper
            products={uniqueProducts}
            headLine={locals.uniqueProducts}
            showAll
          />
        )}
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        <BrandSwiper
          items={brandCategories}
          headLine={locals.browseAll}
          highlight={locals.brands}
          subHeadign={locals.brandsSubheading}
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        {topRatesProducts && topRatesProducts.length > 0 && (
          <ProductSwiper
            products={topRatesProducts}
            headLine={locals.topRatedProducts}
            showAll
          />
        )}
      </Suspense>
      {/* <Banner /> */}
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        <BrandSwiper
          items={brandCategories}
          headLine={locals.top}
          highlight={locals.ratedBrands}
          subHeadign=""
        />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-muted rounded-lg m-4" />
        }
      >
        {topSellingProducts && topSellingProducts.length > 0 && (
          <ProductSwiper
            products={topSellingProducts}
            headLine={locals.topSellingProducts}
            showAll
          />
        )}
      </Suspense>
    </>
  );
}
