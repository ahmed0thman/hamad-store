import { contactMessageT } from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";

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
