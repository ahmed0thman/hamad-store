import { getSiteFeatures } from "@/lib/api/apiSiteInfo";
import { siteFeatureT } from "@/types";
import { CheckCircle2 } from "lucide-react";
import React from "react";
const features: siteFeatureT[] = [
  {
    id: 1,
    title: "دعم العملاء طوال أيام الأسبوع",
    sub_title: "الوصول الفوري إلى الدعم",
  },
  {
    id: 2,
    title: "شحن مجاني",
    sub_title: "شحن مجاني على جميع طلباتك",
  },
  {
    id: 3,
    title: "دفع آمن 100%",
    sub_title: "نحن نضمن أن أموالك في أمان",
  },
  {
    id: 4,
    title: "ضمان استرداد الأموال",
    sub_title: "ضمان استرداد الأموال لمدة 30 يومًا",
  },
];

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="feature-card">
      <div className="text-primary">
        <CheckCircle2 />
      </div>
      <div className="flex flex-col">
        <p className="feature-title">{title}</p>
        <p className="feature-subtitle">{description}</p>
      </div>
    </div>
  );
};

const FeatureCards = async () => {
  const siteFeaturesResponse = await getSiteFeatures();
  let stieFeatures = features;
  if (siteFeaturesResponse.success && siteFeaturesResponse.data) {
    stieFeatures = siteFeaturesResponse.data;
  }
  return (
    <section>
      <div className="wrapper">
        <div className="bg-background dark:!bg-slate-800 dark:shadow-slate-600/30 !shadow-lg p-8 !rounded-md translate-y-[-20%] sm:translate-y-[-50%] grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stieFeatures.map(({ title, sub_title }, index) => (
            <FeatureCard
              key={index}
              title={title || ""}
              description={sub_title || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
