import { Metadata } from "next";
import { APP_NAME } from "./constants";

const SITE_URL = process.env.NEXTAUTH_URL || "https://valideria.com";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  path = "",
  type = "website",
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${APP_NAME} - منصة التسوق الصحي المتعددة`;
  const url = `${SITE_URL}${path}`;
  // Use provided image or fallback to og-image.jpg
  const fullImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/og-image.jpg`;

  // Base keywords for all pages
  const baseKeywords = [
    "متجر إلكتروني",
    "تسوق صحي",
    "valideria",
    "صحة",
    "منتجات صحية",
    "متعدد البائعين",
    "صيدليات متعددة",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...baseKeywords, ...keywords],

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    openGraph: {
      type,
      siteName: APP_NAME,
      title: fullTitle,
      description,
      url,
      locale: "ar_EG",
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@valideria",
      creator: "@valideria",
      title: fullTitle,
      description,
      images: [fullImage],
    },

    alternates: {
      canonical: url,
    },
  };
}

// Pre-configured SEO for common pages
export const homeSEO = generateSEO({
  title: "الصفحة الرئيسية - تسوق منتجات طبية وصحية من صيدليات متعددة",
  description:
    "فاليديريا - منصة التسوق الطبي والصحي الرائدة في الشرق الأوسط. تسوق من صيدليات وموردين متعددين في مكان واحد. اكتشف أفضل الأدوية، المكملات الغذائية، مستحضرات التجميل، والمنتجات الصحية. قارن الأسعار، احصل على أفضل العروض، وتمتع بتوصيل سريع وآمن إلى باب منزلك.",
  keywords: [
    "متجر متعدد البائعين",
    "صيدليات متعددة",
    "مقارنة أسعار",
    "مكملات غذائية",
    "مستحضرات تجميل",
    "منتجات صحية",
    "فيتامينات",
    "أدوية أونلاين",
    "صيدلية إلكترونية",
  ],
});

export const productsSEO = generateSEO({
  title: "جميع المنتجات - تصفح آلاف المنتجات الطبية والصحية",
  description:
    "تصفح أكثر من 10,000 منتج طبي وصحي من صيدليات وموردين موثوقين متعددين في فاليديريا. أدوية، مستحضرات تجميل، مكملات غذائية، فيتامينات، معدات طبية وأكثر. قارن الأسعار بين البائعين، فلتر حسب الفئة والعلامة التجارية، واختر الأفضل لاحتياجاتك الصحية.",
  keywords: [
    "كتالوج المنتجات",
    "منتجات صحية",
    "مقارنة أسعار البائعين",
    "صيدليات متعددة",
    "موردين موثوقين",
    "شراء أدوية أونلاين",
    "منتجات طبية",
  ],
});

export const aboutSEO = generateSEO({
  title: "من نحن - فاليديريا منصة التسوق الطبي الموثوقة",
  description:
    "فاليديريا هي منصة التسوق الطبي والصحي المتعددة البائعين الرائدة في الشرق الأوسط والعراق. نربط المستهلكين بأفضل الصيدليات والموردين الموثوقين في مكان واحد. منذ تأسيسنا، نقدم تجربة تسوق آمنة وموثوقة مع آلاف المنتجات الأصلية، مقارنة أسعار شفافة، وتوصيل سريع. مهمتنا جعل المنتجات الطبية والصحية متاحة للجميع بأفضل الأسعار.",
  keywords: [
    "عن فاليديريا",
    "منصة متعددة البائعين",
    "سوق إلكتروني",
    "صيدليات متعددة",
    "الشرق الأوسط",
    "العراق",
  ],
});

export const contactSEO = generateSEO({
  title: "اتصل بنا - خدمة عملاء فاليديريا على مدار الساعة",
  description:
    "تواصل مع فريق خدمة العملاء المحترف في فاليديريا. نحن متاحون على مدار الساعة لمساعدتك في جميع استفساراتك حول الطلبات، شحن المنتجات، استفسارات الدفع، اختيار المنتجات الصحية المناسبة، والتواصل مع البائعين. اتصل بنا عبر الهاتف، البريد الإلكتروني، أو الدردشة المباشرة للحصول على دعم فوري.",
  keywords: [
    "خدمة العملاء",
    "دعم فني",
    "مساعدة التسوق",
    "تواصل معنا",
    "دعم فاليديريا",
    "استفسارات",
  ],
});

