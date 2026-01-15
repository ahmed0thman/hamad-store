import Banner from "@/components/custom/home/banner";
import BrandSwiper from "@/components/custom/home/brandsSwiper";
import ProductSwiper from "@/components/custom/product/productSwiper";
import StoreHero from "@/components/custom/store/storeHero";
import {
  getPharmacyBrandsByTitle,
  getPharmacyCategories,
  getPharmacyData,
  getPharmacyProductsByTitle,
} from "@/lib/api/apiPharmacy";
import getLocaleStrings from "@/localization";
import { Pharmacy } from "@/types";
import React from "react";

interface StorePageProps {
  params: Promise<{
    id: string;
    [key: string]: string | undefined;
  }>;
}

const StorePage = async ({ params }: StorePageProps) => {
  const strings = await getLocaleStrings();
  const { id: pharmacyId } = await params;

  const [
    pharmacyData,
    pharmacyOffers,
    pharmacyFeatured,
    pharmacyTopRates,
    pharmacyTopSelling,
    pharmacyCategories,
    pharmacyBrands,
  ] = await Promise.all([
    getPharmacyData(pharmacyId),
    getPharmacyProductsByTitle("offers", pharmacyId),
    getPharmacyProductsByTitle("features", pharmacyId),
    getPharmacyProductsByTitle("top-rates", pharmacyId),
    getPharmacyProductsByTitle("top-selling", pharmacyId),
    getPharmacyCategories(pharmacyId),
    getPharmacyBrandsByTitle("brands", pharmacyId),
  ]);

  let pharmacy: Pharmacy | null = null;
  if (pharmacyData && pharmacyData.success) {
    pharmacy = pharmacyData.data;
  }

  return (
    <>
      <StoreHero pharmacy={pharmacy as Pharmacy} />
      {pharmacyOffers && pharmacyOffers.length > 0 && (
        <ProductSwiper headLine="Offers" products={pharmacyOffers} />
      )}
      {pharmacyCategories && pharmacyCategories.length > 0 && (
        <BrandSwiper
          headLine={strings.browseAll}
          highlight={strings.categories}
          subHeadign={strings.categoriesSubheading}
          items={pharmacyCategories}
        />
      )}
      {pharmacyFeatured && pharmacyFeatured.length > 0 && (
        <ProductSwiper
          headLine={strings.uniqueProducts}
          products={pharmacyFeatured}
        />
      )}
      {pharmacyBrands && pharmacyBrands.length > 0 && (
        <BrandSwiper
          headLine=""
          highlight={strings.brands}
          subHeadign=""
          items={pharmacyBrands}
        />
      )}
      {pharmacyTopSelling && pharmacyTopSelling.length > 0 && (
        <ProductSwiper
          products={pharmacyTopSelling}
          headLine={strings.topSellingProducts}
        />
      )}
      {/* <Banner /> */}
      {/* <BrandSwiper headLine="Top" highlight="Rated Brands" subHeadign="" /> */}
      {pharmacyTopRates && pharmacyTopRates.length > 0 && (
        <ProductSwiper
          headLine={strings.topRatedProducts}
          products={pharmacyTopRates}
        />
      )}
    </>
  );
};

export default StorePage;
