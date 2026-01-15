/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { revalidate } from "@/lib/api/actions";
import { getAllCategories } from "@/lib/api/apiProducts";
import { signOutUser } from "@/lib/api/apiUser";
import { category, UserProfile } from "@/types";
import {
  Globe,
  Heart,
  Home,
  Info,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  MenuIcon,
  Moon,
  PanelLeft,
  RotateCcw,
  Sun,
  UserCircle,
  Wallet,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState, useTransition } from "react";
import ButtonLang from "./buttonLang";
import { useTranslation } from "@/hooks/useTranslation";
import ButtonCurrency from "./buttonCurrency";
import { useGetProfile } from "@/hooks/useGetProfile";

const HeaderMenu = ({ session }: { session: any }) => {
  const { t } = useTranslation();
  const { profileData, isLoadoingProfile } = useGetProfile();
  const headerPages = [
    { title: t("home"), path: "/", icon: <Home /> },
    { title: t("about"), path: "/about", icon: <Info /> },
    { title: t("contactUs"), path: "/contact-us", icon: <Mail /> },
  ];

  const accountPages = [
    {
      title: t("personalInfo"),
      path: "/account/profile",
      icon: <UserCircle />,
    },
    { title: t("addresses"), path: "/account/addresses", icon: <MapPin /> },
    { title: t("returns"), path: "/account/refund", icon: <RotateCcw /> },
    { title: t("wallet"), path: "/account/wallet", icon: <Wallet /> },
    {
      title: t("compareProducts"),
      path: "/account/compare",
      icon: <PanelLeft />,
    },
    { title: t("favorites"), path: "/favorites", icon: <Heart /> },
  ];
  const { theme, setTheme } = useTheme();
  const [pending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<category[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(
    session?.user?.token || session?.accessToken ? true : false
  );

  const [lang, setLang] = useState<string>("ar");
  const [initials, setInitials] = useState<string>("");
  const pathName = usePathname();

  async function handleGetCategories() {
    const categories = await getAllCategories();
    setCategories(categories);
  }

  async function handleSignOut() {
    const responses = await Promise.all([
      signOutUser(session?.user?.token as string),
      signOut({ redirect: false }),
      revalidate(pathName),
    ]);
    setIsAuth(false);
    setInitials("");
  }

  useEffect(() => {
    if (isAuth) {
      setInitials(
        `${profile?.first_name?.charAt(
          0
        )} ${profileData?.data?.last_name?.charAt(0)}`
      );
    }
  }, [isAuth]);

  useEffect(function () {
    startTransition(handleGetCategories);
    setMounted(true);
    const storedLang = localStorage?.getItem("Lan") || "ar";
    setLang(storedLang);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  if (isLoadoingProfile) return null;
  const profile = profileData?.data as UserProfile | undefined;
  return (
    <nav className="lg:!hidden flex-center gap-2">
      <Sheet>
        <SheetTrigger
          className="align-middle  p-1 rounded-md text-stone-500 "
          aria-label={t("menu")}
        >
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start p-4 overflow-auto">
          <SheetTitle></SheetTitle>
          {profile && (
            <div className="flex-center gap-3">
              {profile?.profile_image ? (
                <Image
                  src={profile?.profile_image}
                  width={50}
                  height={50}
                  alt="profile"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-medium capitalize">
                    {initials}
                  </span>
                </div>
              )}
              <p className="text-gray-600 font-medium text-lg">
                {profile?.first_name} {profile?.last_name}
              </p>
            </div>
          )}
          {/* Menus */}
          <div className="flex-grow-1 w-full flex flex-col divide-y divide-gray-200 dark:divide-slate-700">
            {!profile ? (
              <Menu>
                <MenuItem href="/signin" title={t("signin")} icon={<LogIn />} />
              </Menu>
            ) : null}
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

            {/* Account */}
            {profile ? (
              // <Accordion type="single" collapsible>
              //   <AccordionItem value="account">
              //     <AccordionTrigger className="py-3 px-6 text-lg hover:no-underline">
              //       {t("account")}
              //     </AccordionTrigger>
              //     <AccordionContent>

              //     </AccordionContent>
              //   </AccordionItem>
              // </Accordion>
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
            ) : null}

            {/* Categories */}
            <Accordion type="single" collapsible>
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 px-6 text-lg hover:no-underline">
                  {t("categories")}
                </AccordionTrigger>
                <AccordionContent>
                  <Menu>
                    {categories.map((ele) => (
                      <MenuItem
                        key={`${ele.name}-category`}
                        title={ele.name}
                        href={`products?categoryId=${ele.id}`}
                      />
                    ))}
                  </Menu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Menu Actions */}
            <Menu>
              <ButtonLang>
                <MenuItem
                  title={lang === "ar" ? "AR" : "EN"}
                  icon={<Globe />}
                  handleClick={() => console.log("change lang")}
                />
              </ButtonLang>
              <MenuItem
                title={theme === "light" ? t("lightMode") : t("darkMode")}
                icon={theme === "dark" ? <Sun /> : <Moon />}
                handleClick={toggleTheme}
              />
            </Menu>

            {/* Logout */}
            {profile ? (
              <Menu>
                <MenuItem
                  title={t("signOut")}
                  icon={<LogOut />}
                  color="text-destructive"
                  handleClick={() => startTransition(handleSignOut)}
                />
              </Menu>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
      <ButtonCurrency />
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
