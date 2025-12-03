import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.is_doctor) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Reports</h1>
        <p className="text-red-500">
          Access denied. You do not have permission to view this page.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      <div className="border-b border-border mb-4">
        <div className="flex gap-4">
          <Link
            href="/account/reports/promocodes"
            className="px-4 py-2 text-sm font-medium transition-colors hover:text-foreground data-[active=true]:border-b-2 data-[active=true]:border-primary"
          >
            Promo Code
          </Link>
          <Link
            href="/account/reports/reviews"
            className="px-4 py-2 text-sm font-medium transition-colors hover:text-foreground data-[active=true]:border-b-2 data-[active=true]:border-primary"
          >
            Reviews
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
