import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية البيانات الشخصية",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">سياسة الخصوصية</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">المقدمة</h2>
          <p className="text-gray-700 leading-relaxed">
            نحن في Valideria نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية. توضح
            هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند
            استخدام منصتنا الإلكترونية أو تطبيقنا للتسوق من صيدليات وموردين
            متعددين.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">المعلومات التي نجمعها</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            نقوم بجمع الأنواع التالية من المعلومات:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>معلومات التسجيل (الاسم، البريد الإلكتروني، رقم الهاتف)</li>
            <li>معلومات العنوان والتوصيل</li>
            <li>تفاصيل الطلبات والمشتريات</li>
            <li>معلومات الدفع (نحتفظ بها بشكل آمن ومشفر)</li>
            <li>بيانات الاستخدام والتصفح</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            كيفية استخدام معلوماتك
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            نستخدم المعلومات التي نجمعها للأغراض التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>معالجة وتوصيل طلباتك</li>
            <li>تحسين خدماتنا وتجربة المستخدم</li>
            <li>التواصل معك بشأن طلباتك والعروض الخاصة</li>
            <li>توفير دعم العملاء</li>
            <li>منع الاحتيال وضمان أمان المنصة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">حماية البيانات</h2>
          <p className="text-gray-700 leading-relaxed">
            نتخذ تدابير أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح
            به أو التعديل أو الإفصاح أو التدمير. نستخدم تشفير SSL لجميع
            المعاملات ونحافظ على معايير أمان عالية.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            مشاركة المعلومات مع الغير
          </h2>
          <p className="text-gray-700 leading-relaxed">
            لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع
            البائعين والصيدليات المسجلين على منصتنا فقط لتنفيذ طلباتك، وشركاء
            موثوقين لتقديم خدماتنا (مثل شركات الشحن ومعالجات الدفع)، وذلك بموجب
            اتفاقيات سرية صارمة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">ملفات تعريف الارتباط</h2>
          <p className="text-gray-700 leading-relaxed">
            نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على موقعنا.
            يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص
            بك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">حقوقك</h2>
          <p className="text-gray-700 leading-relaxed mb-3">لديك الحق في:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح أو تحديث بياناتك</li>
            <li>حذف بياناتك</li>
            <li>الاعتراض على معالجة بياناتك</li>
            <li>طلب نسخة من بياناتك</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            التغييرات على سياسة الخصوصية
          </h2>
          <p className="text-gray-700 leading-relaxed">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي
            تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">اتصل بنا</h2>
          <p className="text-gray-700 leading-relaxed">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر
            صفحة{" "}
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
