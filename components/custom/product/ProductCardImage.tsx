"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductCardImageProps {
  src: string;
  alt: string;
}

export default function ProductCardImage({ src, alt }: ProductCardImageProps) {
  const [imgSrc, setImgSrc] = useState(src || "/images/no-image.jpg");
  return (
    <Image
      src={imgSrc}
      alt={imgSrc === "/images/no-image.jpg" ? "No image available" : alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover rounded-md"
      loading="lazy"
      onError={() => {
        if (imgSrc !== "/images/no-image.jpg")
          setImgSrc("/images/no-image.jpg");
      }}
    />
  );
}
