import Header from "@/components/shared/header";
import { getCartData } from "@/lib/api/apiCart";
import { auth } from "@/lib/auth";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ClientProviders from "@/providers/ClientProviders";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

// Lazy load Footer to reduce initial bundle
const Footer = dynamic(() => import("@/components/shared/footer"), {
  loading: () => <div className="h-96" />,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const session = await auth();
  if (session?.accessToken || session?.user?.token) {
    await queryClient.prefetchQuery({
      queryKey: ["cart"],
      queryFn: async () => getCartData(),
    });
  }
  return (
    <ReactQueryProvider>
      <ClientProviders>
        <div className="flex min-h-screen flex-col relative">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            <main className="flex-1 ">{children}</main>
          </HydrationBoundary>
          <Footer />
        </div>
      </ClientProviders>
    </ReactQueryProvider>
  );
}
