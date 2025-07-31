// Get Cart Data
import { success } from "zod";
import { auth } from "../auth";
import { api } from "../axios";
import { CartData } from "@/types";
import { AxiosError } from "axios";

export const getCartData = async () => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return { success: false, message: "User not authenticated" };
  }
  const token = session?.user.token || session?.accessToken;
  try {
    const response = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cart: CartData = response.data.data;
    if (cart) {
      return {
        success: true,
        data: cart,
      };
    }

    if (!response.data.data && response.data.status === 500) {
      return { success: false, message: "Cart is Empty", empty: true };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      //   console.log("Error fetching cart data:", error.response);
      if (error.response?.statusText === "Unauthorized") {
        return {
          success: false,
          message: "Unauthorized access",
          data: null,
          notAuthenticated: true,
        };
      }
    }
    return { success: false, message: "Failed to retrieve cart data" };
  }
};
