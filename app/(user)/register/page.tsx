"use client";
import React, { useState } from "react";
import RegisterDoctor from "./registerDoctor";
import RegisterUser from "./registerUser";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const RegisterPage = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<"user" | "doctor" | null>(null);
  if (!userType) {
    return (
      <div className="space-y-12 bg-background text-center p-8 px-14 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          {t("selectUserType")}
        </h1>
        <div className="grid gap-4">
          <Button
            variant={"default"}
            onClick={() => setUserType("user")}
            className="btn px-8 py-3 text-lg font-semibold"
          >
            {t("user")}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setUserType("doctor")}
            className="btn px-8 py-3 text-lg font-semibold"
          >
            {t("doctor")}
          </Button>
        </div>
      </div>
    );
  }

  return userType === "doctor" ? <RegisterDoctor /> : <RegisterUser />;
};

export default RegisterPage;
