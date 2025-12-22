"use client";
import { siteBannerT } from "@/types";
import React from "react";
import StoreHeroSwiper from "./StoreHeroSwiper";

const StoreHeroClient = ({ banners }: { banners: siteBannerT[] }) => {
  return <StoreHeroSwiper banners={banners} />;
};

export default StoreHeroClient;
