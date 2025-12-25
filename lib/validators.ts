import z, { boolean, optional } from "zod";
import { formatCurrencyEGP } from "./utils";
import { getValidatorTranslations } from "./getValidatorTranslations";

const t = () => getValidatorTranslations();

export const currency = z.string().refine(
  (val) => {
    try {
      return formatCurrencyEGP(Number(val)) === val;
    } catch {
      return false;
    }
  },
  { message: t().invalidCurrencyFormat }
);

export const gender = z.string().refine(
  (val) => {
    return val === "male" || val === "female";
  },
  {
    message: t().genderMustBeMaleOrFemale,
  }
);

// Global reusable phone number schema
export const phoneNumberSchema = z
  .string()
  .min(5, t().phoneNumberMin)
  .max(20, t().phoneNumberMax)
  .regex(/^[\d+\-_() .]+$/, t().invalidPhoneNumber)
  .refine((val) => /\d/.test(val), t().phoneNumberMustHaveDigit);

export const cartItemSchema = z.object({
  productId: z.string().min(1, t().productIdRequired),
  name: z.string().min(1, t().productNameRequired),
  slug: z.string().min(1, t().productSlugRequired),
  quantity: z.number().int().min(1, t().quantityMin),
  image: z.string().url(t().imageMustBeUrl),
  unitPrice: currency,
  totalPrice: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema).min(1, t().cartMinItems),
  total: currency,
  totalItems: z.number().int().min(1, t().totalItemsMin),
  totalPrice: currency,
  totalPriceWithDiscount: currency.optional(),
  discount: z.number().int().min(0, t().discountMin).optional(),
  userId: z.string().optional().nullable(),
  sessionCartId: z.string().min(1, t().sessionCartIdRequired),
});

export const cardSchema = z.object({
  name: z.string().min(1, t().nameRequired),
  number: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, t().cardNumberInvalid),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t().expiryInvalid),
  cvv: z.string().regex(/^\d{3,4}$/, t().cvvInvalid),
  setDefault: z.boolean().optional(),
});

// Authentication types

export const registerSchema = z
  .object({
    first_name: z.string().min(1, t().firstNameRequired),
    last_name: z.string().min(1, t().lastNameRequired),
    state: z.string().min(1, t().addressRequired),
    gender: gender,
    age: z.string().regex(/^\d+$/, t().ageRequired),
    phone: phoneNumberSchema,
    email: z.string().email(t().emailRequired),
    password: z.string().min(8, t().passwordMin),
    password_confirmation: z.string().min(8, t().passwordConfirmationMin),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: t().passwordsMustMatch,
    path: ["password_confirmation"],
  });

// Doctor Rigister schema
export const doctorRegisterSchema = registerSchema.safeExtend({
  license_number: z.string().min(1, t().licenseNumberRequired),
  certificate_file: z.string().refine(
    (val) => {
      // Accept URLs ending with allowed extensions
      return (
        typeof val === "string" &&
        /\.(pdf|doc|docx|jpg|jpeg|png|svg)$/i.test(val)
      );
    },
    {
      message: t().certificateFileInvalid,
    }
  ),
  specialization_id: z.string().min(1, t().specializationRequired),
  is_doctor: z.number().min(0).max(1).default(1).optional(),
});

// Create the signin schema
export const signInSchema = z.object({
  email: z.string().email(t().emailRequired),
  password: z.string().min(8, t().passwordMin),
});

export const profileSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(2, t().firstNameMin),
  last_name: z.string().optional(),
  phone: phoneNumberSchema,
  language: z.string().optional(),
  gender: gender,
  state: z.string().min(1, t().addressRequired),
  age: z.number().int().min(0, t().ageMin),
  email: z.string().email(t().emailRequired),
  profile_image: z.string().url(t().profileImageUrl).optional(),
  is_doctor: boolean().optional(),
  currency_code: z.string().optional(),
  Professional_info: z
    .object({
      bio: z.string().optional(),
      specialization: z.string().optional(),
      license_number: z.string().optional(),
      certificate_file: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val?.trim()) return true;
            // Accept URLs ending with allowed extensions
            return (
              typeof val === "string" &&
              /\.(pdf|doc|docx|jpg|jpeg|png|svg)$/i.test(val)
            );
          },
          {
            message: t().certificateFileInvalid,
          }
        )
        .optional(),
      promo_code: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

export const userAddressSchema = z.object({
  name: z.string().min(1, t().addressNameRequired),
  phone: phoneNumberSchema,
  building: z.string().min(1, t().buildingRequired),
  area: z.string().min(1, t().areaRequired),
  city: z.string().min(1, t().cityRequired),
  is_default: z.number().int().min(0).max(1).optional(),
});

// Plan Subscription schema
export const planSubscriptionFormSchema = z
  .object({
    plan_id: z.number().int().min(1, t().planIdRequired),
    name: z.string().min(1, t().nameRequired),
    email: z.string().email(t().emailRequired),
    phone: phoneNumberSchema,
    password: z.string().min(8, t().passwordMin),
    password_confirmation: z
      .string()
      .min(8, t().passwordConfirmationMin)
      .optional(),
    pharmacy_name_ar: z.string().min(1, t().pharmacyNameArRequired),
    pharmacy_name_en: z.string().min(1, t().pharmacyNameEnRequired),
    pharmacy_address_ar: z.string().min(1, t().pharmacyAddressArRequired),
    pharmacy_address_en: z.string().min(1, t().pharmacyAddressEnRequired),
    pharmacy_phone: phoneNumberSchema,
    pharmacy_email: z.string().email(t().pharmacyEmailInvalid),
    payment_method: z
      .enum(["card", "cash", "wallet"])
      .refine((val) => ["card", "cash", "wallet"].includes(val), {
        message: t().paymentMethodInvalid,
      }),
  })
  .refine(
    (data) =>
      !data.password_confirmation ||
      data.password === data.password_confirmation,
    {
      message: t().passwordsMustMatch,
      path: ["password_confirmation"],
    }
  );

export const updateUserPasswordSchema = z
  .object({
    current_password: z.string().min(8, t().currentPasswordRequired),
    password: z.string().min(8, t().newPasswordMin),
    password_confirmation: z.string().min(8, t().newPasswordConfirmationMin),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: t().newPasswordsMustMatch,
    path: ["new_password_confirmation"],
  });

export const contactMessageSchema = z.object({
  name: z.string().min(1, t().nameRequired),
  phone: phoneNumberSchema,
  email: z.string().email(t().emailRequired),
  message: z.string().min(1, t().messageRequired),
});
