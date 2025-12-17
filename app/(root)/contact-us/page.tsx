"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactMessageSchema } from "@/lib/validators";
import { contactMessageT, siteInformationT } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { sendContactMessage } from "@/lib/api/apiPublic";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getSiteInformation } from "@/lib/api/apiSiteInfo";
import Spinner from "@/components/custom/spinner";
import { useTranslation } from "@/hooks/useTranslation";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteInfo, setSiteInfo] = useState<siteInformationT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSiteInfo = async () => {
      const sitInfoResponse = await getSiteInformation();
      if (sitInfoResponse.success && sitInfoResponse.data) {
        setSiteInfo(sitInfoResponse.data[0]);
      }
      setIsLoading(false);
    };
    fetchSiteInfo();
  }, []);

  const form = useForm<contactMessageT>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: contactMessageT) => {
    setIsSubmitting(true);
    try {
      const response = await sendContactMessage(data);
      if (response.success) {
        toast.success(response.message || t("messageSentSuccess"));
        form.reset();
      } else {
        toast.error(response.message || t("messageFailedToSend"));
      }
    } catch (error) {
      toast.error(t("errorSendingMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="wrapper">
        <div className="py-12 flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="wrapper">
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="rounded-2xl bg-muted/50 p-6 space-y-8 shadow-sm">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold">{t("callUs")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("availableAllWeek")}
            </p>
            {siteInfo?.phone && (
              <p className="text-muted-foreground text-sm">
                {t("phone")}: {siteInfo.phone}
              </p>
            )}
          </div>
          <hr />
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold">{t("writeToUs")}</h2>
            <p className="text-muted-foreground text-sm">
              {t("fillFormAndGetReply")}
            </p>
            {siteInfo?.email && (
              <p className="text-muted-foreground text-sm">
                {t("email")}: {siteInfo.email}
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2 rounded-2xl bg-muted/50 px-6 py-10 space-y-4 shadow-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col h-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("yourName")}
                          className="bg-white dark:bg-gray-800"
                          {...field}
                        />
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
                      <FormControl>
                        <Input
                          placeholder={t("yourEmail")}
                          className="bg-white dark:bg-gray-800"
                          type="email"
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
                      <FormControl>
                        <Input
                          placeholder={t("yourPhone")}
                          className="bg-white dark:bg-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Textarea
                        placeholder={t("yourMessage")}
                        rows={20}
                        className="flex-grow-1 h-full min-h-[220px] bg-white dark:bg-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="rounded-xl px-6 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("sending") : t("sendMessage")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
