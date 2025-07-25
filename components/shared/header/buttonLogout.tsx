"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const ButtonLogout = () => {
  // const session = await auth();
  const router = useRouter();

  const handleLogout = () => {
    // TODO: implement sign-out logic (e.g., clear auth tokens)
    router.push("/");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full py-4 px-2 justify-start">
          <LogOut className="text-destructive" />
          Sign Out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonLogout;
