"use client";
import Image from "next/image";

interface ProductCardImageProps {
  src: string;
  alt: string;
}

export default function ProductCardImage({ src, alt }: ProductCardImageProps) {
  return (
    <Image
      src={src || "/images/no-image.jpg"}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover rounded-md"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "/images/no-image.jpg";
      }}
    />
  );
}
