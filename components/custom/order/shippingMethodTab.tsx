"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState, useTransition } from "react";
import ButtonStepNav from "./buttonStepNav";
import { ArrowLeft, ArrowRight, CheckCircle, OctagonX } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import {
  CartData,
  CartPharmacy,
  orderSaveParams,
  ShippingMethod,
} from "@/types";
import { useSession } from "next-auth/react";
import {
  getPharmacyShippingMethods,
  getSiteShippingMethods,
} from "@/lib/api/apiUser";
import Spinner from "../spinner";
import { formatCurrencyEGP } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import SpinnerMini from "../SpinnerMini";
import { getCartData } from "@/lib/api/apiCart";
import { toast } from "sonner";
import { saveOrder } from "@/lib/api/apiOrders";
import { Card, CardContent } from "@/components/ui/card";

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
  const { data: session, status } = useSession();
  const [userToken, setUserToken] = useState<string>("");
  const [shippingFees, setShippingFees] = useState<number>(0);
  const [pending, startTransition] = useTransition();
  const [pendingSave, startTransitionSave] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pendingShippingMethods, startTransitionShippingMethods] =
    useTransition();

  async function fetchShippingMethods() {
    if (!pharmacyId) return;
    // const shippingMethodsData = await getPharmacyShippingMethods(pharmacyId);
    const shippingMethodsData = await getSiteShippingMethods();
    if (shippingMethodsData?.success) {
      setShippingMethods(shippingMethodsData?.data as ShippingMethod[]);
      const defaultMethod = shippingMethodsData?.data?.find(
        (method) => method.type === "standard"
      );
      setShippingMethod?.(
        defaultMethod?.id.toString() || "",
        `${defaultMethod?.type} (${formatCurrencyEGP(
          Number(defaultMethod?.value)
        )})` || ""
      );
      setShippingFees(Number(defaultMethod?.value) || 0);
    }
  }

  const [pharmacyData, setPharmacyData] = useState<CartPharmacy | null>(null);
  async function handleFetchCardDetails() {
    if (!pharmacyId) return;
    console.log("Fetching card details...");
    const cartData = await getCartData(userToken);
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
    if (userToken) {
      startTransition(handleFetchCardDetails);
    }
  }, [userToken]);

  useEffect(() => {
    const pharmacyId = searchParams.get("pharmacyId");
    if (pharmacyId) {
      setPharmacyId?.(parseInt(pharmacyId));
    }
  }, []);

  useEffect(
    function () {
      if (status === "authenticated" && session?.user.token) {
        setUserToken(session.user.token);
      } else {
        setUserToken("");
      }
    },
    [status]
  );

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
          <span>
            Please select a shipping address, shipping method, and payment
            method.
          </span>
        </div>
      );
      return;
    }
    const orderParams: orderSaveParams = {
      pharmacy_id: pharmacyId,
      shipping_id: Number(shippingMethod),
      shipping_address: Number(shippingAddress),
      payment_method: paymentMethod as string,
    };
    const response = await saveOrder(orderParams, userToken);
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

  function handlePlaceOrder() {
    startTransitionSave(handleSaveOrder);
  }

  if (pendingShippingMethods) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Shipping Method
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
              `${selectedMethod.type} (${formatCurrencyEGP(
                Number(selectedMethod.value)
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
                    Estimated delivery: <b>{method.duration} hours</b>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Fees: {formatCurrencyEGP(+method.value)}
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
            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
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
                    {formatCurrencyEGP(item.final_price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 divide-y divide-accent text-sm">
              <div className="flex justify-between">
                <span>Products Total</span>
                <span className="font-medium">
                  {formatCurrencyEGP(pharmacyData.total)}
                </span>
              </div>
              {pharmacyData.promocoded && (
                <div className="flex justify-between">
                  <span>Coupon</span>
                  <span className="font-medium text-green-600">
                    - {formatCurrencyEGP(pharmacyData.coupon_discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between capitalize">
                <span>Location</span>
                <span className="font-medium">{shippingAddressValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Method</span>
                <span className="font-medium capitalize">
                  {shippingMethodValue}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              {/* {selectedPayment === "Cash on Delivery" && (
                <div className="flex justify-between">
                  <span>Cash Handling Fee</span>
                  <span className="font-medium">20 LE</span>
                </div>
              )} */}
              <div className="border-t border-border my-3"></div>
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>
                  {formatCurrencyEGP(pharmacyData.total + shippingFees)}
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
          Back
        </ButtonStepNav>
        <Button onClick={handlePlaceOrder}>
          {pendingSave ? <SpinnerMini /> : "Place Order"}
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
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="my-4">
            <p className="text-base text-muted-foreground mb-2">
              Your order has been placed. Thank you for shopping with us!
            </p>
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button asChild variant="default" className="">
              <Link href="/account/orders" replace>
                Show Order
              </Link>
            </Button>
            <Button asChild variant="secondary" className="">
              <Link href="/" replace>
                Keep Shopping
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
