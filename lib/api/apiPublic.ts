"use server";

import { contactMessageT, currencyT, DoctorProfileT } from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const sendContactMessage = async (params: contactMessageT) => {
  try {
    const response = await api.post("/user-contact", params);
    if (response.data.result === "Success") {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to send contact message",
      };
    }
  } catch (error) {
    console.log("error sending message: ", error);
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};

export async function getDoctorProfile(id: number) {
  try {
    const response = await api.get(`doctors/${id}`);
    // console.log("profile response", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as DoctorProfileT,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}

export async function getCurrencies() {
  try {
    const response = await api.get("currencies");
    // console.log("profile response", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as currencyT[],
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}

export async function setCurrency(currency: string) {
  const cookieStore = await cookies();
  // Only ResponseCookies (not ReadonlyRequestCookies) has set().
  // This works in server actions, middleware, or API routes.
  // If cookies() returns ReadonlyRequestCookies, this will throw.
  // So, use this only in supported contexts.
  cookieStore.set("currency", currency, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function getCurrency() {
  const cookieStore = await cookies();
  const currencyCookie = cookieStore.get("currency");
  if (currencyCookie) {
    return currencyCookie.value;
  }
  return null;
}
