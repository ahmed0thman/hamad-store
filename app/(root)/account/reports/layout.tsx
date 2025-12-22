"use client";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      <div className="border-b border-border mb-4">
        <div className="flex gap-4">
          {/* <Link
            href="/account/reports/promocodes"
            className={`px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
              pathName.includes("/account/reports/promocodes")
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            كود البروموشن
          </Link> */}
          <Link
            href="/account/reports/reviews"
            className={`px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
              pathName.includes("/account/reports/reviews")
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {t("reports")}
          </Link>
          <Link
            href="/account/reports/comments"
            className={`px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
              pathName.includes("/account/reports/comments")
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {t("comments")}
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
