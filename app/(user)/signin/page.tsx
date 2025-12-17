import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentialsSignInForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import getLocaleStrings from "@/localization";

export const metadata: Metadata = {
  title: "Sing In",
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const session = await auth();
  const { callbackUrl } = await props.searchParams;
  const locale = await getLocaleStrings();

  if (session?.user) return redirect(callbackUrl || "/");
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
          <CardTitle className="text-center">{locale.signInTitle}</CardTitle>
          <CardDescription className="text-center">
            {locale.signInDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
