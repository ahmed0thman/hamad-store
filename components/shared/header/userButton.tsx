"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNotifications } from "@/lib/api/apiNotifications";
import { Notification, User as UserType } from "@/types";
import { Bell, Heart, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import ButtonLogout from "./buttonLogout";

const userMenuItems = [
  {
    title: "Account",
    href: "/account/profile",
    icon: <User />,
  },
  {
    title: "Notification",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: <Heart />,
  },
];

const UserButton = ({ user }: { user: UserType | null }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [pending, startTransition] = useTransition();
  // const singedIn = true;
  // const fisrtInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";
  // if (!session)

  useEffect(function () {
    if (user?.token) {
      handleGetNotifications();
    }
  }, []);

  async function handleGetNotifications() {
    const response = await getNotifications(user?.token);
    if (response.success && response.data) {
      const notifications = response.data.notifications as Notification[];
      console.log("Notifications:", notifications);
      setTotalNotifications(notifications.filter((n) => !n.read_at).length);
    }
  }
  return (
    <div className="hidden lg:block">
      {!user ? (
        <div className="flex-center gap-2" style={{ fontFamily: "Poppins" }}>
          <Button asChild>
            <Link href="/signin" className="flex-center ">
              Signin
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/register" className="flex-center  font-medium">
              Signup
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
              <div className="flex items-center relative">
                {totalNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 max-w-8  rounded-full flex items-center justify-center">
                    {totalNotifications > 99 ? "99+" : totalNotifications}
                  </span>
                )}
                <Button
                  variant="ghost"
                  className="w-8 h-8 aspect-square rounded-full ms-2 flex items-center justify-center bg-secondary text-primary"
                >
                  {user?.firstName?.charAt(0).toUpperCase() ??
                    user?.lastName?.charAt(0).toUpperCase() ??
                    "U"}
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
                    {/* Ahmed Othman */}
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground leading-none">
                    {user?.email}
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
                      {item.title === "Notification" &&
                        totalNotifications > 0 && (
                          <span className="ms-auto bg-red-500 text-white text-xs px-2 max-w-8  rounded-full flex items-center justify-center">
                            {totalNotifications > 99
                              ? "99+"
                              : totalNotifications}
                          </span>
                        )}
                    </Link>
                  </Button>
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem className="p-0 mb-1">
                <Button
                  variant="ghost"
                  className="w-full py-4 px-2 justify-start"
                  onClick={() => setDialogOpen(true)}
                >
                  <LogOut className="text-destructive" />
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <ButtonLogout
        user={user}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default UserButton;
