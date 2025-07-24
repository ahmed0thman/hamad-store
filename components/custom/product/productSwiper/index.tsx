import React from "react";
import ProductCard from "../productCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductSwiper = ({ headLine }: { headLine: string }) => {
  return (
    <section className="py-6">
      <div className="wrapper !px-8">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between gap-6 items-center mb-4">
            <h3 className="text-gray-700 font-semibold text-xl lg:text-3xl dark:text-slate-400">
              {headLine}
            </h3>
            <Button variant="ghost" asChild className="!text-primary">
              <Link
                href=""
                className="flex items-center gap-1  font-sans !text-sm"
              >
                <span>Show all</span>
                <ArrowRight className="auto-dir" />
              </Link>
            </Button>
          </div>
        </div>
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-10/12 sm:w-11/12 mx-auto"
        >
          <CarouselContent className="-ms-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="ps-1 sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1 flex-center sm:!block">
                  <ProductCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSwiper;
