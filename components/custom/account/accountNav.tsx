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

const accountTabs = [
  { name: "البيانات الشخصية", href: "/account/profile" },
  { name: "العناوين", href: "/account/addresses" },
  { name: "الطلبات", href: "/account/orders" },
  { name: "المرتجعات", href: "/account/refund" },
  // { name: "طرق الدفع", href: "/account/payment-methods" },
  { name: "المحفظة", href: "/account/wallet" },
  { name: "مقارنة المنتجات", href: "/account/compare" },
  { name: "التقارير", href: "/account/reports/reviews", is_doctor: true },
  // { name: "استشر طبيب", href: "/account/doctor" },
];

const AccountNav = () => {
  const pathName = usePathname();
  const { profileData, isLoadoingProfile } = useGetProfile();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار صورة صالحة");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setIsUploading(true);
    try {
      const response = await updateProfileImage(file);
      if (response.success) {
        toast.success("تم تحديث صورة الملف الشخصي بنجاح");
        // Invalidate profile query to refetch updated data
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(response.message || "فشل تحديث صورة الملف الشخصي");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث الصورة");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-white">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={profile?.profile_image || ""}
                alt={`${profile?.first_name} ${profile?.last_name}`}
              />
              <AvatarFallback>
                {profile?.first_name?.[0]}
                {profile?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <button
            onClick={handleImageClick}
            disabled={isUploading}
            className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="تغيير صورة الملف الشخصي"
          >
            <CameraIcon className="text-teal-500 w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-accent-foreground">
          {profile?.first_name} {profile?.last_name}
        </h2>
      </div>
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
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AccountNav;
