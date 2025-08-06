"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";
import { Bell, Heart, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonLogout from "./buttonLogout";
import { User as UserType } from "@/types";

const userMenuItems = [
  {
    title: "Account",
    href: "/account/profile",
    icon: <User />,
  },
  {
    title: "Notification",
    href: "/account/notifications",
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
  // const singedIn = true;
  // const fisrtInitial = session.user?.name?.charAt(0).toUpperCase() ?? "U";
  // if (!session)
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
              <div className="flex items-center">
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
      <ButtonLogout dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
};

export default UserButton;
