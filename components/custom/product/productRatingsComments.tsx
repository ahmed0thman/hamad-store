import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import React from "react";
import Image from "next/image";
import StarRating from "../starRating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function CommentCard({
  name,
  type,
  rating,
  avatarUrl,
}: {
  name: string;
  type: "doctor" | "customer";
  rating: number;
  avatarUrl?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const starColor = type === "doctor" ? "text-green-500" : "text-yellow-500";

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            width={40}
            height={40}
            alt={name}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-muted flex items-center justify-center text-sm font-bold font-sans">
            {initials}
          </div>
        )}
        <div>
          <div className="font-semibold text-primary mb-0.5 text-start">
            {name}
          </div>
          <div className={`flex items-center gap-0.5 ${starColor}`}>
            <StarRating value={4} outOf={5} color={starColor} />
          </div>
        </div>
        <div className="ms-auto text-foreground">
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-slate-400 text-start">
        تعليق الطبيب على جودة المنتج وفاعليته في تنظيم السكر...
      </p>
    </div>
  );
}

function CommentTabs({ count }: { count: number }) {
  return (
    <Tabs
      defaultValue="customer"
      className="w-full max-h-[calc(100dvh_-_8rem)]"
    >
      <TabsList className="bg-muted w-fit h-auto">
        <TabsTrigger asChild value="customer">
          <Button variant="ghost" className="text-base !py-2 !px-4">
            تعليق المستخدمين
          </Button>
        </TabsTrigger>
        <TabsTrigger asChild value="doctor">
          <Button variant="ghost" className="text-base !py-2 !px-4">
            تعليق الأطباء
          </Button>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="customer"
        className="divide-y divide-gray-200 dark:divide-slate-800 bg-muted/30 px-3 space-y-2 mt-4 overflow-auto"
      >
        {Array.from({ length: count }).map((_, i) => (
          <CommentCard key={i} name="أحمد" type="customer" rating={5} />
        ))}
      </TabsContent>

      <TabsContent
        value="doctor"
        className="divide-y divide-gray-200 dark:divide-slate-800 bg-muted/30 px-3 space-y-2 mt-4 overflow-auto"
      >
        {Array.from({ length: count }).map((_, i) => (
          <CommentCard key={i} name="د. مايكل" type="doctor" rating={4} />
        ))}
      </TabsContent>
    </Tabs>
  );
}

const ProductRatingsComments = () => {
  return (
    <section className="wrapper space-y-8">
      <div className="grid gap-4">
        <h3 className="text-xl font-bold mb-1 w-full">
          تقييمات ومراجعات المنتج
        </h3>
        <div className="flex flex-row justify-center items-center gap-6 w-full">
          <div className="flex items-center flex-col gap-2 p-4 ">
            <span className="text-stone-600 dark:text-slate-300 text-xl font-semibold">
              Customers
            </span>

            <div className="rounded-md shadow-sm py-3 px-6  bg-yellow-100 text-yellow-600 text-sm font-semibold flex flex-col items-center gap-1">
              <Star className="w-14 h-14 fill-current" />
              <span className="text-lg">4.0</span>
            </div>
            <span className="text-muted-foreground text-sm">(185 ratings)</span>
          </div>

          <div className="flex items-center flex-col gap-2 p-4 ">
            <span className="text-stone-600 dark:text-slate-300 text-xl font-semibold">
              Doctors
            </span>

            <div className="rounded-md shadow-sm py-3 px-6  bg-green-100 text-green-600 text-sm font-semibold flex flex-col items-center gap-1">
              <Star className="w-14 h-14 fill-current" />
              <span className="text-lg">4.2</span>
            </div>
            <span className="text-muted-foreground text-sm">(64 ratings)</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <CommentTabs count={4} />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="absolute top-3 end-3 !text-primary text-lg"
            >
              Show all
            </Button>
          </DialogTrigger>
          <DialogContent className="!w-10/12 !max-w-3xl">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <div className="mt-3">
                <CommentTabs count={40} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProductRatingsComments;
