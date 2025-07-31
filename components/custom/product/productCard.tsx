"use client";

import React, { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { formatCurrencyEGP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductItem } from "@/types";
import StarRating from "../starRating";

const ProductCard = ({ productItem }: { productItem: ProductItem }) => {
  const [favorite, setFavorite] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    if (!productItem.image || productItem.image.trim() === "") {
      setIsValidImage(false);
      return;
    }
    const img = new window.Image();
    img.src = productItem.image;
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
  }, [productItem.image]);

  const image = isValidImage ? productItem.image : "/images/no-image.jpg";

  return (
    <div className="bg-stone-100 dark:bg-slate-800 rounded-lg shadow-md p-6 pt-12 max-w-sm h-full max-h-[500px] relative flex flex-col">
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
          src={image || "/images/no-image.jpg"}
          fill
          alt="img"
          className="w-full  object-cover rounded-md"
        />
      </div>

      <div className="space-y-3 mt-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground">
          {productItem.name}
        </h3>

        <div className="flex  gap-4 justify-between">
          <div className="flex flex-col ">
            {productItem.offer ? (
              <>
                <span className="line-through text-gray-500 text-sm">
                  {formatCurrencyEGP(productItem.offer?.price_before as number)}
                </span>
                <span className="text-foreground font-semibold text-lg">
                  {formatCurrencyEGP(productItem.offer?.price_after as number)}
                </span>
              </>
            ) : (
              <span className="text-foreground font-semibold text-xl">
                {formatCurrencyEGP(productItem.price as number)}
              </span>
            )}
          </div>

          <div className="flex items-end flex-col gap-2">
            <div className="flex items-center text-yellow-500">
              <StarRating
                value={productItem.average_rating.user}
                outOf={5}
                readOnly
                color="text-yellow-500"
                filledOnly
              />
            </div>

            <div className="flex items-center text-green-500">
              <StarRating
                value={productItem.average_rating.pharmacist}
                outOf={5}
                readOnly
                color="text-green-500"
                filledOnly
              />
            </div>
          </div>
        </div>
        <div className="flex items-center  gap-4 mt-auto">
          <Button
            asChild
            className="flex-grow-1 text-stone-100 font-medium text-base"
          >
            <Link href={`/product/${productItem.id}`}>اشتري</Link>
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
