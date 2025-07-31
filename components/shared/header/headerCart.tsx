/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyEGP } from "@/lib/utils";
import { CartData } from "@/types";
import { ShoppingCart } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const HeaderCart = ({ session, cartData }: { session: any; cartData: any }) => {
  let cart: CartData | null = null;
  let isEmpty = false;
  const isAuthenticated = session && session.user && session.accessToken;
  if (isAuthenticated) {
    if (cartData?.notAuthenticated) {
      cart = null;
      signOut({ redirectTo: "/signin" });
    }
    if (cartData?.empty) {
      isEmpty = true;
    }
    cart = cartData;
  }

  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" p-0">
            <ShoppingCart className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 ">
          <DropdownMenuLabel className="text-primary">
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <Link href="/login" className="text-primary underline">
                Login
              </Link>{" "}
              to view your cart
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isEmpty) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" p-0">
            <ShoppingCart className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 ">
          <DropdownMenuLabel className="text-primary">
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <ShoppingCart className="w-5 h-5 opacity-50" />
              Cart is Empty
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" p-0">
          <ShoppingCart className="!w-6 !h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-3 ">
        <DropdownMenuLabel className="text-primary">
          <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
            <Badge variant="secondary" className="text-base">
              {cart?.summary.count_items}
            </Badge>
            elements
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="text-stone-700 dark:text-stone-300 text-sm font-semibold capitalize px-2 py-1.5 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition">
          <div className="flex items-center gap-2">
            <span>Total</span>
            {formatCurrencyEGP(cart?.summary.total as number)}
          </div>
        </DropdownMenuItem>

        <Button
          asChild
          className="w-full mt-2 bg-primary text-white hover:bg-primary/90 transition font-semibold"
        >
          <Link href="/cart">View Cart</Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderCart;
