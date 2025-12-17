"use client";

import CompareProvider from "@/contexts/CompareContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CompareProvider>{children}</CompareProvider>
    </LanguageProvider>
  );
}
