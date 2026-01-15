"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/contexts/ProfileContext";
import { CameraIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { updateProfileImage } from "@/lib/api/apiUser";
import { toast } from "sonner";
import { useGetProfile } from "@/hooks/useGetProfile";
import { UserProfile } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";
import ProfileImage from "./ProfileImage";

const accountTabs = [
  { name: "personalInfo", href: "/account/profile" },
  { name: "addresses", href: "/account/addresses" },
  { name: "orders", href: "/account/orders" },
  { name: "returns", href: "/account/refund" },
  // { name: "paymentMethods", href: "/account/payment-methods" },
  { name: "wallet", href: "/account/wallet" },
  { name: "compareProducts", href: "/account/compare" },
  { name: "reports", href: "/account/reports/reviews", is_doctor: true },
  // { name: "consultDoctor", href: "/account/doctor" },
];

const AccountNav = () => {
  const pathName = usePathname();
  const { profileData, isLoadoingProfile } = useGetProfile();

  const { t } = useTranslation();

  if (isLoadoingProfile) {
    return (
      <aside className="col-span-1 hidden lg:block bg-teal-50 dark:bg-accent p-6 rounded-sm shadow-teal-900/10 shadow-sm sticky top-24 h-fit animate-pulse">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center" />
            <span className="absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-600 rounded-full p-2 shadow-md" />
          </div>
          <div className="mt-4 h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <nav className="space-y-2">
          {Array.from({ length: accountTabs.length }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </nav>
      </aside>
    );
  }

  const profile = profileData?.data as UserProfile | undefined;

  return (
    <aside className="col-span-1 hidden lg:block bg-teal-50 dark:bg-accent p-6 rounded-sm shadow-teal-900/10 shadow-sm sticky top-24 h-fit">
      <ProfileImage />

      <nav className="space-y-2 text-sm font-medium text-accent-foreground">
        {accountTabs.map((tab, index) => {
          if (tab.is_doctor && !profile?.is_doctor) {
            return null;
          }
          const isActive = pathName.includes(tab.href.split("/")[2]);
          return (
            <Link
              key={index}
              href={tab.href}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-teal-600 text-white" : "hover:bg-muted"
              }`}
            >
              {t(tab.name as keyof typeof t)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AccountNav;
