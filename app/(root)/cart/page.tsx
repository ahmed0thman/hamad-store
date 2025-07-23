"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatCurrencyEGP } from "@/lib/utils";
import Link from "next/link";

export default function Cart() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "فانيليا لوتين لمرض السكري",
      quantity: 1,
      image: "/images/uploads/drug.jpg",
      price: 80,
      stock: 5,
    },
    {
      id: 2,
      name: "مكمل غذائي أوميغا 3",
      quantity: 2,
      image: "/images/uploads/drug.jpg",
      price: 120,
      stock: 10,
    },
    {
      id: 3,
      name: "دواء ارتفاع الضغط",
      quantity: 3,
      image: "/images/uploads/drug.jpg",
      price: 150,
      stock: 8,
    },
  ]);

  return (
    <div className="wrapper mx-auto px-4 md:px-8 !py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 dark:bg-slate-900 dark:text-white">
      <div className="lg:col-span-2 space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="sm:p-4 bg-white dark:bg-slate-800">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex  items-start sm:items-center gap-4 w-full">
                <Image
                  src={order.image}
                  alt={order.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover w-16 h-16"
                />
                <div>
                  <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    {order.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    السعر للوحدة: EGP {order.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm font-medium text-gray-800 dark:text-white text-nowrap">
                  {formatCurrencyEGP(order.price * order.quantity)}
                </span>
                <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-lg text-red-500 hover:bg-red-100"
                    onClick={() =>
                      setOrders((prev) =>
                        prev.map((item) =>
                          item.id === order.id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                        )
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="text-sm font-medium w-6 text-center dark:text-white">
                    {order.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-lg text-green-600 hover:bg-green-100"
                    onClick={() =>
                      setOrders((prev) =>
                        prev.map((item) =>
                          item.id === order.id && item.quantity < item.stock
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-teal-50 dark:bg-slate-800 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-center text-teal-900 dark:text-teal-400 mb-6">
              ملخص الطلب
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{formatCurrencyEGP(2347)}</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة المقدرة</span>
                <span>{formatCurrencyEGP(50)}</span>
              </div>
              <div className="flex justify-between">
                <span>تقدير الشحن والتسليم</span>
                <span>{formatCurrencyEGP(29)}</span>
              </div>
              <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4">
                <span>المجموع</span>
                <span>{formatCurrencyEGP(2426)}</span>
              </div>
            </div>

            <div className="mt-6 border-t border-teal-200 dark:border-teal-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-teal-800 dark:text-teal-400">
                  مجموع نقاط الولاء
                </span>
                <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                  1,800 نقطة
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                كود الخصم
              </p>
              <div className="flex items-center gap-2">
                <Input placeholder="أدخل الكوبون" className="flex-grow" />
                <Button variant="destructive">حذف</Button>
              </div>
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                تم تطبيق الخصم
              </Button>
              <div className="flex justify-between font-bold text-teal-900 dark:text-teal-400 text-lg border-t border-teal-200 dark:border-teal-700 pt-4 mt-6">
                <span>المجموع</span>
                <span className="flex items-center">
                  {formatCurrencyEGP(2200)}
                </span>
              </div>
            </div>
            <Button
              asChild
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-lg"
            >
              <Link href="/place-order">إتمام الشراء</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
