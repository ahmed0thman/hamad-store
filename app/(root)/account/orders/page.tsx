"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrencyEGP } from "@/lib/utils";
// Card removed as it's not used
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const orders: Order[] = [
    {
      id: "123456",
      status: "Delivered",
      date: "July 20, 2024",
      itemCount: 3,
      total: 120,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwj3WEVLdj7NhV2WVHhb7AjydwtUlcy58GnRdf-0qHgl-wcNuizbaDPEW5e3SPlbq9Elxc2uk2EPNbtjHAyqQ4UfO0ntz7mq7by-a6B8DyvNZQ1sLAyOiT5DQiCmvGOo0e_HuId2WC14RVyBKX-LCmxDCVxNtOJdK1_p8vbFJ6NnDi-cbs0c3jWBiw9lpgPBaqlEmYv8yN4wSoIWHD45X5luJGa5rvX3ySOt76u5BIGu1qeUuvExaMlMFdpKq9K02arjXWR7ZJNA0",
    },
    {
      id: "789012",
      status: "Shipped",
      date: "July 15, 2024",
      itemCount: 2,
      total: 85,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6-utMUAL5STwxoM3jUyMxZLOIe92cHUsr9p6-ulx-9ydyMW-24dvvV8X30-SyljtU3H7cAFXknHsQeLl2Oca9AogfpZ20kklPYtJAixXLJSR2-56qO7c9faHPYMBoSaslg18qMpVpO-ghe_7rsV51JN4y84OMiuPuOa9bgq9sAj5cyMBgh23na5wEw2KNJzeZ01ZGcS6Q568fGx6li9tukjbLBQ3phCnxbSstqGo76YGOTUZS_XIKknB9NpvXsyMGBO-sB5OJv4U",
    },
    {
      id: "345678",
      status: "Delivered",
      date: "June 28, 2024",
      itemCount: 4,
      total: 150,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMRSGM4pYU1r6tu_iC0Vfcjrp5wbEVmkF0FbCl0yAokT4ycNRODpvTrqiLN7cXOzeIMZzUP7Jn43kDy8_2uhkQagIJNR4ciHl2VrWV9ysduzwF5_h9_87oBJIEyFvVomJw6iBfnqL68HoyZKhPhrLJx1rd4tYPlcp2sF3MF4FyN63iCYN5C3DfyEbjd_Vf2IHa2gc3DDJLbmisl0j_hPatTVF8jIaochSaZr9WGRNaBtbV6SdIh0RmkdjM-5xUBq8lGXB6r4ayZoI",
    },
    {
      id: "901234",
      status: "Canceled",
      date: "June 10, 2024",
      itemCount: 1,
      total: 40,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdFqkzltY-4hVR05sgCb0wwjoAvttRxHnvAG7eoQmNl1ey4dUMdtUaW4BY2p0IDJRR6HJ4J5HPSvmPA8QcPLtqdKE2WEGDhw_ZBu_vek0GzV4VadX41LGsDAKqoHNJYps3LVYm-CKnmuT992bgOAGDZmEFY9ym0ba-2qfGIrkdARGYrB-Z9ntxfS5ta3KfdVRTBrvYFvneRLg2zuetViGTA1GPOdUJ-yboVZ8hTX5Jbm9Z11SuNtxfmbN034TKKACqKnkyziu2vnQ",
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "Canceled":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                className="flex items-stretch justify-between gap-4 py-4"
              >
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.date} · {order.itemCount} items ·{" "}
                      {formatCurrencyEGP(order.total)}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="rounded-full w-fit"
                  >
                    <Link href={`/account/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 relative">
                  <Image
                    src={order.image}
                    alt={`Order ${order.id}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
