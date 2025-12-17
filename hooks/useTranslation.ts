"use client";

import { useEffect, useState } from "react";
import en, { Locale } from "@/localization/en";
import ar from "@/localization/ar";

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(ar); // Default to Arabic
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get language from localStorage (client-side preference)
    const storedLang = localStorage?.getItem("language") as "ar" | "en" | null;
    const currentLang = storedLang || "ar";

    setLanguage(currentLang);
    setLocale(currentLang === "ar" ? ar : en);

    // Sync to cookie for server-side
    document.cookie = `language=${currentLang}; path=/; max-age=31536000; SameSite=Lax`;

    // Set document direction
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }
  }, []); // Listen for language changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage?.getItem("language") as
        | "ar"
        | "en"
        | null;
      const currentLang = storedLang || "ar";

      if (currentLang !== language) {
        setLanguage(currentLang);
        setLocale(currentLang === "ar" ? ar : en);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [language]);
  const t = (key: keyof Locale): string => {
    if (!mounted) return ""; // Prevent hydration mismatch
    return locale[key] || key;
  };

  return {
    t,
    locale,
    language,
    isRTL: language === "ar",
    mounted,
  };
}
