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
  const fullImage = image
    ? `${SITE_URL}${image}`
    : `${SITE_URL}/images/logos/valideria-og.jpg`;

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
  title: "الصفحة الرئيسية",
  description:
    "تسوق من صيدليات متعددة في مكان واحد. اكتشف أفضل الأدوية والمنتجات الصحية من موردين موثوقين. توصيل سريع وآمن، أسعار منافسة، ومقارنة بين البائعين.",
  keywords: [
    "متجر متعدد البائعين",
    "صيدليات متعددة",
    "مقارنة أسعار",
    "مكملات غذائية",
    "مستحضرات تجميل",
    "منتجات صحية",
    "فيتامينات",
  ],
});

export const productsSEO = generateSEO({
  title: "جميع المنتجات",
  description:
    "تصفح مجموعة واسعة من الأدوية والمنتجات الصحية من صيدليات وموردين متعددين. قارن الأسعار، فلتر حسب الفئة والبائع، واختر الأفضل لك.",
  keywords: [
    "كتالوج المنتجات",
    "منتجات صحية",
    "مقارنة أسعار البائعين",
    "صيدليات متعددة",
    "موردين موثوقين",
  ],
});

export const aboutSEO = generateSEO({
  title: "من نحن",
  description:
    "تعرف على فاليديريا، منصة التسوق الصحي المتعددة البائعين الرائدة في الشرق الأوسط. نربط المستهلكين بأفضل الصيدليات والموردين في مكان واحد.",
  keywords: [
    "عن فاليديريا",
    "منصة متعددة البائعين",
    "سوق إلكتروني",
    "صيدليات متعددة",
  ],
});

export const contactSEO = generateSEO({
  title: "اتصل بنا",
  description:
    "تواصل مع فريق خدمة العملاء في فاليديريا. نحن هنا لمساعدتك في جميع استفساراتك حول الطلبات، المنتجات، والبائعين.",
  keywords: ["خدمة العملاء", "دعم فني", "مساعدة التسوق", "تواصل معنا"],
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
};

export default generateSEO;
