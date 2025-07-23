import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import ProductSwiper from "@/components/custom/product/productSwiper";
import ProductMainInfo from "@/components/custom/product/productMainInfo";
import ProductRatingsComments from "@/components/custom/product/productRatingsComments";

const ProductPage = () => {
  return (
    <section className="space-y-12 pt-6 px-4 sm:px-8">
      {/* Main Info */}
      <ProductMainInfo />

      {/* Ratings and Comments */}
      <ProductRatingsComments />

      <ProductSwiper headLine="المنتجات المشابهة" />
    </section>
  );
};

export default ProductPage;
