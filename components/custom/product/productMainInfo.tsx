import { Button } from "@/components/ui/button";
import { formatCurrencyEGP } from "@/lib/utils";
import { Heart, Scaling } from "lucide-react";
import ProductShare from "../buttonShare";
import TextExpander from "../textExpander";
import ProductAddCart from "./productAddCart";
import ProductImages from "./productImage";
import ButtonShare from "../buttonShare";

const ProductMainInfo = () => {
  return (
    <section className="wrapper grid grid-cols-1 sm:grid-cols-5 gap-8 items-start">
      {/* Product Image */}
      <ProductImages
        images={[
          "/images/sample-products/p1-1.jpg",
          "/images/sample-products/p1-2.jpg",
        ]}
      />

      <div className="col-span-1 sm:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Product Text Info */}
        <div className="space-y-6 sm:col-span-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-200">
            فانيليا نوترين لمرضى السكري
          </h1>

          <div className="flex gap-2 items-center ">
            <span className="line-through text-gray-500">
              {formatCurrencyEGP(120)}
            </span>
            <span className="text-primary font-semibold text-2xl">
              {formatCurrencyEGP(100)}
            </span>
          </div>

          <p className="text-gray-600 dark:text-slate-400">
            عبوات ممتازة بنكهة الفانيليا بطعم شهيّ تحتوي على 6.7 وجبة والعمل دون
            الحاجة إلى إعادة التسخين.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* <Button variant="default" className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              أضف إلى العربة
            </Button> */}
            <Button variant="outline" className="flex items-center gap-2">
              <Scaling className="w-5 h-5" />
              أضف للمقارنة
            </Button>
            <div className="flex justify-end gap-2 mb-2">
              <ButtonShare />
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500  hover:bg-red-100 dark:hover:bg-red-900"
              >
                <Heart className="!w-7 !h-7" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <ProductAddCart />
        </div>
      </div>
      <div className="col-span-full">
        <h3 className="text-xl font-semibold mt-6 mb-2">تفاصيل المنتج</h3>
        <TextExpander />
      </div>
    </section>
  );
};

export default ProductMainInfo;
