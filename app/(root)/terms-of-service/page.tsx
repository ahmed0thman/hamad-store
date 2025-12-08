import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "شروط وأحكام استخدام منصة Valideria",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">شروط الاستخدام</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">القبول بالشروط</h2>
          <p className="text-gray-700 leading-relaxed">
            بالوصول إلى واستخدام منصة Valideria الإلكترونية للتسوق الصحي، فإنك
            توافق على الالتزام بهذه الشروط والأحكام. منصتنا تجمع بين صيدليات
            وموردين متعددين لتوفير أفضل المنتجات والأسعار. إذا كنت لا توافق على
            هذه الشروط، يرجى عدم استخدام منصتنا.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">استخدام الموقع</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            يجب عليك استخدام الموقع فقط للأغراض القانونية. يُحظر عليك:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>استخدام الموقع بأي طريقة تنتهك القوانين المحلية أو الدولية</li>
            <li>محاولة الوصول غير المصرح به إلى أنظمتنا</li>
            <li>نشر أي محتوى ضار أو مسيء أو غير قانوني</li>
            <li>إساءة استخدام خدماتنا أو التدخل في عمل الموقع</li>
            <li>انتحال شخصية الغير أو تقديم معلومات مضللة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">التسجيل والحساب</h2>
          <p className="text-gray-700 leading-relaxed">
            للوصول إلى بعض ميزات الموقع، قد تحتاج إلى إنشاء حساب. أنت مسؤول عن
            الحفاظ على سرية معلومات حسابك وكلمة المرور، وعن جميع الأنشطة التي
            تحدث تحت حسابك. يجب عليك إخطارنا فورًا بأي استخدام غير مصرح به
            لحسابك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">الطلبات والمدفوعات</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            عند تقديم طلب على موقعنا:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>تعتبر عرضًا لشراء المنتجات المحددة</li>
            <li>نحتفظ بحق قبول أو رفض أي طلب</li>
            <li>الأسعار قابلة للتغيير دون إشعار مسبق</li>
            <li>جميع المدفوعات يجب أن تتم بالكامل قبل الشحن</li>
            <li>نحن غير مسؤولين عن أخطاء الأسعار الواضحة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">الشحن والتوصيل</h2>
          <p className="text-gray-700 leading-relaxed">
            نبذل قصارى جهدنا لتوصيل الطلبات في الوقت المحدد، ولكننا لا نضمن
            أوقات التسليم المحددة. المسؤولية عن المنتجات تنتقل إليك عند التسليم.
            يرجى فحص الطرود عند الاستلام.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">الإرجاع والاستبدال</h2>
          <p className="text-gray-700 leading-relaxed">
            نقبل إرجاع المنتجات وفقًا لسياسة الإرجاع الخاصة بالبائع الذي اشتريت
            منه. يجب أن تكون المنتجات في حالتها الأصلية وغير مستخدمة. قد تختلف
            سياسات الإرجاع بين البائعين، والمنتجات الطبية والأدوية قد تخضع لقيود
            خاصة على الإرجاع لأسباب صحية وقانونية.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">الملكية الفكرية</h2>
          <p className="text-gray-700 leading-relaxed">
            جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات
            والرسومات، هي ملك لـ Valideria ومحمية بموجب قوانين حقوق النشر
            والملكية الفكرية. لا يجوز لك نسخ أو توزيع أو تعديل أي محتوى دون إذن
            كتابي مسبق.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">إخلاء المسؤولية</h2>
          <p className="text-gray-700 leading-relaxed">
            يتم توفير الموقع والخدمات كما هي دون أي ضمانات من أي نوع. لا نضمن أن
            الموقع سيكون خاليًا من الأخطاء أو غير منقطع. نحن غير مسؤولين عن أي
            أضرار مباشرة أو غير مباشرة ناتجة عن استخدام موقعنا.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">تحديد المسؤولية</h2>
          <p className="text-gray-700 leading-relaxed">
            لن تتجاوز مسؤوليتنا الإجمالية تجاهك، بموجب أي ظرف من الظروف، المبلغ
            الذي دفعته لنا مقابل المنتجات أو الخدمات المعنية.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">القانون الحاكم</h2>
          <p className="text-gray-700 leading-relaxed">
            تخضع هذه الشروط والأحكام وتُفسر وفقًا لقوانين جمهورية مصر العربية.
            أي نزاع ينشأ عن هذه الشروط سيخضع للاختصاص القضائي الحصري للمحاكم
            المصرية.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">التعديلات</h2>
          <p className="text-gray-700 leading-relaxed">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات تصبح سارية فور
            نشرها على الموقع. استمرارك في استخدام الموقع بعد النشر يعني قبولك
            للشروط المعدلة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">الاتصال</h2>
          <p className="text-gray-700 leading-relaxed">
            إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى الاتصال بنا عبر صفحة{" "}
            <a href="/contact-us" className="text-teal-600 hover:underline">
              اتصل بنا
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
