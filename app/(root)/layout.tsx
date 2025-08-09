import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import CompareProvider from "@/contexts/CompareContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <CompareProvider>
        <Header />
        <main className="flex-1 ">{children}</main>
        <Footer />
      </CompareProvider>
    </div>
  );
}
