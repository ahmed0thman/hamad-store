import AccountNav from "@/components/custom/account/accountNav";
import { ReactNode } from "react";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section
      dir="rtl"
      className=" bg-muted dark:bg-background text-foreground sm:p-6 lg:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 wrapper  relative">
        <AccountNav />
        <main className="col-span-1 lg:col-span-3 bg-white dark:bg-muted/50 p-6 sm:p-8 rounded-sm shadow-sm">
          {children}
        </main>
      </div>
    </section>
  );
};

export default AccountLayout;
