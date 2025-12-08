"use client";
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/hooks/useGetProfile";
import { updateUserLanguage } from "@/lib/api/apiUser";
import { useQueryClient } from "@tanstack/react-query";
import { Globe } from "lucide-react";
import React, { useEffect, useState } from "react";

const ButtonLang = ({ children }: { children?: React.ReactNode }) => {
  const [language, setLanguage] = useState("ar");
  const [mounted, setMounted] = useState(false);
  const { profileData, isLoadoingProfile } = useGetProfile();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
    const localLang = localStorage?.getItem("Lan");
    let newLang = "ar";

    if (profileData?.success && profileData.data?.language) {
      newLang = profileData.data.language;
    } else if (localLang) {
      newLang = localLang;
    }

    setLanguage(newLang);
    setDocumentLanguage(newLang);
  }, [profileData]);

  async function handleChangeLanguage() {
    const newLanguage = language === "ar" ? "en" : "ar";
    if (profileData?.success) {
      const response = await updateUserLanguage(newLanguage);
      if (response?.success) {
        setLanguage(newLanguage);
        setDocumentLanguage(newLanguage);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    }
    setLanguage(newLanguage);
    setDocumentLanguage(newLanguage);
    window.location.reload();
  }

  function setDocumentLanguage(newLang: string) {
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      localStorage?.setItem("Lan", newLang);
    }
  }

  // Only render after mount to prevent hydration mismatch
  if (!mounted || isLoadoingProfile) return null;

  return (
    <div onClick={handleChangeLanguage} suppressHydrationWarning>
      {children || (
        <Button variant="ghost" className=" gap-1 p-0">
          <Globe className="!w-6 !h-6" />
          {language === "ar" ? "AR" : "EN"}
        </Button>
      )}
    </div>
  );
};

export default ButtonLang;
