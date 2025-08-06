import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { formatCurrencyEGP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FavoriteItem, ProductItem } from "@/types";
import StarRating from "../starRating";
import { auth } from "@/lib/auth";
import { getFavorites } from "@/lib/api/apiFavorites";
import ButtonFavorite from "./buttonFavorite";
import { Badge } from "@/components/ui/badge";

const ProductCard = async ({ productItem }: { productItem: ProductItem }) => {
  const session = await auth();
  // let favorites: FavoriteItem[] | null = null;
  let inFavorites = false;
  if (session && session.user) {
    const res = await getFavorites();
    if (res && res.success && !res.empty) {
      const favorites = res.data as FavoriteItem[];
      inFavorites = favorites.some((item) => item.id === productItem.id);
    }
  }
  const isValidImage =
    productItem.image &&
    (productItem.image.endsWith(".jpg") || productItem.image.endsWith(".png"));

  const image = isValidImage ? productItem.image : "/images/no-image.jpg";

  return (
    <div className="bg-stone-100 dark:bg-slate-800 w-full md:max-w-sm rounded-sm md:rounded-md shadow-md p-2 py-4 md:p-4 md:pt-12  h-full max-h-[560px] relative flex gap-3 md:gap-0 md:flex-col overflow-hidden">
      <div
        // onClick={() => setFavorite(!favorite)}
        className="absolute top-2 end-2 text-gray-400 hover:text-red-500 focus:outline-none"
      >
        <ButtonFavorite inFavorites={inFavorites} productId={productItem.id} />
      </div>

      <div className="md:relative w-2/5 md:w-full aspect-square !max-h-[150px]">
        <Image
          src={image || "/images/no-image.jpg"}
          fill
          alt="img"
          className="!w-2/5 md:!w-full  object-cover md:rounded-md"
        />
      </div>

      <div className="space-y-3 mt-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground">
          <span className="text-xs block text-muted-foreground underline font-medium">
            {productItem.pharmacy_id}
          </span>
          {productItem.name}
        </h3>

        <div className="flex flex-col md:flex-row gap-2  md:gap-4 justify-between">
          <div className="flex items-center md:flex-col md:items-start gap-2 md:gap-0">
            {productItem.offer ? (
              <>
                <span className="line-through text-gray-500 text-xs">
                  {formatCurrencyEGP(productItem.offer?.price_before as number)}
                </span>
                <span className="text-foreground font-semibold text-lg">
                  {formatCurrencyEGP(productItem.offer?.price_after as number)}
                </span>
              </>
            ) : (
              <span className="text-foreground font-semibold text-xl">
                {formatCurrencyEGP(productItem.price as number)}
              </span>
            )}
          </div>

          <div className="flex md:items-end flex-col md:gap-2">
            <div className="flex items-center text-yellow-400 gap-1">
              <StarRating
                value={productItem.average_rating.user}
                outOf={5}
                readOnly
                color="text-yellow-500"
                // filledOnly
              />
              <span className="font-medium">
                ({productItem.average_rating.count_user_rate})
              </span>
            </div>

            <div className="flex items-center text-green-500 gap-1">
              <StarRating
                value={productItem.average_rating.pharmacist}
                outOf={5}
                readOnly
                color="text-green-500"
                // filledOnly
              />
              <span className="font-medium">
                ({productItem.average_rating.count_pharmacist_rate})
              </span>
            </div>
          </div>
        </div>
        {productItem.quantity > 0 ? (
          <span className="text-green-500 text-sm font-medium  mt-auto">
            متوفر في المخزون ({productItem.quantity})
          </span>
        ) : (
          <Badge variant="destructive" className="w-fit py-1 px-3  mt-auto">
            غير متوفر
          </Badge>
        )}
        <div className="flex flex-col md:flex-row  gap-1">
          <Button
            asChild
            className=" rounded-full text-stone-100 font-medium text-base flex-grow md:flex-grow-0"
          >
            <Link href={`/product/${productItem.id}`}>
              {productItem.quantity > 0 ? "اشتري الآن" : "التفاصيل"}
            </Link>
          </Button>
          <Button className="rounded-full text-stone-100 font-medium text-base flex-grow md:flex-grow-0">
            مقارنة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
