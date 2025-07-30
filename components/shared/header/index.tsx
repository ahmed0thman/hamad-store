import HaederPages from "./headerPages";
import HeaderButtons from "./headerButtons";
import HeaderLogo from "./headerLogo";
import HeaderSearch from "./headerSearch";
import UserButton from "./userButton";
import HeaderMenu from "./headerMenu";
import { Categories } from "./categories";
import MobileNav from "./mobileNav";
import { auth } from "@/lib/auth";

const Header = async () => {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = session.user;
  }
  return (
    <>
      <header className="border-b sticky top-0 start-0 end-0 bg-background z-50">
        <div className="wrapper">
          <div className="flex-between gap-2">
            <HeaderLogo />
            <HaederPages />
            <HeaderSearch />
            <HeaderButtons />
            <UserButton user={user} />
            <HeaderMenu />
            <MobileNav />
          </div>
        </div>
      </header>
      <Categories />
    </>
  );
};

export default Header;
