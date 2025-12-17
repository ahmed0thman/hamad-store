import { authSEO } from "@/lib/seo";

export const metadata = authSEO.register;

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
