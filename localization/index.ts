import en, { Locale } from "./en";
import ar from "./ar";

const getLocaleStrings = (): Locale => {
  const lang: string = "en";
  if (lang === "ar") return ar;
  return en;
};

export const strings = getLocaleStrings();
