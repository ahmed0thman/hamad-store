"use client";
import AddToCart from "@/components/custom/product/addToCart";
import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCart } from "@/hooks/useGetCart";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetWallet } from "@/hooks/useGetWallet";
import { useTranslation } from "@/hooks/useTranslation";
import { CURRENCY_CODE } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { CartData, CartPharmacy, wallet } from "@/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import noImg from "@/public/images/no-image.jpg";

const PharamacyCart = () => {
  const params = useParams();
  const { pharmacyId } = params;
  const { t } = useTranslation();
  const router = useRouter();
  const [cartPharmacy, setCartPharmacy] = useState<CartPharmacy | null>(null);
  // const [currency, setCurrency] = useState("");

  const { data: cartData, isLoading, error } = useGetCart();
  if (cartData?.notAuthenticated) {
    signOut({ redirectTo: "/signin?callbackUrl=/cart" });
  }

  const { profileData, isLoadoingProfile } = useGetProfile();

  const { walletDetails, isLoadingWallet, errorWallet } = useGetWallet();
  const walletInfo = walletDetails?.data as wallet;

  if (cartData?.empty) {
    router.push("/cart");
  }

  const cart = cartData?.data as CartData | null | undefined;

  useEffect(() => {
    if (cart?.pharmacies && cart.pharmacies.length === 0) {
      router.push("/cart");
    } else {
      console.log("cart pharmacies", cart);
      const pharmacy = cart?.pharmacies.find(
        (pharmacy) => pharmacy.pharmacy_id.toString() === pharmacyId
      );
      if (!pharmacy) {
        router.push("/cart");
      }
      setCartPharmacy(pharmacy || null);
    }
  }, [cart, pharmacyId, router]);

  if (isLoading || isLoadingWallet || isLoadoingProfile) return <Spinner />;

  const currency = cartPharmacy?.currency_code || CURRENCY_CODE;

  return (
    <section className="wrapper">
      <div className="wrapper mx-auto px-4 md:px-8 !py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 dark:bg-slate-900 dark:text-white">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <Image
              src={cartPharmacy?.pharmacy_image as string}
              alt={cartPharmacy?.pharmacy_name || "Pharmacy Image"}
              className="rounded-full border object-cover w-12 h-12"
              width={48}
              height={48}
              onError={(e) => {
                e.currentTarget.src = noImg.src;
              }}
            />
            <Link
              href={`/store/${cartPharmacy?.pharmacy_id}`}
              className="text-xl font-bold mb-4 block underline"
            >
              {cartPharmacy?.pharmacy_name}
            </Link>
          </div>
          <div className="space-y-4">
            {cartPharmacy?.items.map((item) => (
              <Card
                key={item.product_id}
                className="sm:p-4 bg-white dark:bg-slate-800"
              >
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex  items-start sm:items-center gap-4 w-full">
                    {/* <Image
                      src="/images/no-image.jpg"
                      alt="Pharmacy Image"
                      width={64}
                      height={64}
                      className="rounded-full border object-cover w-16 h-16"
                    /> */}
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        <Link href={`/product/${item.product_id}`}>
                          {item.name}
                        </Link>
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("pricePerUnit")}:{" "}
                        {formatCurrency(item.final_price, currency)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-sm font-medium text-gray-800 dark:text-white text-nowrap">
                      {formatCurrency(item.total, currency)}
                    </span>
                    <AddToCart productId={item.product_id} stock={1000000} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-teal-50 dark:bg-slate-800 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-center text-teal-900 dark:text-teal-400 mb-6">
                {t("orderSummary")}
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>
                    {formatCurrency(
                      cartPharmacy?.items.reduce(
                        (acc, item) =>
                          acc + item.price_after_discount * item.quantity,
                        0
                      ) as number,
                      currency
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("estimatedTax")}</span>
                  <span>
                    {formatCurrency(
                      cartPharmacy?.items.reduce(
                        (acc, item) => acc + item.tax_amount * item.quantity,
                        0
                      ) as number,
                      currency
                    )}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span>تقدير الشحن والتسليم</span>
                  <span>{formatCurrencyEGP(29)}</span>
                </div> */}
                <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4">
                  <span>{t("totalAmount")}</span>
                  <span>
                    {formatCurrency(cartPharmacy?.total as number, currency)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-teal-200 dark:border-teal-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-teal-800 dark:text-teal-400">
                    {t("walletBalance")}
                  </span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    {walletInfo?.wallet_balance
                      ? walletInfo?.wallet_balance
                      : 0}{" "}
                    {currency}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4 mt-6">
                  <span>{t("totalAmount")}</span>
                  <span className="flex items-center">
                    {formatCurrency(cartPharmacy?.total as number, currency)}
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-lg"
              >
                <Link href={`/place-order?pharmacyId=${pharmacyId}`}>
                  {t("checkout")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PharamacyCart;
