"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import loader from "@/assets/loader.gif";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithCredentials } from "@/lib/api/apiUser";
import { signInSchema } from "@/lib/validators";
import { SignInFormData } from "@/types";
import { useState } from "react";
import { revalidatePath } from "next/cache";

const ButtonSignIn = () => {
  const { pending } = useFormStatus();
  if (pending)
    return (
      <div className="flex-center">
        <Image src={loader} width={20} height={20} alt="loader" />
      </div>
    );
  return (
    <Button className="w-full" variant="default">
      Sign In
    </Button>
  );
};

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: signInDefaultValues.email,
      password: signInDefaultValues.password,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    // Add your sign-in logic here
    const res = await signInWithCredentials(data);
    if (res?.success === false) {
      setFormError("Invalid email or password");
      return;
    }
    if (res?.success) {
      redirect(callbackUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="password">Password</Label>
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
          <ButtonSignIn />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <span className="me-1">Don&apos;t have an account?</span>
          <Link href="/register" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