// Dynamic product SEO generator
export function generateProductSEO(product: {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  image?: string;
  id: number;
}) {
  return generateSEO({
    title: product.name,
    description: `${product.description} - متوفر من موردين متعددين في فاليديريا. قارن الأسعار واختر الأفضل. توصيل سريع وآمن.`,
    keywords: [
      product.name,
      product.category,
      product.brand,
      "شراء أونلاين",
      "مقارنة أسعار",
      `${product.category} منتجات`,
      "فاليديريا",
      "متجر متعدد البائعين",
      `${product.name} سعر`,
      `${product.brand} منتجات`,
    ],
    image: product.image,
    path: `/product/${product.id}`,
    type: "website",
  });
}

// Product URL generator for consistent URL structure
export function getProductUrl(productId: number, productName?: string): string {
  const baseUrl = `/product/${productId}`;
  if (productName) {
    // Create SEO-friendly slug from product name
    const slug = productName
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "") // Keep Arabic, English, numbers, spaces, hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
    return slug ? `${baseUrl}/${slug}` : baseUrl;
  }
  return baseUrl;
}

// Generate canonical URL for products
export function getProductCanonicalUrl(
  productId: number,
  productName?: string
): string {
  const siteUrl = process.env.NEXTAUTH_URL || "https://valideria.com";
  return `${siteUrl}${getProductUrl(productId, productName)}`;
}

// Dynamic category SEO generator
export function generateCategorySEO(category: {
  name: string;
  description?: string;
  productCount?: number;
}) {
  return generateSEO({
    title: category.name,
    description:
      category.description ||
      `تسوق من مجموعة ${
        category.name
      } الواسعة من صيدليات وموردين متعددين في فاليديريا. ${
        category.productCount
          ? `أكثر من ${category.productCount} منتج متاح`
          : ""
      } مع مقارنة الأسعار وتوصيل سريع.`,
    keywords: [
      category.name,
      `منتجات ${category.name}`,
      `${category.name} أسعار`,
      "تسوق أونلاين",
      "مقارنة بائعين",
    ],
    path: `/products?category=${category.name}`,
  });
}

// Account pages SEO (no-index for privacy)
export const accountSEO = {
  profile: generateSEO({
    title: "الملف الشخصي",
    description: "إدارة معلوماتك الشخصية وتفضيلاتك في فاليديريا.",
    path: "/account/profile",
    noIndex: true,
  }),

  orders: generateSEO({
    title: "طلباتي",
    description: "تتبع طلباتك وتاريخ المشتريات في فاليديريا.",
    path: "/account/orders",
    noIndex: true,
  }),

  addresses: generateSEO({
    title: "عناويني",
    description: "إدارة عناوين التوصيل المحفوظة في حسابك.",
    path: "/account/addresses",
    noIndex: true,
  }),

  favorites: generateSEO({
    title: "المفضلة",
    description: "قائمة المنتجات والصيدليات المفضلة لديك في فاليديريا.",
    path: "/favorites",
    noIndex: true,
  }),

  cart: generateSEO({
    title: "سلة التسوق",
    description:
      "راجع المنتجات في سلة التسوق، قارن الأسعار من صيدليات مختلفة، وأكمل عملية الشراء بأمان.",
    path: "/cart",
    noIndex: true,
  }),

  wallet: generateSEO({
    title: "محفظتي",
    description:
      "إدارة رصيد محفظتك، معاملاتك المالية، ونقاط المكافآت في فاليديريا.",
    path: "/account/wallet",
    noIndex: true,
  }),
};

