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
import { strings } from "@/localization";
import { Globe, Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderButtons = () => {
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
        {strings.currentLang}
      </Button>
      <Button onClick={toggleTheme} variant="ghost" className=" p-0">
        {theme === "light" ? (
          <Moon className="!w-6 !h-6" />
        ) : (
          <Sun className="!w-6 !h-6" />
        )}
      </Button>
      {/* Shopping cart */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" p-0">
            <ShoppingCart className="!w-6 !h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 ">
          <DropdownMenuLabel className="text-primary">
            <div className="flex items-center gap-2 text-foreground text-lg font-medium capitalize">
              <Badge variant="secondary" className="text-base">
                {12}
              </Badge>
              elements
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="text-stone-700 dark:text-stone-300 text-sm font-semibold capitalize px-2 py-1.5 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-md transition">
            <div className="flex items-center gap-2">
              <span>Total</span>
              {formatCurrencyEGP(120.99455)}
            </div>
          </DropdownMenuItem>

          <Button
            asChild
            className="w-full mt-2 bg-primary text-white hover:bg-primary/90 transition font-semibold"
          >
            <Link href="/cart">View Cart</Link>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderButtons;
