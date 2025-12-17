import React from "react";
import HeroSlider from "./heroSlider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteBanners } from "@/lib/api/apiSiteInfo";
import { getLocale } from "@/localization";

const Hero = async () => {
  const lang = await getLocale();
  const siteBannersResponse = await getSiteBanners(lang);
  // console.log("site banners:", siteBannersResponse);
  return (
    <section className="relative h-screen max-h-[calc(100vh_-_8rem)] contain-layout">
      <HeroSlider banners={siteBannersResponse.data} />
    </section>
  );
};

export default Hero;
