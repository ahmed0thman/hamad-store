"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// Removed Card imports per request
import { formatCurrencyEGP } from "@/lib/utils";

type RefundItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
};

export default function RefundPage() {
  const [items, setItems] = useState<RefundItem[]>([
    {
      id: "1",
      name: "Multivitamin – 60 Capsules",
      quantity: 1,
      unitPrice: 25,
      totalPrice: 25,
      image: "/images/uploads/drug.jpg",
    },
    {
      id: "2",
      name: "Omega-3 Fish Oil – 120 Softgels",
      quantity: 1,
      unitPrice: 30,
      totalPrice: 30,
      image: "/images/uploads/drug.jpg",
    },
  ]);
  const [reason, setReason] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const [refundImage, setRefundImage] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Refund Request</h1>
          <p className="text-sm text-muted-foreground">Order #9876543210</p>
        </div>
      </div>

      {/* Items Table */}
      <h2 className="text-lg font-medium">Items to Refund</h2>
      <div className="overflow-auto border rounded-xl">
        <Table className="w-full">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatCurrencyEGP(item.unitPrice)}</TableCell>
                <TableCell>{formatCurrencyEGP(item.totalPrice)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    className="rounded-full bg-muted"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Refund Reason */}
      <h2 className="text-lg font-medium">Refund Reason</h2>
      <Textarea
        placeholder={`Why are you requesting a refund for ${items
          .map((i) => i.name)
          .join(", ")}?`}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="min-h-[120px] resize-none"
      />

      {/* Upload Proof Image */}
      <h2 className="text-lg font-medium">Upload Proof Image</h2>
      <label
        className="w-full h-40 border-2 border-dashed border-muted rounded-md flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (ev) => setRefundImage(ev.target?.result as string);
            reader.readAsDataURL(file);
          }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {refundImage ? (
            <Image
              src={refundImage}
              alt="Proof"
              width={96}
              height={96}
              className="h-24 w-auto rounded-md object-contain mb-2"
            />
          ) : (
            <>
              <Upload className="w-6 h-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload image
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file?.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (ev) =>
                setRefundImage(ev.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />
      </label>

      {/* Refund Summary */}
      <h2 className="text-lg font-medium">Refund Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrencyEGP(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Refund</span>
          <span>{formatCurrencyEGP(subtotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
        <Button variant="default">Submit Refund Request</Button>
      </div>
    </div>
  );
}
