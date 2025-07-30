import z from "zod";
import { formatCurrencyEGP } from "./utils";

export const currency = z.string().refine(
  (val) => {
    try {
      return formatCurrencyEGP(Number(val)) === val;
    } catch {
      return false;
    }
  },
  { message: "Invalid currency format" }
);

export const gender = z.string().refine(
  (val) => {
    return val === "male" || val === "female";
  },
  {
    message: "Gender must be either 'male' or 'female'",
  }
);

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  image: z.string().url("Image must be a valid URL"),
  unitPrice: currency,
  totalPrice: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
  total: currency,
  totalItems: z.number().int().min(1, "Total items must be at least 1"),
  totalPrice: currency,
  totalPriceWithDiscount: currency.optional(),
  discount: z.number().int().min(0, "Discount must be at least 0").optional(),
  userId: z.string().optional().nullable(),
  sessionCartId: z.string().min(1, "Session Cart ID is required"),
});

export const cardSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  setDefault: z.boolean().optional(),
});

// Authentication types

export const registerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    governorate: z.string().min(1, "Governorate is required"),
    gender: gender,
    age: z.string().regex(/^\d+$/, "Age must be a valid number"),
    phone: z
      .string()
      .regex(/^\+20\d{10}$/, "Phone must be a valid Egyptian number"),
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

// Create the signin schema
export const signInSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
