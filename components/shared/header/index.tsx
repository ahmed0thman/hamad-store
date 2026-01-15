import { getCartData } from "@/lib/api/apiCart";
import { getAllCategories } from "@/lib/api/apiProducts";
import { auth } from "@/lib/auth";
import getLocaleStrings from "@/localization";
import { category } from "@/types";
import { Categories } from "./categories";
import HeaderButtons from "./headerButtons";
import HeaderCart from "./headerCart";
import HeaderLogo from "./headerLogo";
import HeaderMenu from "./headerMenu";
import HeaderPages from "./headerPages";
import HeaderSearch from "./headerSearch";
import MobileNav from "./mobileNav";
import UserButton from "./userButton";

const Header = async () => {
  const session = await auth();
  const cart = await getCartData();
  const categories: category[] = await getAllCategories();
  const locale = await getLocaleStrings();

  let user = null;
  if (session?.user) {
    user = session.user;
  }
  return (
    <>
      <header className="border-b sticky top-0 start-0 end-0 bg-background z-50">
        <div className="wrapper">
          <div className="!grid grid-cols-4 grid-row-2 sm:!flex flex-between sm:gap-2 relative">
            <div className="flex justify-end items-center gap-2 col-start-2 col-span-3 row-start-1 row-span-1">
              {user ? (
                <div className="ms-auto sm:ms-0 sm:hidden text-gray-600 text-sm dark:text-gray-300 ">
                  {locale.welcome},{" "}
                  <span className="font-semibold">{user.firstName}</span>
                </div>
              ) : null}
              <div className="">
                <HeaderLogo />
              </div>
            </div>
            <HeaderPages />
            <div className="row-start-2 row-span-1 col-span-full">
              <HeaderSearch categories={categories} />
            </div>
            <HeaderButtons session={session}>
              <HeaderCart session={session} />
            </HeaderButtons>
            <UserButton user={user} />
            <div className=" col-start-1 col-span-1 flex justify-start items-center gap-2">
              <HeaderMenu session={session} />
            </div>
            <MobileNav />
          </div>
        </div>
      </header>
      <Categories />
    </>
  );
};

export default Header;
