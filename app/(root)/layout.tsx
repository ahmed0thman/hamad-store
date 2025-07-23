import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Header />
      <main className="flex-1 ">{children}</main>
      <Footer />
    </div>
  );
}
