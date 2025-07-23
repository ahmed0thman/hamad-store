"use client";

import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { formatCurrencyEGP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCard = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="bg-stone-100 dark:bg-slate-800 rounded-lg shadow-md p-6 pt-12 max-w-sm max-h-[500px] relative">
      <button
        onClick={() => setFavorite(!favorite)}
        className="absolute top-4 end-4 text-gray-400 hover:text-red-500 focus:outline-none"
      >
        {favorite ? (
          <Heart className="fill-red-500 text-white" />
        ) : (
          <Heart className="text-gray-500" />
        )}
      </button>

      <div className="relative w-full aspect-square !max-h-[250px]">
        <Image
          src="/images/uploads/drug.jpg"
          fill
          alt="img"
          className="w-full  object-cover rounded-md"
        />
      </div>

      <div className="space-y-3 mt-5">
        <h3 className="text-lg font-semibold text-foreground">
          فانيليا نوترين لمرض السكري
        </h3>

        <div className="flex items-center gap-4 justify-between">
          <h4 className="text-xl font-bold text-primary-600">
            {formatCurrencyEGP(120)}
          </h4>

          <div className="flex items-end flex-col gap-2">
            <div className="flex items-center text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-500" />
              ))}
            </div>

            <div className="flex items-center text-green-500">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-green-500" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center  gap-4">
          <Button
            asChild
            className="flex-grow-1 text-stone-100 font-medium text-base"
          >
            <Link href={`/product/slug`}>اشتري</Link>
          </Button>
          <Button className="flex-grow-1 text-stone-100 font-medium text-base">
            مقارنة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
