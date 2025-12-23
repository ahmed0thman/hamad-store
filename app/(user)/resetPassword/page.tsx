import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { APP_NAME } from "@/lib/constants";
import getLocaleStrings from "@/localization";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./resetPasswordForm";

const ResetPassword = async () => {
  const session = await auth();
  const locale = await getLocaleStrings();

  if (session?.user) return redirect("/");
  return (
    <div className="w-full max-w-md mx-auto m-auto">
      <Card className="bg-teal-100/20 dark:bg-background">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logos/Logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle className="text-center">{locale.resetPassword}</CardTitle>
          <CardDescription className="text-center">
            {locale.resetPasswordDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
