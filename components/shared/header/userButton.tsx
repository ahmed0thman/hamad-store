import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { strings } from "@/localization";
// import { signOutUser } from "@/lib/actions/user.actions";
// import { auth } from "@/lib/auth";
import { Bell, Heart, LogOut, User } from "lucide-react";
import Link from "next/link";

const userMenuItems = [
  {
    title: "Account",
    href: "/account/profile",
    icon: <User />,
  },
  {
    title: "Notification",
    href: "/account/profile",
    icon: <Bell />,
  },
  {
    title: "Favorites",
    href: "/account/profile",
    icon: <Heart />,
  },
];

const UserButton = async () => {
  // const session = await auth();
  const singedIn = false;
  // const singedIn = true;
  // const fisrtInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";
  // if (!session)
  return (
    <div className="hidden lg:block">
      {!singedIn ? (
        <div className="flex-center gap-2" style={{ fontFamily: "Poppins" }}>
          <Button asChild>
            <Link href="/signin" className="flex-center ">
              Signin
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/signUp" className="flex-center  font-medium">
              Guest
            </Link>
          </Button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "Poppins" }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="w-8 h-8 aspect-square rounded-full ms-2 flex items-center justify-center bg-secondary text-primary"
                >
                  {/* {fisrtInitial} */}A
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 divide-y "
              align="end"
              forceMount
              style={{ fontFamily: "Poppins" }}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="text-sm leading-none">
                    Ahmed Othman
                    {/* {session.user?.name} */}
                  </div>
                  <div className="text-sm text-muted-foreground leading-none">
                    {/* {session.user?.email} */}
                    ahmed@mail.com
                  </div>
                </div>
              </DropdownMenuLabel>
              {userMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="p-0 mb-1 !rounded-none"
                >
                  <Button asChild variant="ghost" className="w-full">
                    <Link
                      href={item.href}
                      className="flex justify-start items-center gap-2 "
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem className="p-0 mb-1">
                <form
                  // action={signOutUser}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full py-4 px-2 justify-start"
                  >
                    <LogOut className="text-destructive" />
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default UserButton;
