import axios from "axios";
import { API_URL, CURRENCY_CODE } from "../constants";
import { getLocale } from "@/localization";
import { getCurrencies, getCurrency } from "../api/apiPublic";
import { currencyT } from "@/types";

console.log("axios baseURL:", API_URL);

// Helper function to get language from cookie (works in both browser and server)
const getLanguage = async () => {
  const lang = await getLocale();
  return lang || "ar";
};

export const api = axios.create({
  baseURL: API_URL,
  timeout: 1000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Accept-Language header to every request
api.interceptors.request.use(async (config) => {
  const lang = await getLanguage();
  let currency = CURRENCY_CODE;
  const currencyCookie = await getCurrency();
  if (currencyCookie) {
    currency = currencyCookie;
  } else {
    const currenciesResponse = await getCurrencies();
    const currenciesData = currenciesResponse.data as currencyT[];
    if (currenciesResponse.success && currenciesData.length > 0) {
      const defaultCurrency = currenciesData.find(
        (currency) => currency.is_default
      );
      if (defaultCurrency) {
        currency = defaultCurrency.code;
      } else if (currenciesData.length > 0) {
        currency = currenciesData[0].code;
      }
    }
  }
  config.headers["Accept-Language"] = lang;
  config.headers["currency"] = currency;
  // console.log("Setting Accept-Language:", lang);
  return config;
});
