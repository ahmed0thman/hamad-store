"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useTranslation } from "@/hooks/useTranslation";
import { updateProfileImage } from "@/lib/api/apiUser";
import { UserProfile } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { CameraIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const ProfileImage = () => {
  const { profileData, isLoadoingProfile } = useGetProfile();
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  if (isLoadoingProfile) return null;
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
      toast.error(t("pleaseSelectValidImage"));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("imageSizeMustBeLess"));
      return;
    }

    setIsUploading(true);
    try {
      const response = await updateProfileImage(file);
      if (response.success) {
        toast.success(t("profileImageUpdatedSuccessfully"));
        // Invalidate profile query to refetch updated data
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(response.message || t("failedToUpdateProfileImage"));
      }
    } catch (error) {
      toast.error(t("errorOccurredWhileUpdatingImage"));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const profile = profileData?.data as UserProfile | undefined;
  return (
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
          title={t("changeProfilePicture")}
          aria-label={t("changeProfilePicture")}
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
  );
};

export default ProfileImage;
