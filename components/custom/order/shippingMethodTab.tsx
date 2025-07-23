"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import ButtonStepNav from "./buttonStepNav";
import { ArrowLeft, ArrowRight } from "lucide-react";

const shippingMethods = [
  { name: "Standard", price: "EGP 25", eta: "Arrives by Thu, Jul 18" },
  { name: "Express", price: "EGP 50", eta: "Arrives by Tue, Jul 16" },
];

export default function ShippingMethodTab({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [selectedShipping, setSelectedShipping] = useState("Standard");
  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Shipping Method
      </h3>
      <RadioGroup
        value={selectedShipping}
        onValueChange={setSelectedShipping}
        className="space-y-3"
      >
        {shippingMethods.map((method) => (
          <label
            key={method.name}
            className="flex items-center gap-4 border border-gray-300 dark:border-gray-600 p-4 rounded-xl"
          >
            <RadioGroupItem value={method.name} />
            <div className="flex flex-col">
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {method.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {method.price} · {method.eta}
              </p>
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
