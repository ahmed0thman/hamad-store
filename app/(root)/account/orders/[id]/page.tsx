"use client";

import RatingDialog from "@/components/custom/order/ratingDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderDetails } from "@/lib/api/apiOrders";
import { formatCurrencyEGP } from "@/lib/utils";
import { CartItem, OrderDetails } from "@/types";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    case "confirmed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
    case "shipped":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100";
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
    case "returned":
      return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
    case "completed":
      return "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
  }
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [userToken, setUserToken] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

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

  async function fetchOrderDetails() {
    const response = await getOrderDetails(userToken, Number(id));
    console.log(response);
    if (response?.success) {
      setOrderDetails(response.data as OrderDetails);
    }
  }

  useEffect(() => {
    if (userToken) {
      startTransition(fetchOrderDetails);
    }
  }, [userToken]);

  if (pending)
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />

        {/* Table Skeleton */}
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {Array.from({ length: 6 }).map((_, i) => (
                  <th key={i} className="p-4 font-medium text-foreground">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="p-4">
                      <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary Skeleton */}
        <div className="h-32 bg-muted rounded animate-pulse" />

        {/* Shipping Address Skeleton */}
        <div className="h-12 bg-muted rounded animate-pulse" />

        {/* Payment Method Skeleton */}
        <div className="h-12 bg-muted rounded animate-pulse" />

        {/* Delivery Skeleton */}
        <div className="h-12 bg-muted rounded animate-pulse" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="">
        <h1 className="flex gap-3 items-center text-2xl font-bold tracking-tight text-foreground">
          Order #{orderDetails?.id}
          <Badge
            className={`${getStatusColor(
              orderDetails?.status || ""
            )} text-base`}
          >
            {orderDetails?.status}
          </Badge>
        </h1>
      </div>

      {/* Items Table */}
      <div className="overflow-auto rounded-xl border">
        <Table className="w-full text-sm">
          <TableHeader className="bg-muted">
            <TableRow>
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
              {orderDetails?.status.toLowerCase() === "delivered" && (
                <TableHead className="p-4 font-medium text-foreground">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {orderDetails?.items.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell className="p-4">{item.product_name}</TableCell>
                <TableCell className="p-4">{item.quantity}</TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {formatCurrencyEGP(+item.unit_price)}
                </TableCell>
                <TableCell className="p-4 text-muted-foreground">
                  {formatCurrencyEGP(+item.total)}
                </TableCell>
                {/* Rate Action */}
                {orderDetails?.status.toLowerCase() === "delivered" && (
                  <TableCell className="p-4 flex items-center gap-2">
                    <RatingDialog userToken={userToken} item={item} />
                    {/* Button ask refund */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full bg-muted"
                      onClick={() => {
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
                      }}
                    >
                      refund
                    </Button>
                  </TableCell>
                )}
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
            <span>{formatCurrencyEGP(Number(orderDetails?.subtotal))}</span>
          </div>
          {orderDetails?.coupon_discount && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Coupon</span>
              <span>
                {formatCurrencyEGP(Number(orderDetails?.coupon_discount))}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {formatCurrencyEGP(Number(orderDetails?.shipping_cost))}
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>
              {formatCurrencyEGP(Number(orderDetails?.total_after_shipping))}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Shipping Address</h3>
        <p className="text-sm">
          {orderDetails?.shipping_address || "No shipping address provided"}
        </p>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Payment Method</h3>

        <p className="text-base truncate capitalize">
          {orderDetails?.payment_type || "No payment method provided"}
        </p>
      </div>

      {/* Delivery */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Delivery Date</h3>
        <p className="text-sm">
          Estimated delivery:{" "}
          {orderDetails?.due_date || "No delivery date provided"}
        </p>
      </div>
    </div>
  );
}
