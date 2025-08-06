"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState, useTransition } from "react";
import ButtonStepNav from "./buttonStepNav";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import { ShippingMethod } from "@/types";
import { useSession } from "next-auth/react";
import { getPharmacyShippingMethods } from "@/lib/api/apiUser";
import Spinner from "../spinner";
import { formatCurrencyEGP } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function ShippingMethodTab({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const searchParams = useSearchParams();
  const { setShippingMethod, shippingMethod, pharmacyId, setPharmacyId } =
    useOrder();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const { data: session, status } = useSession();
  const [userToken, setUserToken] = useState<string>("");
  const [pendingShippingMethods, startTransitionShippingMethods] =
    useTransition();

  async function fetchShippingMethods() {
    if (!pharmacyId) return;
    const shippingMethodsData = await getPharmacyShippingMethods(pharmacyId);
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
    }
  }

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
      <div className="flex justify-end items-center gap-3 pt-4">
        <ButtonStepNav handleClick={onBack}>
          <ArrowLeft className="auto-dir" />
          Back
        </ButtonStepNav>

        <ButtonStepNav handleClick={onNext}>
          Next
          <ArrowRight className="auto-dir" />
        </ButtonStepNav>
      </div>
    </div>
  );
}
