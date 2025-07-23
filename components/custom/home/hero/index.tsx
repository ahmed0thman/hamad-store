import React from "react";
import HeroSlider from "./heroSlider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen max-h-[calc(100vh_-_8rem)]">
      <HeroSlider />
      <div className="absolute z-10 h-full w-full pointer-events-none">
        <div className="wrapper h-full ">
          <div className="flex flex-col text-gray-500 py-10 justify-center gap-6 h-full max-w-[640px]">
            <h3 className="text-2xl font-medium">اهلا بك في صيدليتك</h3>
            <h1 className="text-teal-600 text-4xl sm:text-5xl lg:text-7xl font-semibold lg:leading-20">
              كل احتياجاتك الطبية في مكان واحد
            </h1>
            <div className="space-y-6">
              <h2 className="text-xl md:text-3xl leading-10">
                خصم يصل إلى 30٪
              </h2>
              <h4 className="md:text-xl font-medium">
                شحن مجاني على جميع طلباتك. نحن نوصل، وأنت تستمتع
              </h4>
            </div>
            <Button asChild>
              <Link href="/products" className=" w-fit pointer-events-auto">
                <span className="text-lg leading-1 font-sans">اشتري الان</span>
                <ArrowRight className="auto-dir" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
