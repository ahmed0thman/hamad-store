import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqSEO } from "@/lib/seo";
import { getFaqs } from "@/lib/api/apiSiteInfo";
import { faqT } from "@/types";
import getLocaleStrings from "@/localization";
import Link from "next/link";

export const metadata = faqSEO;

export default async function FAQPage() {
  const fqaqResponse = await getFaqs();
  const locale = await getLocaleStrings();
  const faqs = fqaqResponse.data as faqT[];
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{locale.faqTitle}</h1>
      <p className="text-foreground mb-8">{locale.faqDescription}</p>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs && faqs.length > 0 ? (
          faqs.map((faq, idx) => (
            <AccordionItem
              key={`item-${idx}`}
              value={`item-${idx}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-gray-500">{locale.noFaqsForNow}</div>
        )}
      </Accordion>

      <div className="mt-12 p-6 bg-accent rounded-lg">
        <h3 className="text-xl font-semibold mb-3">{locale.didntFindAnswer}</h3>
        <p className="text-foreground mb-4">{locale.contactUsForMoreHelp}</p>
        <Link
          href="/contact-us"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
        >
          {locale.contactUs}
        </Link>
      </div>
    </div>
  );
}
