"use client";
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const TextExpander = ({ content }: { content: string }) => {
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();
  const fullText = content.trim();
  const displayedText = showMore ? fullText : fullText.slice(0, 180) + "...";
  return (
    <p
      className="text-base font-medium text-gray-600 dark:text-slate-400 leading-loose cursor-pointer"
      onClick={() => setShowMore(!showMore)}
    >
      {displayedText}
      <span className="text-primary text-sm mt-2">
        {showMore ? t("showLess") : t("showMore")}
      </span>
    </p>
  );
};

export default TextExpander;
