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
  storeInformationT,
  faqT,
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

export async function getFaqs(lang?: string) {
  try {
    const response = await api.get("/faqs", {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as faqT[],
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve FAQs",
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
// Store Information Endpoints
export async function getStoreBanners(id: number, lang?: string) {
  try {
    const response = await api.get(`/pharmacy/banners/${id}`, {
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
      message: response.data.message || "Failed to retrieve store banners",
    };
  } catch (error) {
    console.error("Error fetching store banners:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getStoreFeatures(id: number, lang?: string) {
  try {
    const response = await api.get(`/pharmacy/features/${id}`, {
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
      message: response.data.message || "Failed to retrieve store features",
    };
  } catch (error) {
    console.error("Error fetching store features:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getStoreInformation(id: number, lang?: string) {
  try {
    const response = await api.get(`pharmacies/${id}/show`, {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as storeInformationT,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve store information",
    };
  } catch (error) {
    console.error("Error fetching store information:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
