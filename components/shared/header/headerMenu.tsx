"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CreditCard,
  Globe,
  Heart,
  Home,
  Info,
  Languages,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MenuIcon,
  Moon,
  PanelLeft,
  RotateCcw,
  Settings,
  Sun,
  UserCircle,
  Wallet,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import profileImg from "/public/images/uploads/profile.png";
import Link from "next/link";
import { useTheme } from "next-themes";
import { pharmacyCategories } from "@/lib/sampleData";

const headerPages = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "About", path: "/about", icon: <Info /> },
  { title: "Contact Us", path: "/contact-us", icon: <Mail /> },
];

const accountPages = [
  { title: "Personal Info", path: "/profile", icon: <UserCircle /> },
  { title: "Addresses", path: "/addresses", icon: <MapPin /> },
  { title: "Returns", path: "/returns", icon: <RotateCcw /> },
  { title: "Payment Methods", path: "/payment-methods", icon: <CreditCard /> },
  { title: "Wallet", path: "/wallet", icon: <Wallet /> },
  { title: "Compare Products", path: "/compare", icon: <PanelLeft /> },
  { title: "Wishlist", path: "/wishlist", icon: <Heart /> },
  { title: "Settings", path: "/settings", icon: <Settings /> },
];

const HeaderMenu = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(function () {
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger className="align-middle  p-1 rounded-md text-stone-500 ">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start p-4 overflow-auto">
          <SheetTitle></SheetTitle>
          <div className="flex-center gap-3">
            <Image src={profileImg} width={50} height={50} alt="profile" />
            <p className="text-gray-600 font-medium text-lg">Ahmed Othman</p>
          </div>
          {/* Menus */}
          <div className="flex-grow-1 w-full flex flex-col divide-y divide-gray-200 dark:divide-slate-700">
            <Menu>
              <MenuItem href="/signin" title="signin" icon={<LogIn />} />
            </Menu>
            {/* Menu Main Pages */}
            <Menu>
              {headerPages.map((ele) => (
                <MenuItem
                  key={`${ele.path}-mobile`}
                  href={ele.path}
                  title={ele.title}
                  icon={ele.icon}
                />
              ))}
            </Menu>

            {/* Categories */}
            <Accordion type="single" collapsible>
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 px-6 text-lg hover:no-underline">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <Menu>
                    {pharmacyCategories.map((ele) => (
                      <MenuItem
                        key={`${ele.name}-category`}
                        title={ele.name}
                        href={ele.href}
                      />
                    ))}
                  </Menu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Account */}
            <Accordion type="single" collapsible>
              <AccordionItem value="account">
                <AccordionTrigger className="py-3 px-6 text-lg hover:no-underline">
                  Account
                </AccordionTrigger>
                <AccordionContent>
                  <Menu>
                    {accountPages.map((ele) => (
                      <MenuItem
                        key={`${ele.title}-account`}
                        title={ele.title}
                        href={ele.path}
                        icon={ele.icon}
                      />
                    ))}
                  </Menu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Menu Actions */}
            <Menu>
              <MenuItem
                title={"en"}
                icon={<Globe />}
                handleClick={() => console.log("change lang")}
              />
              <MenuItem
                title={theme === "light" ? "Light Mode" : "Dark Mode"}
                icon={theme === "dark" ? <Sun /> : <Moon />}
                handleClick={toggleTheme}
              />
            </Menu>

            {/* Logout */}
            <Menu>
              <MenuItem
                title="Logout"
                icon={<LogOut />}
                color="text-destructive"
                handleClick={() => console.log("logged out")}
              />
            </Menu>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

function Menu({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col w-full gap-3 py-2">{children}</ul>;
}

function MenuItem({
  href,
  title,
  color,
  icon,
  handleClick,
}: {
  icon?: ReactNode;
  href?: string;
  title: string;
  color?: string;
  handleClick?: () => void;
}) {
  return (
    <li className=" cursor-pointer py-3 px-6 active:bg-stone-200 active:text-gray-500 dark:active:text-slate-500 dark:active:bg-slate-700 rounded-full">
      {href ? (
        <Link href={href} className="flex items-center gap-4">
          <div className="text-primary">{icon}</div>

          <p className="text-lg">{title}</p>
        </Link>
      ) : (
        <span
          onClick={() => {
            if (handleClick) handleClick();
          }}
          className="flex items-center gap-4"
        >
          <div className={color || "text-primary"}>{icon}</div>

          <p className="text-lg">{title}</p>
        </span>
      )}
    </li>
  );
}

export default HeaderMenu;
