"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { plan, PlanSubscriptionFormData } from "@/types";
import { planSubscriptionFormSchema } from "@/lib/validators";
import { Badge } from "@/components/ui/badge";
import { Building2, CreditCard, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { subscribeToPlan } from "@/lib/api/apiPlans";
import { useTranslation } from "@/hooks/useTranslation";

interface PlanSubscriptionModalProps {
  plan: plan;
  isOpen: boolean;
  onClose: () => void;
}

const PlanSubscriptionModal = ({
  plan,
  isOpen,
  onClose,
}: PlanSubscriptionModalProps) => {
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const { t } = useTranslation();

  const form = useForm<PlanSubscriptionFormData>({
    resolver: zodResolver(planSubscriptionFormSchema),
    defaultValues: {
      plan_id: plan.id,
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      pharmacy_name_ar: "",
      pharmacy_name_en: "",
      pharmacy_address_ar: "",
      pharmacy_address_en: "",
      pharmacy_phone: "",
      pharmacy_email: "",
      payment_method: "cash",
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        plan_id: plan.id,
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        pharmacy_name_ar: "",
        pharmacy_name_en: "",
        pharmacy_address_ar: "",
        pharmacy_address_en: "",
        pharmacy_phone: "",
        pharmacy_email: "",
        payment_method: "cash",
      });
      setApiErrors({}); // Clear API errors when modal opens
    }
  }, [isOpen, plan.id, form]);

  const onSubmit = async (data: PlanSubscriptionFormData) => {
    try {
      setApiErrors({}); // Clear previous errors
      const response = await subscribeToPlan(data);
      console.log(response);
      if (response.success) {
        toast.success(t("subscriptionSuccessful"));
        form.reset();
        onClose();
      } else {
        setApiErrors(response.message);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(t("failedToSubscribe"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" !w-11/12 !max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("subscribeTo")}{" "}
            {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)} {t("plan")}
          </DialogTitle>
          <DialogDescription>{t("fillDetailsToSubscribe")}</DialogDescription>
        </DialogHeader>

        {/* Plan Summary */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg capitalize">
                {plan.type} {t("plan")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {plan.price} {plan.currency}
              </div>
              <Badge variant="secondary" className="mt-1">
                {plan.duration_in_days} {t("days")}
              </Badge>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t("personalInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fullName")} *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+201234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("minCharacters")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("reEnterPassword")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Pharmacy Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t("pharmacyInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pharmacy_name_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pharmacyNameArabic")} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="صيدلية النور"
                          dir="rtl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pharmacy_name_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pharmacyNameEnglish")} *</FormLabel>
                      <FormControl>
                        <Input placeholder="Al-Noor Pharmacy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pharmacy_address_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addressArabic")} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="القاهرة - مدينة نصر"
                          dir="rtl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pharmacy_address_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addressEnglish")} *</FormLabel>
                      <FormControl>
                        <Input placeholder="Cairo - Nasr City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pharmacy_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pharmacyPhone")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+209876543210"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pharmacy_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pharmacyEmail")} *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="pharmacy@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                {t("paymentMethod")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("paymentMethod")} *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("selectPaymentMethod")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <SelectItem value="card">
                            {t("creditDebitCard")}
                          </SelectItem> */}
                          <SelectItem value="cash">
                            {t("cashOnDelivery")}
                          </SelectItem>
                          <SelectItem value="wallet">
                            {t("digitalWallet")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* API Errors Display */}
            {Object.keys(apiErrors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <ul className="space-y-1">
                  {Object.entries(apiErrors).map(([field, messages]) => {
                    const errorText = Array.isArray(messages)
                      ? messages.join(", ")
                      : String(messages);
                    return (
                      <li key={field} className="text-sm text-destructive">
                        <span className="font-bold capitalize">
                          {field.replace(/_/g, " ")}:
                        </span>{" "}
                        {errorText}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={form.formState.isSubmitting}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? t("processing")
                  : t("subscribeNow")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSubscriptionModal;
