"use client";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { revalidate, revalidateAll } from "@/lib/api/actions";
import { usePathname } from "next/navigation";

const ButtonLang = ({ children }: { children?: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage: setContextLanguage } = useLanguage();
  const { t } = useTranslation();
  const pathName = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleChangeLanguage() {
    const newLanguage = language === "ar" ? "en" : "ar";

    // Update context
    setContextLanguage(newLanguage);

    // Store in localStorage for client-side
    localStorage.setItem("language", newLanguage);

    // Sync to cookie for server-side
    document.cookie = `language=${newLanguage}; path=/; max-age=31536000; SameSite=Lax`;

    // Trigger a page reload to update server components
    // revalidate current path
    await revalidateAll();
    window.location.reload();
  }

  // Only render after mount to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div onClick={handleChangeLanguage} suppressHydrationWarning>
      {children || (
        <Button
          variant="ghost"
          className=" gap-1 p-0"
          aria-label={t("switchLanguage")}
        >
          <Globe className="!w-6 !h-6" />
          {language === "ar" ? "AR" : "EN"}
        </Button>
      )}
    </div>
  );
};

export default ButtonLang;
