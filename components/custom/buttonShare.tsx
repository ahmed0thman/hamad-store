"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Copy, Facebook, Share2, Twitter } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const ButtonShare = () => {
  const { t } = useTranslation();

  const openSocial = (url: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      // fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      toast.custom(() => (
        <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md shadow-md">
          <Copy className="w-4 h-4 text-green-500" />
          <span className="text-sm">
            {t("linkCopied") || "Link copied to clipboard"}
          </span>
        </div>
      ));
    }
  };

  const handleShareAction = async () => {
    const url = window.location.href;
    const title = document.title || t("shareProduct") || "";
    const text = t("shareText") || "";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        toast.custom(() => (
          <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md shadow-md">
            <Share2 className="w-4 h-4 text-green-500" />
            <span className="text-sm">
              {t("sharedSuccessfully") || "Shared"}
            </span>
          </div>
        ));
        return;
      } catch (err) {
        toast.custom(() => (
          <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md shadow-md">
            <Copy className="w-4 h-4 text-red-500" />
            <span className="text-sm">
              {t("shareFailed") || "Unable to share"}
            </span>
          </div>
        ));
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      toast.custom(() => (
        <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md shadow-md">
          <Copy className="w-4 h-4 text-green-500" />
          <span className="text-sm">
            {t("linkCopied") || "Link copied to clipboard"}
          </span>
        </div>
      ));
    } catch (err) {
      toast.custom(() => (
        <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md shadow-md">
          <Copy className="w-4 h-4 text-red-500" />
          <span className="text-sm">
            {t("copyFailed") || "Unable to copy link"}
          </span>
        </div>
      ));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-100 text-primary dark:hover:bg-slate-800"
            aria-label={t("shareProduct")}
          >
            <Share2 className="!w-7 !h-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 p-2">
          <DropdownMenuItem
            className="text-blue-600"
            onClick={() =>
              openSocial(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`
              )
            }
          >
            <Facebook className="w-4 h-4 mr-2" />{" "}
            {t("shareOnFacebook") || "Share on Facebook"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sky-500"
            onClick={() =>
              openSocial(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  document.title || ""
                )}&url=${encodeURIComponent(window.location.href)}`
              )
            }
          >
            <Twitter className="w-4 h-4 mr-2" />{" "}
            {t("shareOnTwitter") || "Share on Twitter"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-muted-foreground"
            onClick={() => {
              handleShareAction();
            }}
          >
            <Copy className="w-4 h-4 mr-2" />{" "}
            {t("copyLink") || "Share / Copy Link"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ButtonShare;
