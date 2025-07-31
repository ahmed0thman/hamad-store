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
import { formatCurrencyEGP } from "@/lib/utils";
import { Globe, Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

const HeaderButtons = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(function () {
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  if (!mounted) return null;
  return (
    <div className="flex-center text-stone-700 dark:text-stone-400 !hidden lg:!flex">
      <Button variant="ghost" className=" gap-1 p-0">
        <Globe className="!w-6 !h-6" />
        {"en"}
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
