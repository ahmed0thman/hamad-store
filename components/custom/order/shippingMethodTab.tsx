"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrder } from "@/contexts/OrderContext";
import { useGetProfile } from "@/hooks/useGetProfile";
import { getCartData } from "@/lib/api/apiCart";
import { saveOrder } from "@/lib/api/apiOrders";
import {
  getPharmacyShippingMethods,
  getSiteShippingMethods,
} from "@/lib/api/apiUser";
import { CURRENCY_CODE } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  CartData,
  CartPharmacy,
  orderSaveParams,
  ShippingMethod,
} from "@/types";
import { ArrowLeft, CheckCircle, OctagonX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import Spinner from "../spinner";
import SpinnerMini from "../SpinnerMini";
import ButtonStepNav from "./buttonStepNav";
import { useTranslation } from "@/hooks/useTranslation";

export default function ShippingMethodTab({ onBack }: { onBack: () => void }) {
  const searchParams = useSearchParams();
  const {
    setShippingMethod,
    shippingMethod,
    pharmacyId,
    setPharmacyId,
    paymentMethod,
    paymentMethodValue,
    shippingAddressValue,
    shippingMethodValue,
    shippingAddress,
  } = useOrder();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [shippingFees, setShippingFees] = useState<number>(0);
  const [pending, startTransition] = useTransition();
  const [pendingSave, startTransitionSave] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pendingShippingMethods, startTransitionShippingMethods] =
    useTransition();
  const [couponCode, setCouponCode] = useState<string>("");
  const { t } = useTranslation();
  const { profileData, isLoadoingProfile } = useGetProfile();

  async function fetchShippingMethods() {
    if (!pharmacyId) return;
    // const shippingMethodsData =  await getPharmacyShippingMethods(pharmacyId);
    const shippingMethodsData =
      paymentMethod !== "credit"
        ? await getSiteShippingMethods()
        : await getPharmacyShippingMethods(pharmacyId);
    if (shippingMethodsData?.success) {
      setShippingMethods(shippingMethodsData?.data as ShippingMethod[]);
      const defaultMethod = shippingMethodsData?.data?.find(
        (method) => method.type === "standard"
      );
      setShippingMethod?.(
        defaultMethod?.id.toString() || "",
        `${defaultMethod?.type} (${formatCurrency(
          Number(defaultMethod?.value),
          currency
        )})` || ""
      );
      setShippingFees(Number(defaultMethod?.value) || 0);
    }
  }

  const [pharmacyData, setPharmacyData] = useState<CartPharmacy | null>(null);
  async function handleFetchCardDetails() {
    if (!pharmacyId) return;
    console.log("Fetching card details...");
    const cartData = await getCartData();
    if (cartData?.success) {
      const cart = cartData.data as CartData;
      const pharmacy = cart.pharmacies.find(
        (ph) => ph.pharmacy_id === pharmacyId
      );
      setPharmacyData(pharmacy as CartPharmacy);
      setMounted(true);
    }
  }

  useEffect(() => {
    startTransition(handleFetchCardDetails);
  }, []);

  useEffect(() => {
    const pharmacyId = searchParams.get("pharmacyId");
    if (pharmacyId) {
      setPharmacyId?.(parseInt(pharmacyId));
    }
  }, []);

  useEffect(() => {
    if (pharmacyId) {
      startTransitionShippingMethods(fetchShippingMethods);
    }
  }, [pharmacyId]);

  async function handleSaveOrder() {
    if (!shippingAddress || !shippingMethod || !pharmacyId) {
      toast(
        <div className="flex items-center gap-2">
          <OctagonX className="inline-block ms-2 text-red-500" />
          <span>{t("selectShippingError")}</span>
        </div>
      );
      return;
    }
    const orderParams: orderSaveParams = {
      coupon_code: couponCode || undefined,
      pharmacy_id: pharmacyId,
      shipping_id: Number(shippingMethod),
      shipping_address: Number(shippingAddress),
      payment_method: paymentMethod as string,
    };
    const response = await saveOrder(orderParams);
    if (response.success) {
      setShowSuccessDialog(true);
    } else {
      toast(
        <div className="flex items-center gap-2">
          <OctagonX className="inline-block ms-2 text-red-500" />
          <span>{response.message}</span>
        </div>
      );
    }
  }

  // async function handleApplyCoupon() {
  //   const response = await addCouponToCart(
  //     couponCode,
  //     Number(pharmacyId),
  //     token
  //   );
  //   if (response?.success) {
  //     toast(
  //       <div className="text-sm text-green-500 flex items-center">
  //         <CircleCheckBig className="me-2" />
  //         <span>Coupon applied successfully</span>
  //       </div>
  //     );
  //     await fetchCartData();
  //   } else {
  //     toast(
  //       <div className="text-sm text-red-600 flex items-center">
  //         <OctagonX className="me-2" />
  //         <span>Coupon is not valid</span>
  //       </div>
  //     );
  //   }
  // }

  function handlePlaceOrder() {
    startTransitionSave(handleSaveOrder);
  }

  if (pendingShippingMethods || isLoadoingProfile) {
    return <Spinner />;
  }

  console.log("profile Data: ", profileData);

  const currency = profileData?.data.currency_code || CURRENCY_CODE;
  const is_doctor = profileData?.data.is_doctor || false;

  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {t("shippingMethod")}
      </h3>
      <RadioGroup
        value={shippingMethod}
        onValueChange={(value) => {
          const selectedMethod = shippingMethods.find(
            (method) => method.id.toString() === value
          );
          if (selectedMethod) {
            setShippingMethod?.(
              selectedMethod.id.toString(),
              `${selectedMethod.type} (${formatCurrency(
                Number(selectedMethod.value),
                currency
              )})`
            );
            setShippingFees(Number(selectedMethod.value) || 0);
          }
        }}
        className="space-y-3"
      >
        {shippingMethods &&
          shippingMethods.length > 0 &&
          shippingMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center justify-between border border-gray-300 dark:border-gray-600 p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <RadioGroupItem value={method.id.toString()} />
                <div className="flex flex-col">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {method.type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("estimatedDelivery")}{" "}
                    <b>
                      {method.duration} {t("hours")}
                    </b>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {t("fees")} {formatCurrency(+method.value, currency)}
                </span>
              </div>
            </label>
          ))}
      </RadioGroup>

      {/* Order Summary Card */}
      {pending && !mounted && (
        <div className="max-w-xl mx-auto mt-8 mb-6 animate-pulse">
          <Card className="bg-muted/50 dark:bg-muted/80">
            <CardContent className="space-y-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </CardContent>
          </Card>
        </div>
      )}
      {!pending && pharmacyData && (
        <div className="max-w-xl mx-auto mt-8 mb-6">
          <div className="bg-primary/10 dark:bg-muted border border-border rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold mb-4">{t("orderSummary")}</h4>
            <div className="mb-4">
              {pharmacyData.items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-b-0"
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </div>
                  <div className="text-sm">
                    {formatCurrency(item.final_price * item.quantity, currency)}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 divide-y divide-accent text-sm">
              <div className="flex justify-between">
                <span>{t("productsTotal")}</span>
                <span className="font-medium">
                  {formatCurrency(pharmacyData.total, currency)}
                </span>
              </div>
              {pharmacyData.promocoded && (
                <div className="flex justify-between">
                  <span>{t("coupon")}</span>
                  <span className="font-medium text-green-600">
                    - {formatCurrency(pharmacyData.coupon_discount, currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between capitalize">
                <span>{t("location")}</span>
                <span className="font-medium">{shippingAddressValue}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shippingMethod")}</span>
                <span className="font-medium capitalize">
                  {shippingMethodValue}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("paymentMethod")}</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              {!is_doctor && (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {t("useCouponCode")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={t("enterCoupon")}
                      className="flex-grow"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    {/* <Button
                  variant="outline"
                  className="bg-muted"
                  onClick={() => startTransition(handleApplyCoupon)}
                >
                  تطبيق
                </Button> */}
                  </div>
                </>
              )}
              <div className="border-t border-border my-3"></div>
              <div className="flex justify-between text-base font-bold">
                <span>{t("total")}</span>
                <span>
                  {formatCurrency(pharmacyData.total + shippingFees, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 pt-4">
        <ButtonStepNav handleClick={onBack}>
          <ArrowLeft className="auto-dir" />
          {t("back")}
        </ButtonStepNav>
        <Button onClick={handlePlaceOrder}>
          {pendingSave ? <SpinnerMini /> : t("placeOrder")}
        </Button>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog}>
        <DialogContent
          className="max-w-sm mx-auto text-center"
          showCloseButton={false}
        >
          <div className="flex flex-col items-center justify-center mb-2">
            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-green-600 text-center">
              {t("orderPlacedSuccessfully")}
            </DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <p className="text-base text-muted-foreground mb-2">
              {t("orderPlacedThankYou")}
            </p>
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button asChild variant="default" className="">
              <Link href="/account/orders" replace>
                {t("showOrder")}
              </Link>
            </Button>
            <Button asChild variant="secondary" className="">
              <Link href="/" replace>
                {t("keepShopping")}
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
