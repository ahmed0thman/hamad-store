import NoData from "@/components/custom/noData";
import ProductCard from "@/components/custom/product/productCard";
import ProductSwiper from "@/components/custom/product/productSwiper";
import { Button } from "@/components/ui/button";
import { getFavorites } from "@/lib/api/apiFavorites";
import { getFilteredProducts } from "@/lib/api/apiProducts";
import { auth } from "@/lib/auth";
import { FavoriteItem, ProductItem } from "@/types";
import { Link } from "lucide-react";
import React from "react";
import getLocaleStrings from "@/localization";

const Favorites = async () => {
  const locale = await getLocaleStrings();
  const session = await auth();

  if (!session || !session.user || !session.accessToken)
    return (
      <section className="wrapper">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">
            {locale.pleaseLoginToViewFavorites}
          </h2>
          <Button className="mt-4" asChild>
            <Link href="/signin">{locale.logIn}</Link>
          </Button>
        </div>
      </section>
    );
  const favoritesRes = await getFavorites();
  const productsRes = await getFilteredProducts();
  if (!favoritesRes.success || !productsRes.success) {
    return <NoData message={locale.yourFavoritesListIsEmpty} />;
  }

  const favorites: FavoriteItem[] = favoritesRes.data as FavoriteItem[];
  // console.log(favorites.length);

  const products: ProductItem[] = productsRes.products as ProductItem[];
  // console.log(products.length);

  const favoriteProducts = products.filter(
    (product) =>
      Array.isArray(favorites) &&
      favorites.some((favorite) => favorite.id === product.id)
  );
  // console.log(favoriteProducts.length);
  if (!productsRes.success)
    return <NoData message={locale.somethingWentWrong} />;
  return (
    <section className="wrapper">
      <h2 className="text-2xl font-semibold mb-6">
        {locale.yourFavoritesList}
      </h2>
      <div className="grid grid-cols-1 gap-3 md:gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-3 xl:gap-2 justify-center">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((productItem) => (
            <div className="sm:mx-0" key={productItem.id}>
              <ProductCard productItem={productItem} />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <NoData message={locale.noFavoriteProductsFound} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
