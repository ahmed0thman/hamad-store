"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, useTransition } from "react";
import StarRating from "../starRating";
import { Cart, OrderDetailsItem, Product } from "@/types";
import { CartItem } from "@/types";
import { rateProduct } from "@/lib/api/apiProducts";
import { toast } from "sonner";
import { CheckCircle, OctagonX } from "lucide-react";
import SpinnerMini from "../SpinnerMini";
import { revalidate } from "@/lib/api/actions";
import { useTranslation } from "@/hooks/useTranslation";

const RatingDialog = ({
  product_id,
  product_name,
}: {
  product_id: number;
  product_name: string;
}) => {
  const [ratings, setRatings] = useState<number>(0);
  const [comments, setComments] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleClose = () => {
    setRatings(0);
    setComments("");
    setErrors({});
    setOpen(false);
  };

  const handleRateSubmit = () => {
    setErrors({}); // Reset errors
    if (ratings <= 0) {
      setErrors((prev) => ({
        ...prev,
        ratings: t("pleaseSelectRating"),
      }));
      return;
    }
    if (comments.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        comments: t("pleaseAddComment"),
      }));
      return;
    }
    startTransition(async () => {
      const response = await rateProduct(product_id.toString(), {
        rating: ratings,
        comment: comments,
      });
      if (response.success) {
        revalidate(`/product/${product_id}`);
        toast(
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{t("thankYouForFeedback")}</span>
          </div>
        );
        handleClose();
      } else {
        toast(
          <div className="flex items-center gap-2">
            <OctagonX className="h-4 w-4 text-red-500" />
            <span>{t("failedToSubmitFeedback")}</span>
          </div>
        );
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          size="sm"
          className="rounded-full bg-muted"
        >
          {t("addRating")}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary">
        <DialogTitle>
          {t("rate")} {product_name}
        </DialogTitle>
        <div className="flex-center">
          <StarRating
            readOnly={false}
            value={ratings}
            onChange={(v) => setRatings(v)}
          />
        </div>
        {errors.ratings && (
          <p className="text-red-500 text-sm mt-2">{errors.ratings}</p>
        )}
        <textarea
          placeholder={t("addComment")}
          className="w-full mt-4 p-2 border rounded"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        {errors.comments && (
          <p className="text-red-500 text-sm mt-2">{errors.comments}</p>
        )}

        <Button className="mt-4" onClick={handleRateSubmit}>
          {pending ? <SpinnerMini /> : t("submitRating")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
