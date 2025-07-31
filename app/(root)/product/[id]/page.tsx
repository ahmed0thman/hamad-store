import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import ProductSwiper from "@/components/custom/product/productSwiper";
import ProductMainInfo from "@/components/custom/product/productMainInfo";
import ProductRatingsComments from "@/components/custom/product/productRatingsComments";
import { getProduct } from "@/lib/api/apiProducts";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id: productId } = await params;
  const product = await getProduct(productId);
  return (
    <section className="space-y-12 pt-6 px-4 sm:px-8">
      {/* Main Info */}
      <ProductMainInfo product={product} />

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
