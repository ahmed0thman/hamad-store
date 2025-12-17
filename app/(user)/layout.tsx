import ClientProviders from "@/providers/ClientProviders";
import ButtonLang from "@/components/shared/header/buttonLang";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <div className="min-h-screen flex items-center justify-center bg-background relative">
        <div className="absolute top-4 end-4">
          <ButtonLang />
        </div>
        {children}
      </div>
    </ClientProviders>
  );
}
