"use client";

import { useGetCart } from "@/hooks/useGetCart";
import { useTranslation } from "@/hooks/useTranslation";
import { CartData } from "@/types";
import { Locale } from "@/localization/en";
import {
  House,
  MessagesSquare,
  Pill,
  Search,
  ShoppingCart,
  TruckElectric,
  PanelLeft,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const getNavItems = (t: (key: keyof Locale) => string) => [
  { href: "/", icon: House, label: t("home") },
  // { href: "/account/portions", icon: Pill, label: t("myDose") },
  // { href: "/products", icon: Pill, label: t("products") },
  { href: "/account/compare", icon: PanelLeft, label: t("compareProducts") },
  // { href: "/search", icon: Search, label: t("search"), id: "search-nav" },
  { href: "/cart", icon: ShoppingCart, label: t("cart") },
  { href: "/account/orders", icon: TruckElectric, label: t("myOrders") },
  // { href: "/account/chat", icon: MessagesSquare, label: t("myChats") },
];

const MobileNav = () => {
  const { t } = useTranslation();
  const navItems = getNavItems(t);
  const pathName = usePathname();
  const isActive = (href: string) => {
    if (href === "/") {
      return pathName === href || pathName === "/";
    }
    return pathName.includes(href);
  };
  let cart: CartData | null = null;
  let isEmpty = false;
  let multiStores = false;
  const { data: cartData, isLoading, error } = useGetCart();
  if (cartData?.notAuthenticated) {
    cart = null;
    signOut({ redirectTo: "/signin" });
  }
  if (cartData?.empty) {
    isEmpty = true;
  }
  cart = cartData?.data as CartData;

  if (cart?.pharmacies && cart.pharmacies.length > 1) {
    multiStores = true;
  }
  return (
    <nav className="nav-mobile">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              className={`nav-item relative ${isActive(href) ? " active" : ""}`}
              href={href}
            >
              {/* cart count badge */}
              {href === "/cart" && cart?.pharmacies && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {multiStores
                    ? cart?.pharmacies.length
                    : cart?.pharmacies[0].items.length}
                </span>
              )}
              <Icon />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
