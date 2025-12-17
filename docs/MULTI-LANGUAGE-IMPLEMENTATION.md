# Multi-Language Implementation Guide

## Overview

The application now supports full multi-language functionality with Arabic (AR) and English (EN) translations. The system includes proper RTL/LTR support and seamless language switching.

## Architecture

### 1. Translation Files

Located in `/localization/`:

- `en.ts` - English translations (type definition source)
- `ar.ts` - Arabic translations (must match English keys)
- `index.ts` - Server-side translation getter

### 2. Language Context

**Location**: `/contexts/LanguageContext.tsx`

Provides global language state management:

```tsx
const { language, locale, setLanguage, t, isRTL } = useLanguage();
```

### 3. Translation Hook

**Location**: `/hooks/useTranslation.ts`

Alternative hook for components that don't need full context:

```tsx
const { t, language, isRTL, mounted } = useTranslation();
```

## Usage

### For Client Components

#### Using LanguageContext (Recommended):

```tsx
"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MyComponent() {
  const { t, language, isRTL } = useLanguage();

  return (
    <div>
      <h1>{t("accountDetails")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
```

#### Using useTranslation Hook:

```tsx
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export default function MyComponent() {
  const { t } = useTranslation();

  return <button>{t("save")}</button>;
}
```

### For Server Components

```tsx
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
```

## Adding New Translations

### Step 1: Add to English file

```typescript
// localization/en.ts
const en = {
  // ... existing translations
  myNewKey: "My New Text",
  anotherKey: "Another Text",
};
```

### Step 2: Add to Arabic file

```typescript
// localization/ar.ts
const ar: Locale = {
  // ... existing translations
  myNewKey: "النص الجديد",
  anotherKey: "نص آخر",
};
```

### Step 3: Use in components

```tsx
const { t } = useTranslation();
return <p>{t("myNewKey")}</p>;
```

## Available Translation Keys

### General

- `welcome`, `cart`, `viewCart`, `total`, `elements`, `offers`

### Navigation

- `home`, `about`, `contactUs`, `products`, `categories`, `brands`

### Account

- `personalInfo`, `addresses`, `returns`, `wallet`, `compareProducts`, `favorites`, `orders`, `notifications`, `reports`, `logout`

### Profile

- `firstName`, `lastName`, `phone`, `email`, `age`, `gender`, `address`, `specialization`, `licenseNumber`, `bio`, `certificate`, `promoCode`, `accountDetails`, `professionalInfo`, `save`, `saveChanges`, `cancel`

### Orders

- `orderNumber`, `orderStatus`, `orderDate`, `orderTotal`, `viewDetails`, `requestReturn`

### Products

- `productName`, `price`, `quantity`, `addToCart`, `buyNow`, `outOfStock`, `inStock`, `brand`, `category`, `description`, `reviews`, `specifications`

### Cart & Checkout

- `cartEmpty`, `continueShopping`, `checkout`, `subtotal`, `shipping`, `tax`, `discount`

### Payment

- `paymentMethod`, `card`, `cashOnDelivery`, `payLater`

### Forms

- `submit`, `clear`, `search`, `filter`, `apply`, `reset`

### Messages

- `success`, `error`, `loading`, `noData`, `confirmDelete`

### Common Actions

- `edit`, `delete`, `view`, `download`, `upload`, `close`, `back`, `next`, `previous`

### Reports

- `comments`, `reviewsReport`, `commentsReport`, `promocodes`

### Misc

- `showMore`, `showLess`, `browseAll`

## Language Switching

The language button component automatically:

1. Reads user preference from profile or localStorage
2. Updates the LanguageContext
3. Changes document direction (RTL/LTR)
4. Persists to localStorage
5. Updates user profile if authenticated
6. Reloads page to update server components

## RTL Support

The system automatically handles RTL:

- Document `dir` attribute set to `rtl` for Arabic
- All components respect text direction
- No manual RTL handling needed in most cases

## Best Practices

### 1. Always use translation keys

❌ **Bad:**

```tsx
<button>Save</button>
```

✅ **Good:**

```tsx
<button>{t("save")}</button>
```

### 2. Keep keys semantic

Use descriptive keys that indicate purpose:

```typescript
accountDetails: "Account Details"; // Good
text1: "Account Details"; // Bad
```

### 3. Group related translations

Organize translations logically in the file:

```typescript
// Profile section
firstName: "First Name",
lastName: "Last Name",
// Order section
orderNumber: "Order Number",
orderStatus: "Order Status",
```

### 4. Avoid hydration mismatches

Always check `mounted` state in client components:

```tsx
const { t, mounted } = useTranslation();
if (!mounted) return null;
return <div>{t("key")}</div>;
```

### 5. Use TypeScript for safety

TypeScript ensures you only use valid translation keys:

```tsx
t("accountDetails"); // ✅ Valid
t("invalidKey"); // ❌ TypeScript error
```

## Migration Guide

To migrate existing hard-coded text:

1. **Identify hard-coded text**

   ```tsx
   // Before
   <h1>Account Details</h1>
   ```

2. **Find or create translation key**

   ```typescript
   accountDetails: "Account Details";
   ```

3. **Import translation hook**

   ```tsx
   import { useTranslation } from "@/hooks/useTranslation";
   ```

4. **Replace hard-coded text**
   ```tsx
   // After
   const { t } = useTranslation();
   <h1>{t("accountDetails")}</h1>;
   ```

## Examples

### Complete Component Example

```tsx
"use client";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

export default function ProfileHeader() {
  const { t, language, isRTL } = useTranslation();

  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <h1>{t("accountDetails")}</h1>
      <p>
        {t("language")}: {language === "ar" ? "العربية" : "English"}
      </p>
      <div className="flex gap-2">
        <Button>{t("save")}</Button>
        <Button variant="outline">{t("cancel")}</Button>
      </div>
    </div>
  );
}
```

### Server Component Example

```tsx
import getLocaleStrings from "@/localization";
import { Button } from "@/components/ui/button";

export default async function WelcomePage() {
  const locale = await getLocaleStrings();

  return (
    <div>
      <h1>{locale.welcome}</h1>
      <p>{locale.offers}</p>
    </div>
  );
}
```

## Troubleshooting

### Translations not updating

- Clear browser cache and reload
- Check localStorage for `Lan` key
- Verify user profile has correct language

### Hydration mismatch errors

- Use `mounted` state check in client components
- Ensure server and client render same initial content

### Missing translation keys

- TypeScript will show errors for invalid keys
- Add missing keys to both `en.ts` and `ar.ts`

## Testing

To test language switching:

1. Click language button in header
2. Verify all text updates to selected language
3. Refresh page - language should persist
4. Check RTL/LTR direction changes correctly

## Future Enhancements

Potential improvements:

- Add more languages (FR, ES, etc.)
- Implement language-specific formatting (dates, numbers)
- Add translation management UI
- Implement lazy loading for large translation files
