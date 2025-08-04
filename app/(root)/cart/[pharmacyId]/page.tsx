"use client";
import AddToCart from "@/components/custom/product/addToCart";
import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCartData } from "@/lib/api/apiCart";
import { formatCurrencyEGP } from "@/lib/utils";
import { CartData, CartPharmacy } from "@/types";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";

const PharamacyCart = () => {
  const params = useParams();
  const { pharmacyId } = params;
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | undefined>(undefined);

  const router = useRouter();
  const [cart, setCart] = useState<CartData | null>(null);
  const [cartPharmacy, setCartPharmacy] = useState<CartPharmacy | null>(null);
  const [pending, startTransition] = useTransition();
  const [pendingRefresh, startTransitionRefresh] = useTransition();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setToken(session?.user?.token || session?.accessToken || undefined);
      setAuthenticated(true);
    }
  }, [status, session]);

  useEffect(() => {
    if (authenticated) {
      startTransition(fetchCartData);
    }
  }, [token, authenticated, pharmacyId, session, router]);

  async function fetchCartData() {
    const cartData = await getCartData(token);
    const isAuthenticated = session && session.user && session.accessToken;
    if (isAuthenticated) {
      if (cartData?.notAuthenticated) {
        setCart(null);
        signOut({ redirectTo: "/signin" });
      }
      if (cartData?.empty) {
        router.push("/cart");
      } else {
        const data = cartData?.data as CartData;
        setCart(data);
        if (data?.pharmacies && data.pharmacies.length === 0) {
          router.push("/cart");
        } else {
          console.log("cart pharmacies", data);
          const pharmacy = data?.pharmacies.find(
            (pharmacy) => pharmacy.pharmacy_id.toString() === pharmacyId
          );
          if (!pharmacy) {
            router.push("/cart");
          }
          setCartPharmacy(pharmacy || null);
        }
      }
    } else {
      router.push("/signin?callbackUrl=/cart");
    }
  }

  if (pending) return <Spinner />;

  return (
    <section className="wrapper">
      <div className="wrapper mx-auto px-4 md:px-8 !py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 dark:bg-slate-900 dark:text-white">
        <div className="lg:col-span-2 space-y-6">
          {/* <h1 className="text-2xl font-bold mb-4">Cart for {cartPharmacy.pharmacy_name}</h1> */}
          <div className="space-y-4">
            {cartPharmacy?.items.map((item) => (
              <Card
                key={item.product_id}
                className="sm:p-4 bg-white dark:bg-slate-800"
              >
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex  items-start sm:items-center gap-4 w-full">
                    <Image
                      src="/images/no-image.jpg"
                      alt="Pharmacy Image"
                      width={64}
                      height={64}
                      className="rounded-full border object-cover w-16 h-16"
                    />
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        السعر للوحدة: {formatCurrencyEGP(item.final_price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-sm font-medium text-gray-800 dark:text-white text-nowrap">
                      {formatCurrencyEGP(item.total)}
                    </span>
                    <AddToCart
                      cart={cart}
                      productId={item.product_id}
                      token={token}
                      stock={1000000}
                      refreshCart={() => startTransitionRefresh(fetchCartData)}
                    />
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
                ملخص الطلب
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>
                    {formatCurrencyEGP(
                      cartPharmacy?.items.reduce(
                        (acc, item) =>
                          acc + item.price_after_discount * item.quantity,
                        0
                      ) as number
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة المقدرة</span>
                  <span>
                    {formatCurrencyEGP(
                      cartPharmacy?.items.reduce(
                        (acc, item) => acc + item.tax_amount * item.quantity,
                        0
                      ) as number
                    )}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span>تقدير الشحن والتسليم</span>
                  <span>{formatCurrencyEGP(29)}</span>
                </div> */}
                <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4">
                  <span>المجموع</span>
                  <span>
                    {formatCurrencyEGP(cartPharmacy?.total as number)}
                  </span>
                </div>
              </div>

              {/* <div className="mt-6 border-t border-teal-200 dark:border-teal-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-teal-800 dark:text-teal-400">
                    مجموع نقاط الولاء
                  </span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    1,800 نقطة
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  كود الخصم
                </p>
                <div className="flex items-center gap-2">
                  <Input placeholder="أدخل الكوبون" className="flex-grow" />
                  <Button variant="destructive">حذف</Button>
                </div>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                  تم تطبيق الخصم
                </Button>
                <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4 mt-6">
                  <span>المجموع</span>
                  <span className="flex items-center">
                    {formatCurrencyEGP(2200)}
                  </span>
                </div>
              </div> */}
              <Button
                asChild
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-lg"
              >
                <Link href="/place-order">إتمام الشراء</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PharamacyCart;
