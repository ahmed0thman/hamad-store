import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Briefcase, Users, ShoppingCart, Globe } from "lucide-react";
import { aboutSEO } from "@/lib/seo";
import { getAboutPage } from "@/lib/api/apiSiteInfo";

export const metadata = aboutSEO;

const About = async () => {
  const aboutData = await getAboutPage();
  const stats = [
    {
      label: "إجمالي المبيعات السنوية",
      value: aboutData.success
        ? aboutData.data?.annual_sales?.toString() || "15+"
        : "15+",
      color: "text-teal-600",
      icon: <Briefcase className="w-8 h-8 text-teal-600" />,
    },
    {
      label: "البائعون النشطون على موقعنا",
      value: aboutData.success
        ? aboutData.data?.active_vendors?.toString() || "700+"
        : "700+",
      color: "text-teal-600",
      icon: <Users className="w-8 h-8 text-teal-600" />,
    },
    {
      label: "مبيعات المنتجات الشهرية",
      value: aboutData.success
        ? aboutData.data?.monthly_sales?.toString() || "5000+"
        : "5000+",
      color: "text-teal-600",
      icon: <ShoppingCart className="w-8 h-8 text-teal-600" />,
    },
    {
      label: "الزائرون النشطون على موقعنا",
      value: aboutData.success
        ? aboutData.data?.active_customers?.toString() || "3000+"
        : "3000+",
      color: "text-teal-600",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
    },
  ];
  return (
    <div className="wrapper mt-8 space-y-16">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-muted/20 p-6 shadow-primary/10 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow border-0"
          >
            <div className="mb-4 rounded-full bg-teal-100 p-3">{stat.icon}</div>
            <CardContent className="p-0">
              <h3 className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4 text-right">
          <h2 className="text-3xl font-bold text-teal-700">من نحن</h2>
          {aboutData.data?.text ? (
            <div
              dangerouslySetInnerHTML={{ __html: aboutData.data.text }}
            ></div>
          ) : (
            <>
              <p className="text-muted-foreground leading-loose text-lg">
                نعتني بصحتك... لأنك تستحق الأفضل
                <br />
                نحرص على تقديم خدمات دوائية وصحية موثوقة، مدعومة بخبرة فريقنا من
                الصيادلة المؤهلين الذين يعملون بكل تفاني لتوفير الرعاية التي
                تستحقها.
              </p>
              <ul className="list-disc pr-5 space-y-2 text-muted-foreground text-base">
                <li>صرف الأدوية بوصفة طبية وبدون وصفة</li>
                <li>استشارات صيدلانية مجانية</li>
                <li>قياس الضغط والسكر</li>
                <li>توفير مستلزمات الأطفال والعناية الشخصية</li>
                <li>عروض خاصة على الفيتامينات والمكملات الغذائية</li>
              </ul>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Image
            src={aboutData.data?.image || "/images/about-us-illustration.png"}
            alt="medicine illustration"
            width={320}
            height={320}
            className="rounded-xl object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
