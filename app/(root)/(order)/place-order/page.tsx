"use client";

import ChooseLocationTab from "@/components/custom/order/chooseLocationTab";
import PaymentMethodTab from "@/components/custom/order/paymentMethodTab";
import ShippingMethodTab from "@/components/custom/order/shippingMethodTab";
import { OrderPovider } from "@/contexts/OrderContext";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function OrderPlacementPage() {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  return (
    <OrderPovider>
      <div className="wrapper !py-12 px-4 text-gray-900 dark:text-gray-100">
        <div className="flex border-b w-fit">
          {[
            { id: 1, label: t("chooseLocation") },
            { id: 2, label: t("paymentMethod") },
            { id: 3, label: t("shippingMethod") },
          ].map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "pb-2 px-3 font-bold text-sm cursor-pointer",
                step === tab.id
                  ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              )}
              onClick={() => setStep(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {step === 1 && <ChooseLocationTab onNext={() => setStep(2)} />}

        {step === 3 && (
          <ShippingMethodTab
            // onNext={() => setStep(3)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <PaymentMethodTab
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
      </div>
    </OrderPovider>
  );
}
