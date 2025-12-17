"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { revalidate } from "@/lib/api/actions";
import { addToFavorites, removeFromFavorites } from "@/lib/api/apiFavorites";
import { Heart } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ButtonFavorite = ({
  inFavorites,
  productId,
}: {
  inFavorites: boolean;
  productId: number;
}) => {
  const [addedToFavorites, setAddedToFavorites] = React.useState(inFavorites);
  const router = useRouter();
  const pathName = usePathname();
  const [resAdd, actionAdd] = useActionState(addToFavorites, {
    success: false,
    message: "",
    data: null,
    notAuthenticated: false,
  });

  const [resRemove, actionRemove] = useActionState(removeFromFavorites, {
    success: false,
    message: "",
    data: null,
    notAuthenticated: false,
  });
  const { t } = useTranslation();

  useEffect(
    function () {
      if (resAdd.success) {
        setAddedToFavorites(true);
        toast.success(t("addedToFavorites"));
        if (pathName === "/favorites") {
          revalidate("/favorites");
        } else if (pathName.startsWith("/product/")) {
          revalidate(`/product/${productId}`);
        }
      }
    },
    [resAdd]
  );

  useEffect(
    function () {
      if (resRemove.success) {
        setAddedToFavorites(false);
        toast.success(t("removedFromFavorites"));
        revalidate("/favorites");
      }
    },
    [resRemove]
  );

  useEffect(
    function () {
      if (resAdd.notAuthenticated || resRemove.notAuthenticated) {
        toast.error(t("needLoginToManageFavorites"), {
          action: {
            label: t("login"),
            onClick: () => {
              router.push(`/signin?callbackUrl=${pathName}`);
            },
          },
        });
      }
    },
    [resAdd, resRemove]
  );
  return (
    <form action={addedToFavorites ? actionRemove : actionAdd}>
      <input type="hidden" name="productId" value={productId} />
      <Button
        variant="ghost"
        size="icon"
        className="!text-red-500  hover:bg-red-100 dark:hover:bg-red-900"
        aria-label={addedToFavorites ? t("removeFromFavorites") : t("addToFavorites")}
      >
        <Heart fill={addedToFavorites ? "red" : "none"} className="!w-6 !h-6" />
      </Button>
    </form>
  );
};

export default ButtonFavorite;
