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
import { Pharmacy } from "@/types";
import React from "react";

interface StorePageProps {
  params: Promise<{
    id: string;
    [key: string]: string | undefined;
  }>;
}

const StorePage = async ({ params }: StorePageProps) => {
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
          headLine="Browse all"
          highlight="Categories"
          subHeadign="Choose from a wide range of medicines, health products, and personal care products – everything you need in one place."
          items={pharmacyCategories}
        />
      )}
      {pharmacyFeatured && pharmacyFeatured.length > 0 && (
        <ProductSwiper headLine="Unique Products" products={pharmacyFeatured} />
      )}
      {pharmacyBrands && pharmacyBrands.length > 0 && (
        <BrandSwiper
          headLine=""
          highlight="Brands"
          subHeadign=""
          items={pharmacyBrands}
        />
      )}
      {pharmacyTopSelling && pharmacyTopSelling.length > 0 && (
        <ProductSwiper
          products={pharmacyTopSelling}
          headLine="Top Rated Products"
        />
      )}
      {/* <Banner /> */}
      {/* <BrandSwiper headLine="Top" highlight="Rated Brands" subHeadign="" /> */}
      {pharmacyTopRates && pharmacyTopRates.length > 0 && (
        <ProductSwiper
          headLine="Top Selling Products"
          products={pharmacyTopRates}
        />
      )}
    </>
  );
};

export default StorePage;
