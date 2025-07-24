// app/(root)/compare/page.tsx

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Pill,
  Info,
  PackageCheck,
  Landmark,
  AlertTriangle,
  CircleCheckBig,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ProductComparison = () => {
  const [searchQueries, setSearchQueries] = useState<string[]>(["", ""]);
  const handleSearch = (index: number, value: string) => {
    setSearchQueries((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const products = [
    {
      id: 1,
      name: "باراسيتامول 500mg",
      brand: "Panadol",
      description: "مسكن فعال للآلام وخافض للحرارة.",
      image: "/images/uploads/drug.jpg",
      notes:
        "لا تتجاوز الجرعة اليومية المحددة. استشر الطبيب في حالة استمرار الأعراض.",
      ingredients: "باراسيتامول 500mg",
      category: "مسكنات",
      volume: "20 قرص",
      price: "99 جنيه",
      availability: "متوفر",
      usage: "قرص كل 6-8 ساعات حسب الحاجة، بحد أقصى 4 أقراص يومياً.",
      warnings: "لا يستخدم للأطفال أقل من 12 سنة أو من لديهم مشاكل في الكبد.",
    },
    {
      id: 2,
      name: "كبسولات فيتامين سي",
      brand: "Vitamax",
      description: "مكمل غذائي لتقوية المناعة.",
      image: "/images/uploads/drug.jpg",
      notes: "تناول حسب الحاجة أو حسب توصيات الطبيب.",
      ingredients: "فيتامين C 1000mg",
      category: "مكملات غذائية",
      volume: "30 كبسولة",
      price: "149 جنيه",
      availability: "متوفر",
      usage: "كبسولة واحدة يومياً بعد الأكل.",
      warnings: "قد يسبب اضطراب في المعدة عند البعض.",
    },
  ];

  return (
    <main className="wrapper text-sm sm:text-base">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        مقارنة المنتجات
      </h1>
      {/* Removed global search grid; moved input into each column */}

      <div className="grid grid-cols-2 divide-x divide-muted max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={`${index}-${product.id}`}
            className={`bg-white dark:bg-zinc-900 px-3 md:px-10 flex flex-col space-y-3 sm:space-y-5 ${
              index === 1 ? "pe-0" : "ps-0"
            }`}
          >
            {/* Column-specific search */}
            <Input
              placeholder="بحث عن منتج"
              value={searchQueries[index]}
              onChange={(e) => handleSearch(index, e.target.value)}
              className="mb-4 w-full"
            />
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                العلامة التجارية: {product.brand}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <ul className="text-sm space-y-3">
              <li className="flex gap-2 items-start">
                <Info className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>ملاحظات:</strong> {product.notes}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Pill className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>المكونات:</strong> {product.ingredients}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Landmark className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>الفئة:</strong> {product.category}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <PackageCheck className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>الكمية:</strong> {product.volume}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <CircleCheckBig className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>السعر:</strong> {product.price}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <CircleCheckBig className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>الحالة:</strong> {product.availability}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Info className="text-teal-600 mt-1" size={16} />
                <span>
                  <strong>طريقة الاستخدام:</strong> {product.usage}
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <AlertTriangle className="text-yellow-600 mt-1" size={16} />
                <span>
                  <strong>تحذيرات:</strong> {product.warnings}
                </span>
              </li>
            </ul>

            <Button className="w-full mt-auto">
              <ShoppingCart className="ml-2 h-4 w-4" />
              أضف إلى السلة
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductComparison;
