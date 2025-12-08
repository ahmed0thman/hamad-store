import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">الأسئلة الشائعة</h1>
      <p className="text-gray-600 mb-8">
        إجابات على الأسئلة الأكثر شيوعًا حول خدماتنا
      </p>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            كيف يمكنني تقديم طلب؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            لتقديم طلب، ما عليك سوى تصفح منتجاتنا، وإضافة العناصر التي تريدها
            إلى سلة التسوق، ثم الانتقال إلى صفحة الدفع. ستحتاج إلى تسجيل الدخول
            أو إنشاء حساب جديد لإكمال طلبك. بعد ذلك، أدخل معلومات التوصيل وطريقة
            الدفع المفضلة لديك.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            ما هي طرق الدفع المتاحة؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نقبل العديد من طرق الدفع بما في ذلك:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>الدفع عند الاستلام (كاش)</li>
              <li>بطاقات الائتمان والخصم (Visa, MasterCard)</li>
              <li>المحافظ الإلكترونية</li>
              <li>التحويل البنكي</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            كم تستغرق عملية التوصيل؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            عادةً ما تستغرق عملية التوصيل من 1-3 أيام عمل داخل المدن الرئيسية،
            و3-7 أيام للمناطق النائية. نقدم أيضًا خدمة التوصيل السريع في نفس
            اليوم في بعض المناطق مقابل رسوم إضافية.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            هل يمكنني إرجاع أو استبدال المنتجات؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نعم، نقبل إرجاع المنتجات خلال 14 يومًا من تاريخ الاستلام، بشرط أن
            تكون في حالتها الأصلية ولم يتم استخدامها. ومع ذلك، لأسباب صحية
            وقانونية، لا يمكن إرجاع الأدوية والمنتجات الطبية المفتوحة. للمزيد من
            التفاصيل، يرجى الاطلاع على سياسة الإرجاع الخاصة بنا.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            كيف يمكنني تتبع طلبي؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            بمجرد شحن طلبك، سنرسل لك بريدًا إلكترونيًا ورسالة نصية تحتوي على رقم
            التتبع. يمكنك تتبع طلبك من خلال حسابك على الموقع في قسم
            &quot;طلباتي&quot; أو عبر رابط التتبع المرسل إليك.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            هل تتوفر المنتجات بوصفة طبية؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نعم، نوفر الأدوية التي تتطلب وصفة طبية. سيُطلب منك تحميل نسخة من
            الوصفة الطبية الصالحة أثناء عملية الطلب. سيقوم فريقنا الطبي بمراجعة
            الوصفة قبل معالجة الطلب لضمان سلامتك.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            هل معلوماتي الشخصية آمنة؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نعم، نحن نأخذ أمان بياناتك على محمل الجد. نستخدم تقنية التشفير SSL
            لحماية جميع المعلومات الشخصية والمالية. لا نشارك بياناتك مع أطراف
            ثالثة إلا عند الضرورة لإتمام طلبك. راجع سياسة الخصوصية للمزيد من
            التفاصيل.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            كيف يمكنني الحصول على استشارة طبية؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نوفر خدمة الاستشارة الطبية عبر الإنترنت مع صيادلة وأطباء معتمدين.
            يمكنك حجز استشارة من خلال حسابك أو التواصل معنا عبر الدردشة
            المباشرة. هذه الخدمة مجانية لعملائنا المسجلين.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            ما هي رسوم التوصيل؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            تختلف رسوم التوصيل حسب الموقع ووزن الطلب. نقدم توصيل مجاني للطلبات
            التي تزيد عن مبلغ معين (يختلف حسب المنطقة). يمكنك رؤية رسوم التوصيل
            الدقيقة عند الدفع قبل تأكيد طلبك.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            كيف يمكنني التواصل مع خدمة العملاء؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            يمكنك التواصل معنا عبر:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>الدردشة المباشرة على الموقع (متاحة 24/7)</li>
              <li>البريد الإلكتروني: support@valideria.com</li>
              <li>الهاتف: خلال ساعات العمل من 9 صباحًا - 6 مساءً</li>
              <li>
                نموذج{" "}
                <a href="/contact-us" className="text-teal-600 hover:underline">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            هل يمكنني تعديل أو إلغاء طلبي؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            يمكنك تعديل أو إلغاء طلبك خلال ساعة واحدة من تقديمه، بشرط ألا يكون
            قد تم شحنه بعد. بعد الشحن، لن يمكن إلغاء الطلب، ولكن يمكنك إرجاع
            المنتجات وفقًا لسياسة الإرجاع الخاصة بنا.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            هل تقدمون برنامج ولاء أو نقاط مكافآت؟
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed">
            نعم! نقدم برنامج نقاط المكافآت حيث تحصل على نقاط مع كل عملية شراء.
            يمكنك استبدال هذه النقاط بخصومات على مشترياتك المستقبلية. كما نقدم
            عروضًا خاصة وخصومات حصرية لعملائنا الدائمين.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12 p-6 bg-teal-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">لم تجد إجابة لسؤالك؟</h3>
        <p className="text-gray-700 mb-4">
          فريق خدمة العملاء لدينا على استعداد لمساعدتك!
        </p>
        <a
          href="/contact-us"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
        >
          اتصل بنا
        </a>
      </div>
    </div>
  );
}
