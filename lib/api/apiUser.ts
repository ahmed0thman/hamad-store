"use server";

import { RegisterFormData, SignInFormData } from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";
import { signInSchema } from "../validators";
import { signIn } from "../auth";
import { success } from "zod";

export async function registerUser(data: RegisterFormData) {
  try {
    const response = await api.post("register", data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return {
          status: "error",
          payload: error.response.data.errors,
        };
      }
    } else {
      throw error;
    }
  }
}

// Sign in the user with credentials
export async function signInWithCredentials(formData: SignInFormData) {
  try {
    const user = signInSchema.parse({
      email: formData.email,
      password: formData.password,
    });
    await signIn("credentials", {
      ...user,
      redirect: false,
    });

    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    // console.log("error", error);
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return {
          status: "error",
          payload: error.response.data.errors,
        };
      }
    } else {
      return {
        success: false,
        payload: "An unexpected error occurred",
      };
    }
  }
}
