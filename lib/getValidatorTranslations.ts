import en from "@/localization/en";
import ar from "@/localization/ar";

// Helper to get translations for validators
// This reads from localStorage since validators are used in client-side forms
export const getValidatorTranslations = () => {
  if (typeof window === "undefined") {
    return en; // Default to English on server-side
  }

  const lang = localStorage.getItem("language") || "ar";
  return lang === "ar" ? ar : en;
};
