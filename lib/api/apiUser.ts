"use server";

import {
  DoctorRegisterFormData,
  forgetPasswordT,
  RegisterFormData,
  resetPasswordT,
  ShippingMethod,
  SignInFormData,
  specializationT,
  UpdateUserPasswordData,
  UserAddress,
  UserProfile,
} from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";
import { signInSchema } from "../validators";
import { auth, signIn, signOut } from "../auth";
import { delay } from "../utils";
import { redirect } from "next/navigation";
import { getAuthToken } from "./helpers";

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

export async function registerDoctor(
  data: Omit<DoctorRegisterFormData, "certificate_file"> & {
    certificate_file?: File | string;
  }
) {
  // console.log("Doctor registration data:", data);
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Append all form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === "certificate_file") {
        // Handle both File object and string cases
        if (value && typeof value === "object" && "name" in value) {
          // It's a File object
          formData.append(key, value as File);
        } else if (typeof value === "string") {
          // It's a string (filename), skip it for now as we need the actual file
          console.warn(
            "Certificate file is a string, not a File object. File upload may fail."
          );
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Always set is_doctor to 1 for doctor registration
    formData.append("is_doctor", "1");

    const response = await api.post("doctor/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("doctor resgister response: ", response.data.data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error during doctor registration:", error.response?.data);
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

export async function signOutUser(token: string) {
  try {
    const response = await api.post(
      "logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Sign out response:", response.data);

    // Redirect to the sign-in page after successful sign-out
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
}

export async function forgetPasswordCheckEmail(data: forgetPasswordT) {
  try {
    const response = await api.post("forgot-password", {
      email: data.email,
    });

    console.log("forget password response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
    // Redirect to the sign-in page after successful sign-out
  } catch (error) {
    console.error("Error during sign-out:", error);
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send reset link",
      };
    }
  }
}

export async function resetPasswordCheckToken(data: resetPasswordT) {
  try {
    const response = await api.post("reset-password", data);

    console.log("reset password response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
    // Redirect to the sign-in page after successful sign-out
  } catch (error) {
    console.error("Error during reset password:", error);
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to reset password",
      };
    }
  }
}
export async function getProfile(userToken?: string) {
  try {
    const authResult = await getAuthToken(userToken);
    if (!authResult.success) {
      redirect("/signin");
    }
    const token = authResult.token;
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
  profileData: Omit<UserProfile, "Professional_info"> & {
    Professional_info: {
      specialization: string;
      license_number: string;
      bio: string;
      promo_code: string;
      certificate_file?: File | string;
    };
  },
  userToken?: string
) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;
  const data = { ...profileData, ...profileData.Professional_info };
  console.log("profile Data: ", data);
  try {
    let response;
    if (profileData.is_doctor) {
      response = await api.patch(
        "doctor/update/data",
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } else {
      response = await api.put(
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
    }
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

export async function updateUserPassword(
  data: UpdateUserPasswordData,
  userToken?: string
) {
  try {
    const authResult = await getAuthToken(userToken);
    if (!authResult.success) {
      return { success: false, message: authResult.message };
    }
    const token = authResult.token;
    const response = await api.put(
      "user-update-password",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as UserProfile,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update profile",
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

export async function getUserAddresses(userToken?: string) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;
  try {
    console.log("fetching addresses");
    const response = await api.get("user-addresses", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log("User addresses response:", response.data);
    if (response.data.result === "Success") {
      console.log("User addresses:", response.data.data);
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
  addressData: UserAddress,
  addressToUpdate: string = "",
  userToken?: string
) {
  console.log("Adding user address:", addressData);
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;
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

export async function deleteUserAddress(addressId: string, userToken?: string) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;

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

export async function getSiteShippingMethods() {
  try {
    const response = await api.get(`site/shipping`);
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

export async function updateUserLanguage(language: string, userToken?: string) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;
  try {
    const response = await api.put(
      "user-profile",
      {
        language: language,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data.result === "Success") {
      // Return success with updated data
      // The client should call update() from useSession to refresh the session
      return {
        success: true,
        data: response.data.data as UserProfile,
        message: "Language updated successfully",
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to update language",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating user language:", error.response);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update language",
      };
    }
  }
}

export async function updateUserCurrency(currency: string, userToken?: string) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;
  try {
    const response = await api.put(
      "user-currency",
      {
        currency_code: currency,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data.result === "Success") {
      // Return success with updated data
      // The client should call update() from useSession to refresh the session
      return {
        success: true,
        data: response.data.data as UserProfile,
        message: "Currency updated successfully",
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to update currency",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating user currency:", error.response);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update currency",
      };
    }
  }
}
export async function getDoctorsSpecializations() {
  try {
    const response = await api.get("/doctor/specializations");
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data as specializationT[],
      };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve specializations",
    };
  } catch (error) {
    console.error("Error fetching doctors specializations:", error);
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getAuthData() {
  const session = await auth();
  return session;
}

export async function getDoctorOrdersReport(
  filters?: {
    from_date?: string;
    to_date?: string;
    pharmacy_id?: string;
  },
  paginationQuery?: string,
  userToken?: string
) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;

  try {
    const body: Record<string, string> = {};

    if (filters?.from_date) {
      body.from_date = filters.from_date;
    }
    if (filters?.to_date) {
      body.to_date = filters.to_date;
    }
    if (filters?.pharmacy_id) {
      body.pharmacy_id = filters.pharmacy_id;
    }

    const url = `/doctor/orders/reports${
      paginationQuery ? `?${paginationQuery}` : ""
    }`;
    const response = await api.post(url, body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to fetch doctor orders report",
    };
  } catch (error) {
    console.error("Error fetching doctor orders report:", error);
    if (error instanceof AxiosError) {
      console.log("axios report error ", error.response);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch doctor orders report",
      };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getDoctorCommentsReport(
  filters?: {
    from_date?: string;
    to_date?: string;
    pharmacy_id?: string;
  },
  paginationQuery?: string,
  userToken?: string
) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;

  try {
    const body: Record<string, string> = {};

    if (filters?.from_date) {
      body.from_date = filters.from_date;
    }
    if (filters?.to_date) {
      body.to_date = filters.to_date;
    }
    if (filters?.pharmacy_id) {
      body.pharmacy_id = filters.pharmacy_id;
    }

    const url = `/doctor/comments/reports${
      paginationQuery ? `?${paginationQuery}` : ""
    }`;
    const response = await api.post(url, body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }

    return {
      success: false,
      message:
        response.data.message || "Failed to fetch doctor comments report",
    };
  } catch (error) {
    console.error("Error fetching doctor comments report:", error);
    if (error instanceof AxiosError) {
      console.log("axios comments report error ", error.response);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch doctor comments report",
      };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function updateProfileImage(image: File, userToken?: string) {
  const authResult = await getAuthToken(userToken);
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }
  userToken = authResult.token;

  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await api.post("/profile-image", formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || "Profile image updated successfully",
      };
    }

    return {
      success: false,
      message: response.data.message || "Failed to update profile image",
    };
  } catch (error) {
    console.error("Error updating profile image:", error);
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update profile image",
      };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
