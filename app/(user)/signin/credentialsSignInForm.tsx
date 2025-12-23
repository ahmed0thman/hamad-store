"use client";

import SpinnerMini from "@/components/custom/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { signInWithCredentials } from "@/lib/api/apiUser";
import { signInDefaultValues } from "@/lib/constants";
import { signInSchema } from "@/lib/validators";
import { SignInFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CredentialsSignInForm = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: signInDefaultValues.email,
      password: signInDefaultValues.password,
    },
  });

  const pending = isLoading || isSubmitting;

  const onSubmit = async (data: SignInFormData) => {
    // Add your sign-in logic here
    const res = await signInWithCredentials(data);
    if (res?.success === false) {
      setFormError(t("invalidEmailOrPassword"));
      return;
    }
    if (res?.success) {
      router.push(callbackUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            {...register("email")}
            type="text"
            required
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            required
            autoComplete="password"
          />
          {errors.password && (
            <p className="text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div>
          {formError && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
              <ul className="list-disc ps-5">
                <li> {formError}</li>
              </ul>
            </div>
          )}
          <Button className="w-full" variant="default" disabled={pending}>
            {pending ? <SpinnerMini /> : t("signInTitle")}
          </Button>
        </div>
        {/* Forget Password */}
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/forgetPassword" target="_self" className="text-red-500">
            {t("forgetPassword")}
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <span className="me-1">{t("dontHaveAccount")}</span>
          <Link href="/register" target="_self" className="link">
            {t("signup")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
