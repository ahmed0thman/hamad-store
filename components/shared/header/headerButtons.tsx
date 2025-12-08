"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import ButtonLang from "./buttonLang";

const HeaderButtons = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="flex-center text-stone-700 dark:text-stone-400 !hidden lg:!flex">
      <ButtonLang />
      <div suppressHydrationWarning>
        {mounted && (
          <Button onClick={toggleTheme} variant="ghost" className=" p-0">
            {theme === "light" ? (
              <Moon className="!w-6 !h-6" />
            ) : (
              <Sun className="!w-6 !h-6" />
            )}
          </Button>
        )}
      </div>
      {/* Shopping cart */}
      {children}
    </div>
  );
};

export default HeaderButtons;
