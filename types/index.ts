import {
  cardSchema,
  cartItemSchema,
  insertCartSchema,
  profileSchema,
  registerSchema,
  signInSchema,
} from "@/lib/validators";
import { CredentialsSignin } from "next-auth";
import z from "zod";

// Authentication types
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

export class SignInError extends CredentialsSignin {
  message = "signin_error";
}

export type User = {
  id: string;
  email: string;
  token?: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  language: string;
  governorate: string;
  phone: string;
  emailVerified: boolean;
  profileImage: string | null;
};
export type UserProfile = z.infer<typeof profileSchema>;

// -------------------

export type CardFormData = z.infer<typeof cardSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

// Product types

export type TaxInfo = {
  tax_rate: number;
  tax_value: number;
  price_with_tax: number;
};

export type OfferPeriod = {
  start_date: string;
  end_date: string;
};

export type ProductOffer = {
  product_id: number;
  offer_title: string;
  price_before: number;
  price_after: number;
  discount: number;
  discount_percentage: number;
  offer_period: OfferPeriod;
  tax: TaxInfo;
};

export type Pharmacy = {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  image: string;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  user_name: string;
  user_image: string | null;
  rate: number;
  comment: string;
};

export type ProductItem = {
  id: number;
  name: string;
  pharmacy_id: number;
  price: number;
  quantity: number;
  image: string | null;
  brand_id: number;
  category_id: number;
  average_rating: {
    user: number;
    count_user_rate: number;
    pharmacist: number;
    count_pharmacist_rate: number;
  };
  tax_rate: number;
  offer?: ProductOffer | null;
};

export type Product = {
  id: number;
  name: string;
  pharmacy: Pharmacy;
  generic_name: string;
  type: string;
  form: string;
  strength: string;
  price: number;
  quantity: number;
  brand_id: number;
  category_id: number;
  image: string | null;
  average_rating: {
    user: number;
    count_user_rate: number;
    pharmacist: number;
    count_pharmacist_rate: number;
  };
  tax_rate: number;
  production_date: string;
  expiry_date: string;
  barcode: string | null;
  pack_size: string | null;
  description: string;
  categoryName: string;
  brandName: string;
  gallery: string[] | null;
  offer: ProductOffer | null;
  user_comments: Comment[];
  pharmacist_comments: Comment[];
  similar_products: ProductItem[];
};

export type FavoriteItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  created_at: string;
};

export type category = {
  id: string;
  position: number | null;
  name: string;
  show_home: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deleted: boolean;
  image: string;
};

export type Brand = {
  id: number;
  position: number | null;
  name: string;
  show_home: boolean;
  rating: number | null;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deleted: boolean;
};

export type CartProductItem = {
  product_id: number;
  name: string;
  base_price: number;
  final_price: number;
  tax_amount: number;
  quantity: number;
  total: number;
  free_quantity: number;
  price_after_discount: number;
};

export type CartPharmacy = {
  pharmacy_id: number;
  // shipping: any[];
  items: CartProductItem[];
  subtotal: number;
  total: number;
};

export type CartData = {
  pharmacies: CartPharmacy[];
};

export type pagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

// -------------
export type SearchParams = { [key: string]: string | string[] | undefined };
