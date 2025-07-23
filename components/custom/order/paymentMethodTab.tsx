"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload } from "lucide-react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ButtonStepNav from "./buttonStepNav";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const cardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  setDefault: z.boolean().optional(),
});

type CardFormData = z.infer<typeof cardSchema>;

export default function PaymentMethodTab({ onBack }: { onBack: () => void }) {
  const [selectedPayment, setSelectedPayment] = useState("Card");
  const [selectedCard, setSelectedCard] = useState("Visa");
  const [showNewCardDialog, setShowNewCardDialog] = useState(false);
  const [zainPayImage, setZainPayImage] = useState<string | null>(null);

  const paymentMethods = ["Card", "Zain Pay", "Cash on Delivery", "Pay Later"];
  const savedCards = [
    { name: "Visa", info: "Ending in 4242", logo: "/visa.svg" },
    { name: "Mastercard", info: "Ending in 1234", logo: "/mastercard.svg" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const onSubmit: SubmitHandler<CardFormData> = (data) => {
    console.log("Submitted Card Data:", data);
    setShowNewCardDialog(false);
  };

  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-bold">Payment Method</h3>
      <RadioGroup
        value={selectedPayment}
        onValueChange={setSelectedPayment}
        className="space-y-3"
      >
        {paymentMethods.map((pm) => (
          <label
            key={pm}
            className="flex items-center gap-4 border border-border p-4 rounded-xl"
          >
            <RadioGroupItem value={pm} />
            <div className="font-medium text-sm text-foreground">{pm}</div>
          </label>
        ))}
      </RadioGroup>

      {selectedPayment === "Card" && (
        <div className="space-y-3">
          <h4 className="text-base font-semibold pt-2">Saved Cards</h4>
          {savedCards.map((card) => (
            <label
              key={card.name}
              className="flex items-center justify-between border border-border p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={card.logo}
                  alt="card"
                  className="h-6 w-10 object-contain"
                />
                <div>
                  <p className="text-base font-medium text-foreground">
                    {card.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.info}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={selectedCard === card.name}
                onChange={() => setSelectedCard(card.name)}
              />
            </label>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="block mx-auto">
                Add New Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 py-2"
              >
                <Input placeholder="Cardholder Name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}

                <Input
                  placeholder="Card Number"
                  {...register("number")}
                  inputMode="numeric"
                  maxLength={19}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.match(/.{1,4}/g)?.join(" ") || "";
                    e.target.value = value;
                  }}
                />
                {errors.number && (
                  <p className="text-sm text-red-500">
                    {errors.number.message}
                  </p>
                )}

                <div className="flex gap-4">
                  <Input
                    placeholder="Expiry Date (MM/YY)"
                    {...register("expiry")}
                    maxLength={5}
                    inputMode="numeric"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 4) value = value.slice(0, 4);
                      let month = value.slice(0, 2);
                      const year = value.slice(2);
                      if (month.length === 2) {
                        const monthNum = parseInt(month, 10);
                        if (monthNum < 1 || monthNum > 12) month = "12";
                      }
                      e.target.value =
                        value.length > 2 ? month + "/" + year : month;
                    }}
                  />
                  <Input
                    placeholder="CVV"
                    {...register("cvv")}
                    maxLength={4}
                    inputMode="numeric"
                    onChange={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                    }}
                  />
                </div>
                {errors.expiry && (
                  <p className="text-sm text-red-500">
                    {errors.expiry.message}
                  </p>
                )}
                {errors.cvv && (
                  <p className="text-sm text-red-500">{errors.cvv.message}</p>
                )}

                <div className="flex items-center gap-2">
                  <Checkbox id="setDefault" {...register("setDefault")} />
                  <label htmlFor="setDefault" className="text-sm">
                    Set as default
                  </label>
                </div>

                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {selectedPayment === "Zain Pay" && (
        <div className="space-y-4 pt-2">
          <div className="text-sm text-muted-foreground">
            Please transfer the payment to the following number:
          </div>
          <div className="font-medium text-lg text-foreground bg-muted p-3 rounded-md w-fit">
            0912345678
          </div>
          <label
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-teal-500 transition-colors dark:border-gray-600 dark:hover:border-teal-400"
            onDrop={(e) => {
              e.preventDefault();
              const fileInput = e.currentTarget.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement;
              if (
                e.dataTransfer.files &&
                e.dataTransfer.files.length > 0 &&
                fileInput
              ) {
                fileInput.files = e.dataTransfer.files;
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setZainPayImage(ev.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
                const event = new Event("change", { bubbles: true });
                fileInput.dispatchEvent(event);
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col items-center gap-2">
              {zainPayImage ? (
                <Image
                  src={zainPayImage}
                  alt="Transaction"
                  width={96}
                  height={96}
                  className="h-24 w-auto rounded-md object-contain mb-2"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <>
                  <Upload />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag & drop or click to upload transaction image
                  </p>
                </>
              )}
            </div>
            <Input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setZainPayImage(ev.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setZainPayImage(null);
                }
              }}
            />
          </label>
        </div>
      )}

      {selectedPayment === "Cash on Delivery" && (
        <div
          className="bg-red-100 border-s-4 w-fit border-red-500 text-red-800 p-4 rounded-md mb-4 flex gap-2 items-center dark:bg-red-900 dark:border-red-400 dark:text-red-100"
          style={{ marginTop: "2rem" }}
        >
          <Info className="w-6 h-6 mr-2 text-red-500 dark:text-red-300" />
          <span className="text font-medium">
            Cash on Delivery incurs an additional <b>cash handling fee</b> of{" "}
            <b>20 LE</b>
          </span>
        </div>
      )}
      {selectedPayment === "Pay Later" && (
        <div
          className="bg-yellow-100 border-s-4 w-fit border-yellow-500 text-yellow-800 p-4 rounded-md mb-4 flex gap-2 items-center dark:bg-yellow-900 dark:border-yellow-400 dark:text-yellow-100"
          style={{ marginTop: "2rem" }}
        >
          <Info className="w-6 h-6 mr-2 text-yellow-500 dark:text-yellow-300" />
          <span className="text font-medium">
            You have chosen <b>Pay Later</b>. You will pay for your order at a
            later time as agreed.
          </span>
        </div>
      )}
      <div className="flex justify-end items-center gap-3 pt-4">
        <ButtonStepNav handleClick={onBack}>
          <ArrowLeft className="auto-dir" />
          Back
        </ButtonStepNav>
        <Button asChild>
          <Link href={"/account/orders"}>Place Order</Link>
        </Button>
      </div>
    </div>
  );
}
