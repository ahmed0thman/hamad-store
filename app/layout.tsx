import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import BfcacheHandler from "@/components/shared/BfcacheHandler";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const SITE_URL = process.env.NEXTAUTH_URL || "https://valideria.com";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME} - Valideria - فاليديريا - Multi-Vendor Medical & Cosmetics Store`,
    default: `${APP_NAME} - Valideria - فاليديريا | Multi-Vendor Medical & Cosmetics Store - منصة متعددة البائعين للمنتجات الطبية ومستحضرات التجميل في الشرق الأوسط`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SITE_URL),

  // Keywords for SEO
  keywords: [
    // Brand names and variations
    "Valideria",
    "valideria",
    "VALIDERIA",
    "فاليديريا",
    "فاليدريا",
    "فاليديريا العراق",
    "valideria iraq",
    "valideria middle east",
    // Arabic medical & cosmetics keywords
    "مستلزمات طبية",
    "مستحضرات تجميل",
    "صيدلية إلكترونية",
    "أدوية أونلاين",
    "منتجات طبية",
    "منتجات صحية",
    "متجر متعدد البائعين",
    "منصة طبية",
    "توصيل أدوية",
    "عقاقير طبية",
    "مكملات غذائية",
    "العناية بالبشرة",
    "العناية الشخصية",
    "منتجات تجميل",
    "عطور",
    "مكياج",
    "فيتامينات",
    "معدات طبية",
    "صحة وجمال",
    "بائعين موثوقين",
    "منتجات أصلية",
    "توصيل سريع",
    "الشرق الأوسط",
    "العراق",
    "دواء",
    "علاج",
    "صحة",
    "تجميل",
    // English medical & cosmetics keywords
    "multi-vendor medical store",
    "online pharmacy",
    "medical supplies",
    "cosmetics online",
    "beauty products",
    "healthcare products",
    "medicines delivery",
    "medical equipment",
    "health and beauty",
    "skincare products",
    "makeup",
    "perfumes",
    "vitamins and supplements",
    "personal care",
    "trusted vendors",
    "authentic products",
    "fast delivery",
    "middle east",
    "iraq",
    "prescription drugs",
    "OTC products",
    "wellness products",
    "baby care",
    "fitness supplements",
    "dental care",
    "medical devices",
    "home healthcare",
  ],

  // Authors
  authors: [
    { name: "Valideria Team" },
    { name: "Healthcare & Medical Specialists" },
  ],

  // Creator
  creator: "Valideria",
  publisher: "Valideria Medical & Healthcare Platform",

  // Robots
  robots: {
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

  // Open Graph
  openGraph: {
    type: "website",
    siteName: `${APP_NAME} - Valideria - فاليديريا`,
    title: `${APP_NAME} - Valideria - فاليديريا | Multi-Vendor Medical & Cosmetics Store - منصة متعددة البائعين للمنتجات الطبية ومستحضرات التجميل`,
    description: APP_DESCRIPTION,
    url: SITE_URL,
    locale: "ar_EG",
    alternateLocale: ["en_US", "ar_SA", "ar_IQ"],
    images: [
      {
        url: `${SITE_URL}/images/logos/valideria-og.jpg`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Medical & Healthcare Products Platform`,
        type: "image/jpeg",
      },
      {
        url: `${SITE_URL}/images/logos/valideria-square.jpg`,
        width: 800,
        height: 800,
        alt: `${APP_NAME} Logo`,
        type: "image/jpeg",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@valideria",
    creator: "@valideria",
    title: `${APP_NAME} - Valideria - فاليديريا | Multi-Vendor Medical & Cosmetics Store`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/logos/valideria-twitter.jpg`,
        alt: `${APP_NAME} - Medical & Healthcare Products`,
      },
    ],
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },

  // Additional metadata
  category: "Health, Medical & Beauty",
  classification: "Multi-Vendor Medical & Cosmetics Marketplace",

  // Manifest
  manifest: "/manifest.json",

  // Icons - Use multiple sizes for better quality across devices
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // Other
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-EG": `${SITE_URL}`,
      "en-US": `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://backend.valideria.com" />
        <link rel="dns-prefetch" href="https://backend.valideria.com" />
        {/* Google Search Console Verification - Replace with your actual verification code */}
        <meta
          name="google-site-verification"
          content="_uBwP6UTqJYlMvIaNJTN0aLS6nvr8OThrmNZpXYj1bg"
        />
      </head>
      <body className={` ${poppins.className} ${cairo.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <BfcacheHandler />
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
