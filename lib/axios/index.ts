import axios from "axios";
import { API_URL } from "../constants";
import { getLocale } from "@/localization";

console.log("axios baseURL:", API_URL);

// Helper function to get language from cookie (works in both browser and server)
const getLanguage = async () => {
  const lang = await getLocale();
  return lang || "ar";
};

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Accept-Language header to every request
api.interceptors.request.use(async (config) => {
  const lang = await getLanguage();
  config.headers["Accept-Language"] = lang;
  // console.log("Setting Accept-Language:", lang);
  return config;
});
