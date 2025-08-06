"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrencyEGP } from "@/lib/utils";
// Card removed as it's not used
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { OrderItem } from "@/types";
import { getUserOrders } from "@/lib/api/apiOrders";

interface Order {
  id: string;
  status: "Delivered" | "Shipped" | "Canceled";
  date: string;
  itemCount: number;
  total: number;
  image: string;
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const [userToken, setUserToken] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const [orders, setOrders] = useState<OrderItem[]>([]);

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

  async function fetchOrders() {
    const response = await getUserOrders(userToken);
    console.log(response);
    if (response?.success) {
      setOrders(response.data as OrderItem[]);
    }
  }

  useEffect(() => {
    if (userToken) {
      startTransition(fetchOrders);
    }
  }, [userToken]);

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

  const filteredOrders = orders.filter((order) =>
    order.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (pending) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-stretch justify-between gap-4 py-4"
          >
            <div className="flex flex-[2_2_0px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full w-fit"
              >
                <span className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <section className="">
      <div className="wrapper px-4 py-8">
        <div className="flex flex-col max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <h1 className="text-foreground text-3xl font-bold leading-tight min-w-72">
              My Orders
            </h1>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by product name or order ID"
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4 divide-y divide-y-muted mt-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-[2_2_0px] flex-col gap-4 pb-4"
              >
                <div className="flex flex-col gap-1">
                  {/* Pharmacy Name at top */}
                  <div className="font-semibold text-base text-foreground flex items-center gap-2">
                    <p className="capitalize">{order.pharmacy_name}</p> -{" "}
                    <p>#{order.id}</p>
                  </div>

                  {/* Status below order code */}
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  {/* Total below status */}
                  <p className="text-sm text-muted-foreground">
                    {formatCurrencyEGP(Number(order.total))}
                  </p>
                </div>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="rounded-full w-fit ms-auto hover:bg-secondary/50 transition-colors duration-200"
                >
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
