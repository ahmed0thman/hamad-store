"use client";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

function SidebarContent({
  minRef,
  maxRef,
  customerRating,
  doctorRating,
  setCustomerRating,
  setDoctorRating,
  handleApply,
  handleReset,
}: {
  minRef: React.RefObject<HTMLInputElement | null>;
  maxRef: React.RefObject<HTMLInputElement | null>;
  customerRating: number | null;
  doctorRating: number | null;
  setCustomerRating: (rating: number) => void;
  setDoctorRating: (rating: number) => void;
  handleApply: () => void;
  handleReset: () => void;
}) {
  return (
    <aside className="space-y-6 bg-white dark:bg-slate-900 p-4 rounded-md shadow lg:sticky top-24">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <div className="basis-1/2">
            <label className="block text-sm">From</label>
            <Input
              ref={minRef}
              type="number"
              placeholder="Min"
              min={0}
              max={500}
              className="mb-2"
            />
          </div>
          <div className="basis-1/2">
            <label className="block text-sm">To</label>
            <Input
              ref={maxRef}
              type="number"
              placeholder="Max"
              min={0}
              max={500}
              className="mb-2"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Customer Rating</h3>
        <div className="flex gap-2 flex-wrap">
          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setCustomerRating(stars)}
              className={`px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-slate-700 ${
                customerRating === stars
                  ? "bg-gray-300 dark:bg-slate-700 font-semibold"
                  : "border-gray-300 dark:border-slate-700"
              }`}
            >
              {stars}{" "}
              <Star className="inline w-4 h-4 fill-yellow-500 text-yellow-500" />{" "}
              & up
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Doctor Rating</h3>
        <div className="flex gap-2 flex-wrap">
          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setDoctorRating(stars)}
              className={`px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-slate-700 ${
                doctorRating === stars
                  ? "bg-gray-300 dark:bg-slate-700 font-semibold"
                  : "border-gray-300 dark:border-slate-700"
              }`}
            >
              {stars}{" "}
              <Star className="inline w-4 h-4 fill-green-500 text-green-500" />{" "}
              & up
            </button>
          ))}
        </div>
      </div>
      <Button onClick={handleApply} className="w-full mt-4">
        Apply Filters
      </Button>
      <Button variant="outline" onClick={handleReset} className="w-full mt-2">
        Reset Filters
      </Button>
    </aside>
  );
}

function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const [customerRating, setCustomerRating] = useState<number | null>(null);
  const [doctorRating, setDoctorRating] = useState<number | null>(null);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minRef.current?.value) params.set("min", minRef.current.value);
    if (maxRef.current?.value) params.set("max", maxRef.current.value);
    if (customerRating) params.set("customerRating", String(customerRating));
    if (doctorRating) params.set("doctorRating", String(doctorRating));
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    setCustomerRating(null);
    setDoctorRating(null);
    router.push("?");
  };

  return (
    <>
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" className="absolute">
              <Filter /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="">
            <SheetTitle></SheetTitle>
            <SidebarContent
              minRef={minRef}
              maxRef={maxRef}
              customerRating={customerRating}
              doctorRating={doctorRating}
              setCustomerRating={setCustomerRating}
              setDoctorRating={setDoctorRating}
              handleApply={handleApply}
              handleReset={handleReset}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden col-span-3 lg:block">
        <SidebarContent
          minRef={minRef}
          maxRef={maxRef}
          customerRating={customerRating}
          doctorRating={doctorRating}
          setCustomerRating={setCustomerRating}
          setDoctorRating={setDoctorRating}
          handleApply={handleApply}
          handleReset={handleReset}
        />
      </div>
    </>
  );
}

export default ProductSidebar;
