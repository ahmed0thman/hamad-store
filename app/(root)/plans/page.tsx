"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, AlertCircle } from "lucide-react";
import { plan } from "@/types";
import PlanSubscriptionModal from "@/components/custom/plans/PlanSubscriptionModal";
import { getPlans } from "@/lib/api/apiPlans";
import PlansLoading from "./loading";
import { useTranslation } from "@/hooks/useTranslation";

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState<plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const planFeatures: Record<string, string[]> = {
    monthly: [
      t("fullInventoryManagement"),
      t("basicAnalyticsDashboard"),
      t("emailSupport"),
      t("mobileAppAccess"),
      t("upTo1000Products"),
    ],
    annual: [
      t("fullInventoryManagement"),
      t("advancedAnalyticsReports"),
      t("priority247Support"),
      t("mobileAppAccess"),
      t("unlimitedProducts"),
      t("customBranding"),
      t("apiAccess"),
      t("dedicatedAccountManager"),
    ],
    quarterly: [
      t("fullInventoryManagement"),
      t("standardAnalyticsDashboard"),
      t("emailChatSupport"),
      t("mobileAppAccess"),
      t("upTo5000Products"),
      t("customBranding"),
    ],
  };

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPlans();
        if (response.success && response.data) {
          setPlans(response.data);
        } else {
          setError(response.message || t("failedToLoadPlans"));
          // Keep using mock data as fallback
        }
      } catch (err) {
        console.error("Error loading plans:", err);
        setError(t("failedToLoadPlansShowingDefault"));
        // Keep using mock data as fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = (plan: plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const getPlanIcon = (type: string) => {
    if (type === "annual") return <Zap className="h-5 w-5" />;
    if (type === "monthly") return <Star className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  const formatPrice = (price: string, currency: string, duration: number) => {
    const monthlyPrice = (parseFloat(price) / (duration / 30)).toFixed(0);
    return { total: price, monthly: monthlyPrice, currency };
  };

  // Show loading state
  if (isLoading) {
    return <PlansLoading />;
  }

  return (
    <div className="wrapper min-h-screen py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("chooseYourPlan")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("selectPerfectPlanDescription")}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans
            .filter((plan) => plan.is_active)
            .map((plan) => {
              const { total, monthly, currency } = formatPrice(
                plan.price,
                plan.currency,
                plan.duration_in_days
              );
              const features = planFeatures[plan.type] || [];

              return (
                <Card
                  key={plan.id}
                  className={`relative p-0 !gap-0 transition-all duration-300 hover:shadow-xl ${
                    plan.is_default
                      ? "border-primary shadow-lg scale-105 border-2"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {/* Default Badge */}
                  {plan.is_default && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold shadow-lg">
                        ⭐ {t("mostPopular")}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-8">
                    {/* Icon */}
                    <div
                      className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                        plan.is_default
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {getPlanIcon(plan.type)}
                    </div>

                    {/* Plan Type */}
                    <h3 className="text-2xl font-bold capitalize mb-2 text-gray-900 dark:text-white">
                      {plan.type}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {total}
                        </span>
                        <span className="text-xl text-muted-foreground">
                          {currency}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {monthly} {currency}/{t("perMonth")} •{" "}
                        {plan.duration_in_days} {t("days")}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    {/* Features List */}
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 mt-auto">
                    <Button
                      onClick={() => handleSubscribe(plan)}
                      className="w-full"
                      size="lg"
                      variant={plan.is_default ? "default" : "outline"}
                    >
                      {t("subscribeNow")}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t("needHelpChoosingPlan")}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t("contactSalesDescription")}
          </p>
          <Button variant="outline" asChild>
            <a href="/contact-us">{t("contactSales")}</a>
          </Button>
        </div>
      </div>

      {/* Subscription Modal */}
      {selectedPlan && (
        <PlanSubscriptionModal
          plan={selectedPlan}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null);
          }}
        />
      )}
    </div>
  );
};

export default PlansPage;
