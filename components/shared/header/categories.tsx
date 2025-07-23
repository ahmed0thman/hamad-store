import { pharmacyCategories } from "@/lib/sampleData";
import Link from "next/link";
import React from "react";

export const Categories = () => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-primary font-sans">
      {pharmacyCategories.map((ele) => (
        <Link
          key={`/products/${ele.href}`}
          href={`/products/${ele.href}`}
          className="text-stone-200 font-medium p-2"
        >
          {ele.name}
        </Link>
      ))}
    </div>
  );
};
