import { getSiteInformation } from "@/lib/api/apiSiteInfo";
import { APP_NAME } from "@/lib/constants";
import { siteInformationT } from "@/types";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import getLocaleStrings, { getLocale } from "@/localization";

const Footer = async () => {
  const locale = await getLocaleStrings();
  const lang = await getLocale();
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
            <h4 className="title">{locale.support}</h4>

            <div className="space-y-3">
              <div>{siteInfo.address}</div>
              <div>{siteInfo.email}</div>
              <div>{siteInfo.phone}</div>
            </div>
          </div>

          <div className="menu">
            <h4 className="title">{locale.account}</h4>
            <div className="space-y-3">
              <Link href="/signin" className="">
                {locale.signInRegister}
              </Link>
              <Link href="/cart" className="">
                {locale.cart}
              </Link>
              <Link href="/favorites" className="">
                {locale.wishlist}
              </Link>
            </div>
          </div>

          <div className="menu">
            <h4 className="title">{locale.quickLink}</h4>
            <div className="space-y-3">
              <Link href="/privacy-policy" className="">
                {locale.privacyPolicy}
              </Link>
              <Link href="/terms-of-service" className="">
                {locale.termsOfService}
              </Link>
              <Link href="/faq" className="">
                {locale.faq}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-xl font-medium">{locale.downloadApp}</h4>

            <div className="!space-y-2">
              <div className="flex gap-3">
                <div className="flex items-center flex-col gap-1 min-h-[36px]">
                  {siteInfo.google_play_link && (
                    <Link
                      href={siteInfo.google_play_link}
                      className="overflow-hidden block w-24 h-9"
                      aria-label={
                        lang === "ar"
                          ? "تحميل من جوجل بلاي"
                          : "Download on Google Play"
                      }
                    >
                      <Image
                        src="/images/logos/googlePlay.png"
                        width={96}
                        height={36}
                        alt="Download on Google Play"
                        className="w-24 h-9 object-contain bg-black rounded-lg"
                        priority={false}
                        loading="lazy"
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
                <div className="flex items-center flex-col gap-1 min-h-[36px]">
                  {siteInfo.app_store_link && (
                    <Link
                      href={siteInfo.app_store_link}
                      className="overflow-hidden block w-24 h-9"
                      aria-label={
                        lang === "ar"
                          ? "تحميل من آب ستور"
                          : "Download on App Store"
                      }
                    >
                      <Image
                        src="/images/logos/appStore.png"
                        width={96}
                        height={36}
                        alt="Download on App Store"
                        className="w-24 h-9 object-contain bg-black rounded-lg"
                        priority={false}
                        loading="lazy"
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
                <Link
                  href={siteInfo.Linkein_link}
                  aria-label={lang === "ar" ? "لينكد إن" : "LinkedIn"}
                >
                  <Linkedin />
                </Link>
              )}
              {siteInfo.instagram_link && (
                <Link
                  href={siteInfo.instagram_link}
                  aria-label={lang === "ar" ? "إنستجرام" : "Instagram"}
                >
                  <Instagram />
                </Link>
              )}
              {siteInfo.twitter_link && (
                <Link
                  href={siteInfo.twitter_link}
                  aria-label={lang === "ar" ? "تويتر" : "Twitter"}
                >
                  <Twitter />
                </Link>
              )}
              {siteInfo.facebook_link && (
                <Link
                  href={siteInfo.facebook_link}
                  aria-label={lang === "ar" ? "فيسبوك" : "Facebook"}
                >
                  <Facebook />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex-center border-t">
        {currentYear} &copy; {APP_NAME}. {locale.allRightsReserved}.
      </div>
    </footer>
  );
};

export default Footer;
