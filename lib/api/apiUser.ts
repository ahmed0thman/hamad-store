"use server";

import {
  RegisterFormData,
  ShippingMethod,
  SignInFormData,
  UserAddress,
  UserProfile,
} from "@/types";
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
      console.log("Unexpected error during registration:", error);
      return {
        success: false,
        payload: "An unexpected error occurred",
      };
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
  userToken: string = "",
  profileData: UserProfile
) {
  if (!userToken) {
    // console.log("User not authenticated");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const response = await api.put(
      "user-profile",
      {
        ...profileData,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserProfile,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating user profile:", error.response?.statusText);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  }
}

export async function getUserAddresses(userToken: string = "") {
  if (!userToken) {
    // console.log("User not authenticated");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const response = await api.get("user-addresses", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.data.result === "Success") {
      // console.log("User addresses:", response.data.data);
      const addresses: UserAddress[] = response.data.data;
      return {
        success: true,
        data: addresses,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching user addresses:",
        error.response?.statusText
      );
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch addresses",
      };
    }
  }
}

export async function addUserAddress(
  userToken: string = "",
  addressData: UserAddress,
  addressToUpdate: string = ""
) {
  console.log("Adding user address:", addressData);
  if (!userToken) {
    const session = await auth();
    userToken = session?.user.token || session?.accessToken || "";
    if (!session || !session.user || !session.accessToken) {
      // console.log("User not authenticated");
      return { success: false, message: "User not authenticated" };
    }
  }
  try {
    const response = await api[addressToUpdate ? "put" : "post"](
      addressToUpdate ? `user-addresses/${addressToUpdate}` : "user-addresses",
      {
        ...addressData,
        is_default: addressData.is_default ? 1 : 0,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(" address added:", response.data.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserAddress,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to add address",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error adding user address:", error.response);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add address",
      };
    }
  }
}

export async function deleteUserAddress(
  userToken: string = "",
  addressId: string
) {
  if (!userToken) {
    const session = await auth();
    userToken = session?.user.token || session?.accessToken || "";
    if (!session || !session.user || !session.accessToken) {
      // console.log("User not authenticated");
      return { success: false, message: "User not authenticated" };
    }
  }

  try {
    const response = await api.delete(`user-addresses/${addressId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserAddress,
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to delete address",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error deleting user address:", error.response);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete address",
      };
    }
  }
}

export async function getPharmacyShippingMethods(pharmacyId: number) {
  try {
    const response = await api.get(`pharmacies/${pharmacyId}/shipping`);
    console.log("Shipping methods response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as ShippingMethod[],
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching pharmacy shipping methods:",
        error.response?.statusText
      );
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch shipping methods",
      };
    }
  }
}
