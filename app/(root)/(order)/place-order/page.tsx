"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ChooseLocationTab from "@/components/custom/order/chooseLocationTab";
import ShippingMethodTab from "@/components/custom/order/shippingMethodTab";
import PaymentMethodTab from "@/components/custom/order/paymentMethodTab";

export default function OrderPlacementPage() {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("Card");
  const [selectedCard, setSelectedCard] = useState("Visa");

  const paymentMethods = ["Card", "Zain Pay", "Cash on Delivery"];
  const savedCards = [
    { name: "Visa", info: "Ending in 4242", logo: "/visa.svg" },
    { name: "Mastercard", info: "Ending in 1234", logo: "/mastercard.svg" },
  ];

  return (
    <div className="wrapper !py-12 px-4 text-gray-900 dark:text-gray-100">
      <div className="flex border-b w-fit">
        {[
          { id: 1, label: "Choose Location" },
          { id: 2, label: "Shipping Method" },
          { id: 3, label: "Payment Method" },
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

      {step === 2 && (
        <ShippingMethodTab
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && <PaymentMethodTab onBack={() => setStep(2)} />}
    </div>
  );
}
