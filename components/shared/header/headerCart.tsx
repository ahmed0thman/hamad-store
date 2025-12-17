/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCart } from "@/hooks/useGetCart";
import { CURRENCY_CODE } from "@/lib/constants";
import { formatCurrency, formatCurrencyEGP } from "@/lib/utils";
import { CartData } from "@/types";
import { ShoppingCart } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const HeaderCart = ({ session }: { session?: any }) => {
  const { t } = useTranslation();
  let cart: CartData | null = null;
  let isEmpty = false;
  let multiStores = false;
  const isAuthenticated = session && session.user && session.accessToken;
  const { data: cartData, isLoading } = useGetCart();
  if (isAuthenticated) {
    if (cartData?.notAuthenticated) {
      cart = null;
      signOut({ redirectTo: "/signin" });
    }
    if (cartData?.empty) {
      isEmpty = true;
    }
    cart = cartData?.data as CartData;

    if (cart?.pharmacies && cart.pharmacies.length > 1) {
      multiStores = true;
    }
  }

  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" p-0">
            <ShoppingCart className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit p-3 ">
          <DropdownMenuLabel className="text-primary">
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <Link href="/login" className="text-primary underline">
                {t("login")}
              </Link>{" "}
              {t("loginToViewCart")}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isEmpty) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" p-0" aria-label={t("openCart")}>
            <ShoppingCart className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 ">
          <DropdownMenuLabel className="text-primary">
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <ShoppingCart className="w-5 h-5 opacity-50" />
              {t("cartEmpty")}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" relative p-0" aria-label={t("openCart")}>
          <ShoppingCart className="!w-6 !h-6" />
          <Badge
            variant="default"
            className="absolute bg-red-500 text-white -top-2 -right-0 h-5 min-w-5 flex items-center justify-center p-1 text-xs"
          >
            {multiStores
              ? cart?.pharmacies.length
              : cart?.pharmacies[0].items.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-3 ">
        <DropdownMenuLabel className="text-primary">
          {!multiStores ? (
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <Badge variant="secondary" className="text-base">
                {cart?.pharmacies[0].items.length}
              </Badge>
              {t("elements")}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
                <Badge variant="secondary" className="text-base">
                  {cart?.pharmacies.length}
                </Badge>
                {t("pharmacies")}
              </div>
              <span className="text-sm text-muted-foreground">
                {t("youHaveOrdersWith")} {cart?.pharmacies.length}{" "}
                {t("pharmacies").toLowerCase()}
              </span>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuItem className="text-stone-700 dark:text-stone-300 text-sm font-semibold capitalize px-2 py-1.5 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition">
          <div className="flex items-center gap-2">
            <span>{t("total")}</span>
            {formatCurrency(
              cart?.pharmacies.reduce(
                (acc, pharmacy) =>
                  acc +
                  pharmacy.items.reduce((acc, item) => acc + item.total, 0),
                0
              ) as number,
              cart?.pharmacies[0].currency_code || CURRENCY_CODE
            )}
          </div>
        </DropdownMenuItem>

        <Button
          asChild
          className="w-full mt-2 bg-primary text-white hover:bg-primary/90 transition font-semibold"
        >
          <Link href="/cart">{t("viewCart")}</Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderCart;
