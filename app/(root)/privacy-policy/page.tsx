import getLocaleStrings from "@/localization";
import { getPrivacyPolicy } from "@/lib/api/apiSiteInfo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleStrings();
  return {
    title: locale.privacyPolicy,
    description: locale.privacyPolicyDescription,
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocaleStrings();
  const privacyData = await getPrivacyPolicy();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{locale.privacyPolicy}</h1>

      {privacyData.success && privacyData.data ? (
        <div
          className="prose prose-lg dark:prose-invert max-w-none [&_*]:!bg-transparent [&_*]:!text-foreground"
          dangerouslySetInnerHTML={{ __html: privacyData.data.content }}
        />
      ) : (
        <p className="text-muted-foreground">
          {privacyData.message || locale.failedToLoadPrivacyPolicy}
        </p>
      )}
    </div>
  );
}
