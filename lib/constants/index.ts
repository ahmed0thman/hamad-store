export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "hamad";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Prostore is your one-stop online shop for the latest electronics, fashion, and home essentials. Enjoy fast shipping, secure checkout, and unbeatable deals every day.";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "admin@example.com",
  password: "123456",
};

export const signUpDefaultValues = {
  name: "Ahmed Othman",
  email: "admin@example.com",
  password: "123456",
  confirmPassword: "123456",
};
