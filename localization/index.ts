"use server";
import en, { Locale } from "./en";
import ar from "./ar";
import { cookies } from "next/headers";

const getLocaleStrings = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "ar";
  if (lang === "ar") return ar;
  return en;
};

const getLocale = async (): Promise<"ar" | "en"> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "ar";
  if (lang === "ar") return "ar";
  return "en";
};

export { getLocale };

export default getLocaleStrings;
