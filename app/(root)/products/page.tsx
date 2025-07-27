import ProductCard from "@/components/custom/product/productCard";
import Pagination from "@/components/custom/pagination";
import { Slider } from "@/components/ui/slider";
import ProductSidebar from "@/components/custom/product/productSidebar";

const Products = () => {
  return (
    <div className="wrapper">
      <div className="grid grid-cols-12 gap-6 px-3 sm:px-6 py-8 relative">
        {/* Sidebar filters */}
        <ProductSidebar />

        {/* Product grid */}
        <section className="col-span-12 pt-4 lg:pt-0 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {[...Array(9)].map((_, i) => (
              <div className="mx-auto sm:mx-0" key={i}>
                <ProductCard />
              </div>
            ))}
          </div>

          <Pagination count={300} pageSize={9} visibleButtons={3} />
        </section>
      </div>
    </div>
  );
};

export default Products;
