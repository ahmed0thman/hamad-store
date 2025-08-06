import { api } from "../axios";
import { AxiosError } from "axios";
import { auth } from "../auth";
import { OrderDetails, OrderItem, orderSaveParams } from "@/types";

export async function saveOrder(
  orderParams: orderSaveParams,
  userToken?: string
) {
  let token: string = "";
  if (!userToken) {
    const session = await auth();
    token = session?.user.token || session?.accessToken || "";
    if (!session || !session.user || !session.accessToken) {
      return { success: false, message: "User not authenticated" };
    }
  }

  try {
    const response = await api.post("/orders", orderParams, {
      headers: {
        Authorization: `Bearer ${token || userToken}`,
      },
    });
    if (response.data.result === "Success") {
      return { success: true, data: response.data.data };
    }
    return {
      success: false,
      message: response.data.message || "Failed to save order",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
export async function getUserOrders(userToken?: string) {
  let token: string = "";
  if (!userToken) {
    const session = await auth();
    token = session?.user.token || session?.accessToken || "";
    if (!session || !session.user || !session.accessToken) {
      return { success: false, message: "User not authenticated" };
    }
  } else {
    token = userToken;
  }

  try {
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.result === "Success") {
      return { success: true, data: response.data.data as OrderItem[] };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve orders",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getOrderDetails(userToken: string, orderId: number) {
  let token: string = "";
  if (!userToken) {
    const session = await auth();
    token = session?.user.token || session?.accessToken || "";
    if (!session || !session.user || !session.accessToken) {
      return { success: false, message: "User not authenticated" };
    }
  } else {
    token = userToken;
  }

  try {
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.result === "Success") {
      return { success: true, data: response.data.data as OrderDetails };
    }
    return {
      success: false,
      message: response.data.message || "Failed to retrieve order details",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
