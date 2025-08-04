"use server";

import { RegisterFormData, SignInFormData, UserProfile } from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";
import { signInSchema } from "../validators";
import { auth, signIn, signOut } from "../auth";
import { delay } from "../utils";
import { redirect } from "next/navigation";

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

export async function signOutUser() {
  try {
    await signOut();

    // Redirect to the sign-in page after successful sign-out
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
}

export async function getProfile(userToken: string = "") {
  let token: string = userToken;
  try {
    if (userToken === "") {
      const session = await auth();
      token = session?.user.token || session?.accessToken || "";
      if (!session || !session.user || !session.accessToken) {
        return { success: false, message: "User not authenticated" };
      }
    }

    token = userToken;
    const response = await api.get("user-profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("profile response", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserProfile,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching user profile:", error.response?.statusText);
      if (error.response?.statusText === "Unauthorized") {
        redirect("/signin");
      }
    }
  }
}

export async function updateUserProfile(
  userToken: string = '',
  profileData: UserProfile
) {
  try {
    const response = await api.put("user-profile", {
      ...profileData
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserProfile,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating user profile:", error.response?.statusText);
      return { success: false, message: error.response?.data?.message || "Failed to update profile" };
    }
  }

}
