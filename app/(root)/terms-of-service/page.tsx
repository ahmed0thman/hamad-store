import { getPTermsAndConditions } from "@/lib/api/apiSiteInfo";
import getLocaleStrings from "@/localization";
import { Metadata } from "next";
import { legalSEO } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleStrings();
  // Use enhanced SEO from lib/seo.ts, fallback to locale if needed
  return {
    ...legalSEO.terms,
    title: locale.termsOfService || legalSEO.terms.title,
  };
}

export default async function TermsOfServicePage() {
  const locale = await getLocaleStrings();
  const termsData = await getPTermsAndConditions();
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{locale.termsOfService}</h1>
      {termsData.success && termsData.data ? (
        <div
          className="prose prose-lg dark:prose-invert max-w-none [&_*]:!bg-transparent [&_*]:!text-foreground"
          dangerouslySetInnerHTML={{ __html: termsData.data.content }}
        />
      ) : (
        <p className="text-muted-foreground">
          {termsData.message || locale.failedToLoadTermsOfService}
        </p>
      )}
    </div>
  );
}
