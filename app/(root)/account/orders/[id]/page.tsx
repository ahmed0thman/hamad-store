"use client";

import { cn, formatCurrencyEGP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import StarRating from "@/components/custom/starRating";
import { CartItem } from "@/types";
import RatingDialog from "@/components/custom/order/ratingDialog";
import { Check, CheckCircle, Minus } from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
  const items: CartItem[] = [
    {
      productId: "1",
      name: "omega three plus | soft gel capsules",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDG2UkD0xXRZROYZiruiWl-jIOiBtUV338EFIYgLdbMulEdL3TQxm35Rm_rWr7Nm9L6DVf-RbTnSbFl674_wsIpoBRZShGxl5sD35WlfFSMWEtFQG6NSb1h7nCuJNZJlf_sKw44jGvTJisBVws6vWhusAVZTEqO8ofP3G-597og7l2VWgsrKQmCCIt1mfpT7XOms36o8R6Xp5G6lEsfgmHenfaCaeE_KselOUnnvWJ1wtO9SxZ2jwDnoDhrwkBtlon6Xeo9vRzYInA",
      quantity: 1,
      unitPrice: "49.99",
      totalPrice: "49.99",
      slug: "product-1",
    },
    {
      productId: "2",
      name: "Product 2",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnt7467lZ7R5oQ5BTLpjUhcVcc7Cgn54zi-DtgKTSjVfANwsVV2_RaQnhiKmA4oZs-rf0UI8l9TKSBsYq7ygSwcZc1LGsjx2gR8GPbpJSfWdYqKr0q82wLIvM6PHjvP2DT9yd6np_A_NKl5aqkK0w1lU3AdKtw118hr5rxDNEXCCc26JNUU4WMG42rxkyLFXrPAHjdMWxpmZVb0jMgnX6vHEbuNkgNfdzrlQ50plWX1zVgyJQGTk4kZburRAwTg5I1_iVBrKUEWTE",
      quantity: 2,
      unitPrice: "39.99",
      totalPrice: "79.98",
      slug: "product-2",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Order #1234567890
        </h1>
      </div>

      {/* Items Table */}
      <div className="overflow-auto rounded-xl border">
        <Table className="w-full text-sm">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="p-4 font-medium text-foreground">
                Image
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                Name
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                Quantity
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                Unit Price
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                Total
              </TableHead>
              <TableHead className="p-4 font-medium text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="p-4">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />
                </TableCell>
                <TableCell className="p-4">{item.name}</TableCell>
                <TableCell className="p-4">{item.quantity}</TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {formatCurrencyEGP(+item.unitPrice)}
                </TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {formatCurrencyEGP(+item.totalPrice)}
                </TableCell>
                {/* Rate Action */}
                <TableCell className="p-4 flex items-center gap-2">
                  <RatingDialog item={item} />
                  {/* Button ask refund */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full bg-muted"
                    onClick={() => {
                      import("sonner").then(({ toast }) => {
                        toast(
                          <div className="space-y-2">
                            <div className="flex gap-1 items-center">
                              <p>
                                Product added to refund request, you can add
                                more or view the request
                              </p>
                              <CheckCircle className="w-8 h-8 text-green-500 ml-2" />
                            </div>
                            <Button asChild variant="link" size={"sm"}>
                              <Link href="/account/refund">
                                Complete Refund
                              </Link>
                            </Button>
                          </div>
                        );
                      });
                    }}
                  >
                    refund
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Summary */}
      <Card>
        <CardContent className="space-y-2">
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrencyEGP(159.96)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxes</span>
            <span>{formatCurrencyEGP(15.99)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>{formatCurrencyEGP(175.95)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Shipping Address</h3>
        <p className="text-sm">
          Sophia Clark, 123 Elm Street, Anytown, CA 91234
        </p>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Payment Method</h3>
        <div className="flex items-center gap-3">
          <Image
            src="/visa.svg"
            alt="Visa"
            width={40}
            height={24}
            className="object-contain"
          />
          <p className="text-sm truncate">Visa ...1234</p>
        </div>
      </div>

      {/* Delivery */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Delivery Date</h3>
        <p className="text-sm">Estimated delivery: July 15, 2024</p>
      </div>
    </div>
  );
}
