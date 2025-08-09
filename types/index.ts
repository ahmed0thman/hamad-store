import {
  cardSchema,
  cartItemSchema,
  insertCartSchema,
  profileSchema,
  registerSchema,
  signInSchema,
  userAddressSchema,
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
export type UserAddress = z.infer<typeof userAddressSchema> & {
  id?: string;
  user_id?: string;
};

// -------------------

export type CardFormData = z.infer<typeof cardSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingMethod = {
  id: number;
  value: string;
  type: string;
  pharmacy_id: number;
  duration: number;
};
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

export type ProductItemCompare = {
  id: number;
  name: string;
  pharmacy: Pharmacy;
  generic_name: string;
  type: string;
  form: string;
  brand_id: number;
  category_id: number;
  strength: string;
  price: number;
  quantity: number;
  image: string | null;
  average_rating: {
    user: number;
    count_user_rate: number;
    pharmacist: number;
    count_pharmacist_rate: number;
  };
  tax_rate: string;
  production_date: string;
  expiry_date: string;
  pack_size: string | null;
  description: string;
  show_home: number;
  categoryName: string;
  brandName: string;
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

export type addRate = {
  rate: number;
  rate_text: string;
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
  total: number;
  coupon_discount: number;
  total_after_coupon: number;
  coupon_id: string | null;
  coupon_code: string | null;
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

// orders
export type orderSaveParams = {
  pharmacy_id: number;
  shipping_id: number;
  shipping_address: number;
};

export type OrderItem = {
  id: number;
  pharmacy_id: number;
  order_number: string;
  pharmacy_name: string;
  status: string;
  total: string;
  is_paid: boolean;
};
export type OrderDetailsItem = {
  id: number;
  product_id: number;
  product_name: string;
  unit_price: string;
  discount: string;
  tax_rate: string;
  tax_amount: string;
  subtotal: string;
  quantity: number;
  total: string;
};

export type OrderDetails = {
  id: number;
  order_number: string;
  pharmacy_id: number;
  pharmacy_name: string;
  status: string;
  subtotal: string;
  coupon_discount: string;
  total: string;
  shipping_address: string;
  shipping_cost: string;
  total_after_shipping: string;
  paid_from_points: string;
  paid_by_card: string;
  is_paid: boolean;
  earned_points: number;
  payment_type: string;
  due_date: string | null;
  paid_amount: string;
  remaining_amount: string;
  items: OrderDetailsItem[];
};

// -------------
export type SearchParams = { [key: string]: string | string[] | undefined };
