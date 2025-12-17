import { Heart, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, formatCurrencyEGP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FavoriteItem, ProductItem } from "@/types";
import StarRating from "../starRating";
import { auth } from "@/lib/auth";
import { getFavorites } from "@/lib/api/apiFavorites";
import ButtonFavorite from "./buttonFavorite";
import { Badge } from "@/components/ui/badge";
import ButtonAddToCompare from "./buttonAddToCompare";
import Image from "next/image";
import { CURRENCY_CODE } from "@/lib/constants";
import getLocaleStrings from "@/localization";

const ProductCard = async ({ productItem }: { productItem: ProductItem }) => {
  const locale = await getLocaleStrings();
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
    <div className="bg-stone-100 dark:bg-slate-800 w-full max-w-sm rounded-md shadow-md p-2 py-4 md:p-4 md:pt-12  h-full max-h-[560px] relative flex gap-0 flex-col overflow-hidden">
      <div
        // onClick={() => setFavorite(!favorite)}
        className="absolute top-3 end-2 text-gray-400 hover:text-red-500 focus:outline-none z-10"
      >
        <ButtonFavorite inFavorites={inFavorites} productId={productItem.id} />
      </div>

      <div className="relative w-full aspect-square !max-h-[150px]">
        <Link href={`/product/${productItem.id}`}>
          {/* Shadcn Avatar component for product image */}
          <Avatar className="w-full h-full rounded-md">
            <AvatarImage
              src={image || "/images/no-image.jpg"}
              alt="img"
              className="object-cover"
            />
            <AvatarFallback>
              <Image
                src="/images/no-image.jpg"
                alt="fallback"
                fill
                className="w-full h-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>

      <div className="sm:space-y-3 mt-5 flex flex-col flex-grow">
        <h3 className="sm:text-lg font-semibold text-foreground">
          {/* <span className="text-xs block text-muted-foreground underline font-medium">
            {productItem.pharmacy_id}
          </span> */}
          {productItem?.name}
        </h3>

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-between">
          <div className="flex items-end  sm:flex-col sm:items-start gap-2">
            {productItem.offer_discount ? (
              <>
                <span className="line-through text-gray-600 dark:text-gray-400 text-xs">
                  {formatCurrency(
                    productItem.price as number,
                    productItem.currency_symbol
                  )}
                </span>
                <span className="text-foreground font-semibold sm:text-lg">
                  {formatCurrency(
                    productItem.final_price as number,
                    productItem.currency_symbol
                  )}
                </span>
              </>
            ) : (
              <span className="text-foreground font-bold sm:text-xl">
                {formatCurrency(
                  productItem.price as number,
                  productItem.currency_symbol || CURRENCY_CODE
                )}
              </span>
            )}
          </div>

          <div className="flex sm:items-end flex-col sm:gap-2">
            <div className="flex items-center text-yellow-400 gap-1">
              <StarRating
                value={productItem.average_rating.user}
                outOf={5}
                readOnly
                color="text-yellow-500"
                // filledOnly
              />
              <span className="text-xs sm:text-smfont-medium">
                ({productItem.average_rating.count_user_rate})
              </span>
            </div>

            <div className="flex items-center text-green-500 gap-1">
              <StarRating
                value={productItem.average_rating.doctor}
                outOf={5}
                readOnly
                color="text-green-500"
                // filledOnly
              />
              <span className="font-medium">
                ({productItem.average_rating.count_doctor_rate})
              </span>
            </div>
          </div>
        </div>
        {productItem.quantity > 0 ? (
          <span className="text-green-500 text-xs sm:text-sm font-medium  mt-auto">
            {locale.availableInStock}
            {/* ({productItem.quantity}) */}
          </span>
        ) : (
          <Badge variant="destructive" className="w-fit py-1 px-3  mt-auto">
            {locale.notAvailable}
          </Badge>
        )}
        <div className="hidden sm:flex flex-row  gap-1">
          <Button
            asChild
            className=" rounded-full text-stone-100 font-medium text-xs sm:text-base flex-grow-0 !py-1 sm:!py-2"
          >
            <Link href={`/product/${productItem.id}`}>
              {/* {productItem.quantity > 0 ? locale.buyNowButton : locale.details} */}
              {locale.details}
            </Link>
          </Button>

          <ButtonAddToCompare id={productItem.id}>
            <Button className="rounded-full text-stone-100 font-medium text-xs sm:text-base flex-grow-0 ">
              {locale.compare}
            </Button>
          </ButtonAddToCompare>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
