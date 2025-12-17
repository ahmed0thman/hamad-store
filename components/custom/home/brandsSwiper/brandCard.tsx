"use client";
import { Brand, category } from "@/types";
import Image from "next/image";
import Link from "next/link";

const BrandCard = ({ item }: { item: Brand | category }) => {
  const image =
    item.image && item.image.trim() !== ""
      ? item.image
      : "/images/no-image.jpg";
  return (
    <Link href={`/products?brand=${item.name}`} className="flex-center w-full">
      <div className="rounded-md w-full flex flex-col gap-3 justify-center">
        <div className="w-full aspect-square relative mx-auto">
          <Image
            src={image || "/images/no-image.jpg"}
            fill
            alt={item.name || "Brand image"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="aspect-square rounded-full border border-teal-700 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/images/no-image.jpg";
            }}
          />
        </div>

        <div className="text-center">{item.name}</div>
      </div>
    </Link>
  );
};

export default BrandCard;
