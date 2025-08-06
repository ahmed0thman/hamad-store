import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import ProductSwiper from "@/components/custom/product/productSwiper";
import ProductMainInfo from "@/components/custom/product/productMainInfo";
import ProductRatingsComments from "@/components/custom/product/productRatingsComments";
import { getProduct } from "@/lib/api/apiProducts";
import { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id: productId } = await params;
  const product = await getProduct(productId);
  if (!product) {
    return (
      <div className="flex-center h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }
  return (
    <section className="space-y-12 pt-6 px-4 sm:px-8">
      {/* Main Info */}
      <ProductMainInfo product={product as Product} />

      {/* Ratings and Comments */}
      <ProductRatingsComments product={product} />

      <ProductSwiper
        products={product.similar_products}
        headLine="المنتجات المشابهة"
      />
    </section>
  );
};

export default ProductPage;
