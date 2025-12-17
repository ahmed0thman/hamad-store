// Quick Reference: Translation Usage Patterns

// ============================================
// CLIENT COMPONENTS
// ============================================

// Pattern 1: Basic Translation
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export default function MyComponent() {
const { t } = useTranslation();
return <h1>{t("welcome")}</h1>;
}

// Pattern 2: With Language Detection
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export default function MyComponent() {
const { t, language, isRTL } = useTranslation();

return (
<div dir={isRTL ? "rtl" : "ltr"}>
<h1>{t("accountDetails")}</h1>
<p>Current: {language}</p>
</div>
);
}

// Pattern 3: Using Context (for multiple components)
"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MyComponent() {
const { t, language, setLanguage } = useLanguage();

return (
<div>
<h1>{t("welcome")}</h1>
<button onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
Switch Language
</button>
</div>
);
}

// ============================================
// SERVER COMPONENTS
// ============================================

// Pattern 1: Basic Server Translation
import getLocaleStrings from "@/localization";

export default async function ServerPage() {
const locale = await getLocaleStrings();

return (
<div>
<h1>{locale.welcome}</h1>
<p>{locale.offers}</p>
</div>
);
}

// Pattern 2: Passing to Client Components
import getLocaleStrings from "@/localization";
import ClientComponent from "./ClientComponent";

export default async function ServerPage() {
const locale = await getLocaleStrings();

return <ClientComponent initialTexts={locale} />;
}

// ============================================
// COMMON PATTERNS
// ============================================

// Button with Translation
const { t } = useTranslation();
<Button>{t("save")}</Button>
<Button variant="outline">{t("cancel")}</Button>

// Form Labels
<Label>{t("firstName")}</Label>
<Input placeholder={t("firstName")} />

// Navigation Links

<Link href="/">{t("home")}</Link>
<Link href="/about">{t("about")}</Link>
<Link href="/contact-us">{t("contactUs")}</Link>

// Conditional Text
{isLoading ? t("loading") : t("submit")}
{hasData ? t("viewDetails") : t("noData")}

// Dynamic Content

<h1>{t("welcome")}, {userName}</h1>
<p>{t("total")}: {formatPrice(total)}</p>

// ============================================
// ADDING NEW TRANSLATIONS
// ============================================

// Step 1: Add to en.ts
// localization/en.ts
const en = {
// ... existing
newFeature: "New Feature",
newButton: "Click Me",
};

// Step 2: Add to ar.ts
// localization/ar.ts
const ar: Locale = {
// ... existing
newFeature: "ميزة جديدة",
newButton: "اضغط هنا",
};

// Step 3: Use in component
const { t } = useTranslation();

<div>
  <h2>{t("newFeature")}</h2>
  <button>{t("newButton")}</button>
</div>

// ============================================
// AVAILABLE KEYS (Quick Reference)
// ============================================

// Account & Profile
t("accountDetails")
t("personalInfo")
t("firstName")
t("lastName")
t("email")
t("phone")
t("save")
t("cancel")

// Navigation
t("home")
t("about")
t("contactUs")
t("products")
t("cart")

// Orders & Products
t("orders")
t("orderNumber")
t("orderStatus")
t("productName")
t("price")
t("quantity")
t("addToCart")

// Actions
t("edit")
t("delete")
t("view")
t("submit")
t("search")
t("filter")
t("apply")
t("reset")

// Messages
t("success")
t("error")
t("loading")
t("noData")

// Misc
t("showMore")
t("showLess")
t("welcome")
t("total")
