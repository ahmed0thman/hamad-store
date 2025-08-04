"use client";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types";
import { getProfile, updateUserProfile } from "@/lib/api/apiUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validators";
import { toast } from "sonner";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { delay } from "@/lib/utils";
import { useProfile } from "@/contexts/ProfileContext";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { profile, loading, refreshProfile, token } = useProfile();
  const [pendingProfile, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    // console.log("hhhhh");
    if (profile) {
      reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        age: profile.age ? Number(profile.age) : undefined,
        gender: profile.gender || "",
        governorate: profile.governorate || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(updateProfile);
  };

  async function updateProfile() {
    const profileData: UserProfile = {
      id: profile?.id ?? "", // Provide a fallback or get from session/profile
      first_name: getValues("first_name"),
      last_name: getValues("last_name"),
      phone: getValues("phone"),
      email: getValues("email"),
      age: getValues("age"),
      gender: getValues("gender"),
      governorate: getValues("governorate"),
      language: profile?.language,
      profile_image: profile?.profile_image,
    };

    // Call the API to update the profile
    const response = await updateUserProfile(token, profileData);
    if (response && response.success) {
      toast.success("تم تحديث الملف الشخصي بنجاح", {
        duration: 3000,
        description: "تم حفظ التغييرات بنجاح.",
      });
      refreshProfile();
    } else {
      toast.error("فشل تحديث الملف الشخصي", {
        duration: 3000,
        description: response?.message || "حدث خطأ أثناء تحديث الملف الشخصي.",
      });
    }
  }

  useEffect(() => {
    router.refresh(); // Force refresh to rehydrate session
  }, [router]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 bg-gray-300 dark:bg-gray-700 rounded"
            />
          ))}
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded col-span-2" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-10 bg-gray-300 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        تفاصيل الحساب
      </h1>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={onSubmit}
      >
        <div>
          <Label
            htmlFor="first-name"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            الاسم الأول *
          </Label>
          <Input
            id="first-name"
            {...register("first_name")}
            placeholder="الاسم الأول"
            type="text"
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div>
          <Label
            htmlFor="last-name"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            الاسم الأخير *
          </Label>
          <Input
            id="last-name"
            {...register("last_name")}
            placeholder="الاسم الأخير"
            type="text"
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">
              {errors.last_name.message}
            </span>
          )}
        </div>
        <div>
          <Label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            رقم الهاتف *
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="رقم الهاتف"
            type="tel"
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            البريد الإلكتروني *
          </Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="البريد الإلكتروني"
            type="text"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="age"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            العمر *
          </Label>
          <Input
            id="age"
            {...register("age", { valueAsNumber: true })}
            placeholder="العمر"
            type="number"
          />
          {errors.age && (
            <span className="text-red-500 text-xs">{errors.age.message}</span>
          )}
        </div>
        <div>
          <Label
            htmlFor="gender"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            الجنس *
          </Label>
          <Input
            id="gender"
            {...register("gender")}
            placeholder="الجنس"
            type="text"
          />
          {errors.gender && (
            <span className="text-red-500 text-xs">
              {errors.gender.message}
            </span>
          )}
        </div>
        <div className="md:col-span-2">
          <Label
            htmlFor="governorate"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            المحافظة *
          </Label>
          <Input
            id="governorate"
            {...register("governorate")}
            placeholder="المحافظة"
          />
          {errors.governorate && (
            <span className="text-red-500 text-xs">
              {errors.governorate.message}
            </span>
          )}
        </div>
        <div className="mt-8 flex justify-end md:col-span-2">
          <Button
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();
            //   console.log("Submitting profile data");
            //   handleSubmit(onSubmit);
            // }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <SpinnerMini /> : "حفظ "}
          </Button>
        </div>
      </form>

      <hr className="my-8 border-muted" />

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        كلمة المرور
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="current-password"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            كلمة المرور القديمة
          </Label>
          <Input
            id="current-password"
            type="password"
            placeholder="كلمة المرور القديمة"
          />
        </div>
        <div className="hidden md:block" />
        <div>
          <Label
            htmlFor="new-password"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            كلمة المرور الجديدة
          </Label>
          <Input
            id="new-password"
            type="password"
            placeholder="كلمة المرور الجديدة"
          />
        </div>
        <div>
          <Label
            htmlFor="confirm-password"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            تأكيد كلمة المرور الجديدة
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="تأكيد كلمة المرور الجديدة"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit">حفظ التغييرات</Button>
      </div>
    </div>
  );
};

export default Profile;
