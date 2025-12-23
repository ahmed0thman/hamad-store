"use client";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { resetPasswordCheckToken } from "@/lib/api/apiUser";
import { resetPasswordSchema } from "@/lib/validators";
import { Locale } from "@/localization/en";
import { resetPasswordT } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  let strings: Locale;
  const router = useRouter();

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<resetPasswordT>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const pending = isLoading || isSubmitting;

  const toastIdRef = useRef<string | number | null>(null);
  const onSubmit = async (data: resetPasswordT) => {
    console.log(data);
    const res = await resetPasswordCheckToken(data);
    if (res?.success === false) {
      setFormError(t("emailNotFound"));
      return;
    }
    if (res?.success) {
      toastIdRef.current = toast.success(
        <div className="flex flex-col gap-2">
          <span>{t("passwordResetSuccess")}</span>
          <button
            className="underline text-primary text-sm mt-1"
            onClick={() => router.push("/signin")}
          >
            {t("goToSignIn")}
          </button>
        </div>,
        {
          duration: 3500,
          onAutoClose: () => router.push("/signin"),
        }
      );
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromQuery = searchParams.get("email") || "";
    if (!emailFromQuery) {
      router.push("/forgetPassword");
    }
    setValue("email", emailFromQuery);
  }, [router, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            {...register("email")}
            type="text"
            autoComplete="email"
            readOnly
            disabled
          />
          {errors.email && (
            <p className="text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="token">{t("secretKey")}</Label>
          <Input
            id="token"
            {...register("token")}
            type="password"
            autoComplete="off"
            name="token"
            inputMode="text"
            spellCheck={false}
          />
          {errors.token && (
            <p className="text-destructive">{errors.token.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">{t("newpassword")}</Label>
          <Input
            id="newPassword"
            {...register("password")}
            type="password"
            autoComplete="new-password"
            name="password"
            inputMode="text"
            spellCheck={false}
          />
          {errors.password && (
            <p className="text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmNewPassword">{t("confirmNewPassword")}</Label>
          <Input
            id="confirmNewPassword"
            {...register("password_confirmation")}
            type="password"
            autoComplete="new-password"
            name="password_confirmation"
            inputMode="text"
            spellCheck={false}
          />
          {errors.password_confirmation && (
            <p className="text-destructive">
              {errors.password_confirmation.message}
            </p>
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
            {pending ? <SpinnerMini /> : t("verifyEmailButton")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
