"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { specializationT, UserProfile } from "@/types";
import { updateUserProfile } from "@/lib/api/apiUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validators";
import { toast } from "sonner";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { useRouter } from "next/navigation";
import ChangePassword from "@/components/custom/profile/changePassword";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useQueryClient } from "@tanstack/react-query";
import useGetDoctorsSpecializations from "@/hooks/useGetDoctorsSpecializations";
import { useTranslation } from "@/hooks/useTranslation";

const Profile = () => {
  const { isLoadoingProfile, profileData } = useGetProfile();
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const { specializationsResponse, isLoadingSpecializations } =
    useGetDoctorsSpecializations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    // console.log("hhhhh");
    const profile = profileData?.data as UserProfile | null;
    if (profile) {
      reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        age: profile.age ? Number(profile.age) : undefined,
        gender: profile.gender || "",
        state: profile.state || "",
        Professional_info: {
          specialization: profile.Professional_info?.specialization || "",
          license_number: profile.Professional_info?.license_number || "",
          bio: profile.Professional_info?.bio || "",
          certificate_file: profile.Professional_info?.certificate_file || "",
          promo_code: profile.Professional_info?.promo_code || "",
        },
      });
    }
  }, [profileData, reset, setValue]);

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      // Set the filename for validation purposes
      setValue("Professional_info.certificate_file", file.name, {
        shouldValidate: true,
      });
    }
  };

  async function updateProfile(data: UserProfile) {
    const profile = profileData?.data as UserProfile | undefined;

    const updatedProfileData = {
      id: data.id || profile?.id || "",
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      age: data.age,
      gender: data.gender,
      state: data.state,
      language: profile?.language,
      profile_image: profile?.profile_image,
      is_doctor: profile?.is_doctor,
      currency_code: profile?.currency_code,
      Professional_info: {
        specialization: data.Professional_info?.specialization || "",
        license_number: data.Professional_info?.license_number || "",
        bio: data.Professional_info?.bio || "",
        promo_code: data.Professional_info?.promo_code || "",
        certificate_file:
          certificateFile ||
          data.Professional_info?.certificate_file ||
          undefined,
      },
    };

    // Call the API to update the profile
    const response = await updateUserProfile(updatedProfileData);
    if (response && response.success) {
      toast.success(t("profileUpdatedSuccessfully"), {
        duration: 3000,
        description: t("changesSavedSuccessfully"),
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } else {
      toast.error(t("failedToUpdateProfile"), {
        duration: 3000,
        description:
          response?.message || t("errorOccurredWhileUpdatingProfile"),
      });
    }
  }

  useEffect(() => {
    console.log("Errors:", errors);
  }, [errors]);

  useEffect(() => {
    router.refresh(); // Force refresh to rehydrate session
  }, [router]);

  if (isLoadoingProfile || isLoadingSpecializations) {
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

  const specializations = specializationsResponse?.data as specializationT[];

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t("accountDetails")}
      </h1>{" "}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(updateProfile)}
      >
        <div>
          <Label
            htmlFor="first-name"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            {t("firstName")} *
          </Label>
          <Input
            id="first-name"
            {...register("first_name")}
            placeholder={t("firstName")}
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
            {t("lastName")} *
          </Label>
          <Input
            id="last-name"
            {...register("last_name")}
            placeholder={t("lastName")}
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
            {t("phone")} *
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder={t("phone")}
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
            {t("email")} *
          </Label>
          <Input
            id="email"
            {...register("email")}
            placeholder={t("email")}
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
            {t("age")} *
          </Label>
          <Input
            id="age"
            {...register("age", { valueAsNumber: true })}
            placeholder={t("age")}
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
            {t("gender")} *
          </Label>
          <Input
            id="gender"
            {...register("gender")}
            placeholder={t("gender")}
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
            htmlFor="state"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            {t("address")} *
          </Label>
          <Input id="state" {...register("state")} placeholder={t("address")} />
          {errors.state && (
            <span className="text-red-500 text-xs">{errors.state.message}</span>
          )}
        </div>
        {profileData?.data?.Professional_info && (
          <>
            <div>
              <Label
                htmlFor="specialization"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                {t("specialization")}
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("Professional_info.specialization", value)
                }
                value={
                  profileData?.data?.Professional_info?.specialization || ""
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectSpecialization")} />
                </SelectTrigger>
                <SelectContent>
                  {specializations?.map((spec) => (
                    <SelectItem key={spec.id} value={spec.name}>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.Professional_info?.specialization && (
                <span className="text-red-500 text-xs">
                  {errors.Professional_info.specialization.message}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor="license_number"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                {t("licenseNumber")}
              </Label>
              <Input
                id="license_number"
                {...register("Professional_info.license_number")}
                type="text"
                placeholder={t("licenseNumber")}
              />
              {errors.Professional_info?.license_number && (
                <span className="text-red-500 text-xs">
                  {errors.Professional_info.license_number.message}
                </span>
              )}
            </div>

            <div className="md:col-span-2">
              <Label
                htmlFor="bio"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                {t("bio")}
              </Label>
              <Input
                id="bio"
                {...register("Professional_info.bio")}
                placeholder={t("bio")}
              />
              {errors.Professional_info?.bio && (
                <span className="text-red-500 text-xs">
                  {errors.Professional_info.bio.message}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor="certificate_file"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                {t("certificate")}
              </Label>
              <Input
                id="certificate"
                type="file"
                onChange={handleCertificateChange}
                className="mt-1"
              />
              {errors.Professional_info?.certificate_file && (
                <span className="text-red-500 text-xs">
                  {errors.Professional_info.certificate_file.message}
                </span>
              )}
              {/* Preview the fetched certificate file */}
              {profileData?.data?.Professional_info?.certificate_file &&
                !certificateFile && (
                  <a
                    href={
                      profileData?.data?.Professional_info?.certificate_file ||
                      "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {t("viewCertificate")}
                  </a>
                )}
              {/* Preview the newly selected certificate file */}
            </div>

            <div>
              <Label
                htmlFor="promo_code"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                {t("promoCode")}
              </Label>
              <Input
                id="promo_code"
                {...register("Professional_info.promo_code")}
                readOnly
              />
              {errors.Professional_info?.promo_code && (
                <span className="text-red-500 text-xs">
                  {errors.Professional_info.promo_code.message}
                </span>
              )}
            </div>
          </>
        )}
        <div className="mt-8 flex justify-end md:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <SpinnerMini /> : t("save")}
          </Button>
        </div>
      </form>
      <hr className="my-8 border-muted" />
      <ChangePassword />
    </div>
  );
};

export default Profile;
