"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en, { Locale } from "@/localization/en";
import ar from "@/localization/ar";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  locale: Locale;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Locale) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [locale, setLocale] = useState<Locale>(ar);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read language from localStorage (client-side preference)
    const storedLang = localStorage?.getItem("language") as Language | null;
    const currentLang = storedLang || "ar";
    setLanguageState(currentLang);
    setLocale(currentLang === "ar" ? ar : en);

    // Sync to cookie for server-side
    document.cookie = `language=${currentLang}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setLocale(lang === "ar" ? ar : en);

    if (typeof document !== "undefined") {
      // Store in localStorage for client-side
      localStorage.setItem("language", lang);

      // Sync to cookie for server-side
      document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;

      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };
  const t = (key: keyof Locale): string => {
    if (!mounted) return "";
    return locale[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        locale,
        setLanguage,
        t,
        isRTL: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
