"use client";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { forgetPasswordCheckEmail } from "@/lib/api/apiUser";
import { forgetPasswordSchema } from "@/lib/validators";
import { forgetPasswordT } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgetPasswordForm = () => {
  const { t } = useTranslation();

  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<forgetPasswordT>({
    resolver: forgetPasswordSchema
      ? zodResolver(forgetPasswordSchema)
      : undefined,
  });

  const pending = isLoading || isSubmitting;

  const onSubmit = async (data: forgetPasswordT) => {
    // Add your sign-in logic here
    const res = await forgetPasswordCheckEmail(data);
    if (res?.success === false) {
      setFormError(t("emailNotFound"));
      return;
    }
    if (res?.success) {
      router.push(`/resetPassword?email=${data.email}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default ForgetPasswordForm;
