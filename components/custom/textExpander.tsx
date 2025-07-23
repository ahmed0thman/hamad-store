"use client";
import React, { useState } from "react";

const TextExpander = () => {
  const [showMore, setShowMore] = useState(false);
  const fullText = `
    قدرات ممتازة لتوفير المغذيات الضرورية لدعم صحة مرضى السكري، حيث تحتوي على تركيبة متوازنة من البروتينات والكربوهيدرات والدهون بالإضافة إلى الفيتامينات والمعادن الأساسية. تمتاز بطعم الفانيليا اللذيذ وسهولة التحضير دون الحاجة إلى إعادة التسخين. يمكن استخدامها كوجبة خفيفة أو مكمل غذائي لتعويض النقص في العناصر الغذائية. تم تطويرها بعناية لتناسب احتياجات المرضى وتوفير الراحة أثناء الاستخدام. تحتوي كل عبوة على عدة وجبات وتعتبر اقتصادية وسهلة التخزين.
  `.trim();
  const displayedText = showMore ? fullText : fullText.slice(0, 180) + "...";
  return (
    <p
      className="text-sm text-gray-600 dark:text-slate-400 leading-loose cursor-pointer"
      onClick={() => setShowMore(!showMore)}
    >
      {displayedText}
      <span className="text-primary text-sm mt-2">
        {showMore ? "عرض أقل" : "عرض المزيد"}
      </span>
    </p>
  );
};

export default TextExpander;
