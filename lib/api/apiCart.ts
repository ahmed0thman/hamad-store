// Get Cart Data
import { success } from "zod";
import { auth } from "../auth";
import { api } from "../axios";
import { CartData } from "@/types";
import { AxiosError } from "axios";
import { delay } from "../utils";

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

export const addToCart = async (prevState: unknown, formData: FormData) => {
  // await delay(2000);
  const productID = formData.get("productId");
  const quantity = formData.get("quantity") || 1; // Default to 1
  const token = formData.get("token") as string | undefined;

  if (!token) {
    // console.log("User not authenticated");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const response = await api.post(
      "/add-to-cart",
      {
        product_id: productID,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Add to cart response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.statusText === "Unauthorized") {
        return {
          success: false,
          message: "Unauthorized access",
          data: null,
          notAuthenticated: true,
        };
      }
    }
    return {
      success: false,
      message: "Failed to add item to cart",
      data: null,
      notAuthenticated: null,
    };
  }
};

export const updateCartItem = async (
  prevState: unknown,
  formData: FormData
) => {
  // await delay(2000);
  const productID = formData.get("productId");
  const quantity = formData.get("quantity") || 1; // Default to 1
  const token = formData.get("token") as string | undefined;

  if (!token) {
    // console.log("User not authenticated");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const response = await api.post(
      "/update-cart-item",
      {
        product_id: productID,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Update to cart response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.statusText === "Unauthorized") {
        return {
          success: false,
          message: "Unauthorized access",
          data: null,
          notAuthenticated: true,
        };
      }
    }
    return {
      success: false,
      message: "Failed to update item in cart",
      data: null,
      notAuthenticated: null,
    };
  }
};

export const removeCartItem = async (
  prevState: unknown,
  formData: FormData
) => {
  const productID = formData.get("productId");
  const token = formData.get("token") as string | undefined;

  if (!token) {
    // console.log("User not authenticated");
    return { success: false, message: "User not authenticated" };
  }
  try {
    const response = await api.post(
      `/remove-cart-item/${productID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Add to cart response:", response.data);
    if (response.data.result === "Success") {
      return {
        success: true,
        data: response.data.message,
      };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.statusText === "Unauthorized") {
        return {
          success: false,
          message: "Unauthorized access",
          data: null,
          notAuthenticated: true,
        };
      }
    }
    return {
      success: false,
      message: "Failed to remove item from cart",
      data: null,
      notAuthenticated: null,
    };
  }
};
