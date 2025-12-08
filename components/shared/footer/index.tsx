import { getSiteInformation } from "@/lib/api/apiSiteInfo";
import { APP_NAME } from "@/lib/constants";
import { siteInformationT } from "@/types";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const sitInfoResponse = await getSiteInformation();
  const siteInfo = (sitInfoResponse.data as siteInformationT[])?.[0];
  if (!siteInfo) {
    return null;
  }
  return (
    <footer>
      <div className="wrapper">
        <div className="menus-wrapper">
          <div className="menu">
            <h4 className="title">الدعم</h4>

            <div className="space-y-3">
              <div>{siteInfo.address}</div>
              <div>{siteInfo.email}</div>
              <div>{siteInfo.phone}</div>
            </div>
          </div>

          <div className="menu">
            <h4 className="title">الحساب</h4>
            <div className="space-y-3">
              <Link href="/signin" className="">
                تسجيل الدخول / التسجيل
              </Link>
              <Link href="/cart" className="">
                العربة
              </Link>
              <Link href="/favorites" className="">
                قائمة الرغبات
              </Link>
            </div>
          </div>

          <div className="menu">
            <h4 className="title">رابط سريع</h4>
            <div className="space-y-3">
              <Link href="/privacy-policy" className="">
                سياسة الخصوصية
              </Link>
              <Link href="/terms-of-service" className="">
                شروط الاستخدام
              </Link>
              <Link href="/faq" className="">
                الأسئلة الشائعة
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-medium">تحميل التطبيق</h4>

            <div className="!space-y-2">
              <div className="flex gap-3">
                <div className="flex items-center flex-col gap-1">
                  {siteInfo.google_play_link && (
                    <Link
                      href={siteInfo.google_play_link}
                      className="overflow-hidden"
                    >
                      <Image
                        src="/images/logos/googlePlay.png"
                        width={90}
                        height={36}
                        alt=""
                        className="w-24 h-9 object-contain bg-black rounded-lg"
                      />
                    </Link>
                  )}
                  {/* <Image
                    src="/images/uploads/qr-code.jpg"
                    width={80}
                    height={80}
                    alt=""
                    className="w-20 p-1 bg-white"
                  /> */}
                </div>
                <div className="flex items-center flex-col gap-1">
                  {siteInfo.app_store_link && (
                    <Link
                      href={siteInfo.app_store_link}
                      className="overflow-hidden"
                    >
                      <Image
                        src="/images/logos/appStore.png"
                        width={90}
                        height={36}
                        alt=""
                        className="w-24 h-9 object-contain bg-black rounded-lg"
                      />
                    </Link>
                  )}
                  {/* <Image
                    src="/images/uploads/qr-code.jpg"
                    width={80}
                    height={80}
                    alt=""
                    className="w-20 p-1 bg-white"
                  /> */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 px-4">
              {siteInfo.Linkein_link && (
                <Link href={siteInfo.Linkein_link}>
                  <Linkedin />
                </Link>
              )}
              {siteInfo.instagram_link && (
                <Link href={siteInfo.instagram_link}>
                  <Instagram />
                </Link>
              )}
              {siteInfo.twitter_link && (
                <Link href={siteInfo.twitter_link}>
                  <Twitter />
                </Link>
              )}
              {siteInfo.facebook_link && (
                <Link href={siteInfo.facebook_link}>
                  <Facebook />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex-center border-t">
        {currentYear} &copy; {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
