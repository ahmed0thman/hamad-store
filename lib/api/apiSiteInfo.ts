"use server";
import { api } from "../axios";
import { AxiosError } from "axios";
import { signInSchema } from "../validators";
import { getAuthToken } from "./helpers";
import {
  aboutUsT,
  siteBannerT,
  siteFeatureT,
  siteInformationT,
  privacyPolicyT,
} from "@/types";

export async function getAboutPage(lang?: string) {
  try {
    const response = await api.get("/about", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as aboutUsT,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve about page info",
    };
  } catch (error) {
    console.error("Error fetching about page info:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getSiteFeatures(lang?: string) {
  try {
    const response = await api.get("/site/features", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as siteFeatureT[],
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve site features",
    };
  } catch (error) {
    console.error("Error fetching site features:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getSiteBanners(lang?: string) {
  try {
    const response = await api.get("/site/banners", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as siteBannerT[],
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve site banners",
    };
  } catch (error) {
    console.error("Error fetching site banners:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getSiteInformation(lang?: string) {
  try {
    const response = await api.get("/site/information", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as siteInformationT[],
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve site information",
    };
  } catch (error) {
    console.error("Error fetching site information:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getPrivacyPolicy(lang?: string) {
  try {
    const response = await api.get("/privacy-policy", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as privacyPolicyT,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve privacy policy",
    };
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getPTermsAndConditions(lang?: string) {
  try {
    const response = await api.get("/terms-conditions", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as privacyPolicyT,
      };
    }
    return {
      success: false,
      message:
        response.data.message || "Failed to retrieve terms and conditions",
    };
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
