"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserLanguage } from "@/lib/api/apiUser";
import { formatCurrencyEGP } from "@/lib/utils";
import { Globe, Moon, ShoppingCart, Sun } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

const HeaderButtons = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<string | undefined>();

  useEffect(
    function () {
      const localLang = localStorage?.getItem("Lan");
      if (session?.user?.language) {
        setLanguage(session.user.language);
        setDocumentLanguage(session.user.language);
        console.log("set from session");
      } else if (localLang) {
        setLanguage(localLang);
        setDocumentLanguage(localLang);
        console.log("set from localStorage");
      } else {
        setLanguage("ar"); // default language
        setDocumentLanguage("ar");
        console.log("set default");
      }

      setMounted(true);
    },
    [session?.user?.language]
  );

  async function handleChangeLanguage() {
    const newLang = language === "ar" ? "en" : "ar";

    if (session?.user) {
      const response = await updateUserLanguage(
        session.accessToken as string,
        newLang
      );
      console.log(response);
    }
    setLanguage(newLang);
    localStorage?.setItem("Lan", newLang);
    setDocumentLanguage(newLang);
  }

  function setDocumentLanguage(newLang: string) {
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  if (!mounted) return null;
  return (
    <div className="flex-center text-stone-700 dark:text-stone-400 !hidden lg:!flex">
      <Button
        onClick={handleChangeLanguage}
        variant="ghost"
        className=" gap-1 p-0"
      >
        <Globe className="!w-6 !h-6" />
        {language === "ar" ? "AR" : "EN"}
      </Button>
      <Button onClick={toggleTheme} variant="ghost" className=" p-0">
        {theme === "light" ? (
          <Moon className="!w-6 !h-6" />
        ) : (
          <Sun className="!w-6 !h-6" />
        )}
      </Button>
      {/* Shopping cart */}
      {children}
    </div>
  );
};

export default HeaderButtons;
