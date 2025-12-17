import { plansSEO } from "@/lib/seo";

export const metadata = plansSEO;

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