// Authentication pages SEO
export const authSEO = {
  signin: generateSEO({
    title: "تسجيل الدخول - ادخل إلى حسابك في فاليديريا",
    description:
      "سجل دخولك إلى حسابك في فاليديريا للوصول إلى طلباتك، سلة التسوق، المنتجات المفضلة، وعروضك الخاصة. تسوق من صيدليات متعددة موثوقة واستمتع بتجربة تسوق شخصية وآمنة.",
    keywords: ["تسجيل دخول", "حساب فاليديريا", "دخول الصيدلية", "login"],
    path: "/signin",
    noIndex: true,
  }),

  register: generateSEO({
    title: "إنشاء حساب جديد - انضم إلى فاليديريا اليوم",
    description:
      "أنشئ حساب مجاني في فاليديريا واستمتع بمقارنة الأسعار من صيدليات متعددة، عروض حصرية، توصيل سريع، وحفظ منتجاتك المفضلة. انضم لآلاف العملاء الراضين وابدأ تسوقك الصحي الآن.",
    keywords: [
      "إنشاء حساب",
      "تسجيل جديد",
      "حساب فاليديريا",
      "عضوية مجانية",
      "register",
      "signup",
    ],
    path: "/register",
    noIndex: true,
  }),

  forgetPassword: generateSEO({
    title: "نسيت كلمة المرور - استعادة الوصول إلى حسابك",
    description:
      "هل نسيت كلمة المرور؟ استعد الوصول إلى حسابك في فاليديريا بسهولة. أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور بسرعة وأمان. نحن هنا لمساعدتك في استعادة حسابك ومتابعة تسوقك الصحي.",
    keywords: [
      "نسيت كلمة المرور",
      "استعادة الحساب",
      "إعادة تعيين كلمة المرور",
      "forget password",
      "reset password",
    ],
    path: "/forgetPassword",
    noIndex: true,
  }),
};

// Plans/Subscription pages SEO
export const plansSEO = generateSEO({
  title: "الباقات والاشتراكات - اختر خطتك المناسبة",
  description:
    "اكتشف باقات واشتراكات فاليديريا المميزة. احصل على خصومات إضافية، توصيل مجاني، أولوية في الطلبات، ومزايا حصرية. خطط مرنة تناسب احتياجاتك الصحية الشهرية مع إمكانية الإلغاء في أي وقت.",
  keywords: [
    "باقات فاليديريا",
    "اشتراكات",
    "خصومات حصرية",
    "عضوية مميزة",
    "توصيل مجاني",
    "plans",
    "subscription",
  ],
  path: "/plans",
});

// FAQ page SEO
export const faqSEO = generateSEO({
  title: "الأسئلة الشائعة - كل ما تحتاج معرفته عن فاليديريا",
  description:
    "إجابات شاملة على الأسئلة الأكثر شيوعًا حول التسوق في فاليديريا. تعرف على طرق الدفع، سياسات الشحن والإرجاع، كيفية مقارنة الأسعار بين البائعين، ضمان جودة المنتجات، أوقات التوصيل، وكيفية التواصل مع خدمة العملاء. دليلك الشامل للتسوق الآمن والموثوق.",
  keywords: [
    "أسئلة شائعة",
    "مساعدة",
    "دعم فاليديريا",
    "كيفية الطلب",
    "الشحن",
    "الإرجاع",
    "FAQ",
  ],
  path: "/faq",
});

// Privacy & Terms pages
export const legalSEO = {
  privacy: generateSEO({
    title: "سياسة الخصوصية - حماية بياناتك في فاليديريا",
    description:
      "اطلع على سياسة الخصوصية وحماية البيانات في فاليديريا. نحن ملتزمون بحماية معلوماتك الشخصية والطبية، استخدام البيانات بشفافية، وتوفير تجربة تسوق آمنة ومحمية بأعلى معايير الأمان.",
    keywords: [
      "سياسة الخصوصية",
      "حماية البيانات",
      "أمان المعلومات",
      "privacy policy",
    ],
    path: "/privacy-policy",
  }),

  terms: generateSEO({
    title: "شروط الخدمة - قواعد استخدام فاليديريا",
    description:
      "اقرأ شروط وأحكام استخدام منصة فاليديريا. تعرف على حقوقك وواجباتك كمستخدم، سياسات البائعين، ضمانات الجودة، إجراءات حل النزاعات، وقواعد الاستخدام العادل للمنصة.",
    keywords: [
      "شروط الخدمة",
      "أحكام الاستخدام",
      "قواعد المنصة",
      "terms of service",
    ],
    path: "/terms-of-service",
  }),
};

export default generateSEO;
