import { getPTermsAndConditions } from "@/lib/api/apiSiteInfo";
import getLocaleStrings from "@/localization";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleStrings();
  return {
    title: locale.termsOfService,
    description: locale.termsOfServiceDescription,
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
