"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exchangeWalletPoints } from "@/lib/api/apiWallet";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SpinnerMini from "../SpinnerMini";
import { revalidate } from "@/lib/api/actions";

interface ExchangePointsModalProps {
  availablePoints: number;
}

const ExchangePointsModal = ({ availablePoints }: ExchangePointsModalProps) => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExchange = async () => {
    const pointsToExchange = Number(points);

    if (!points || pointsToExchange <= 0) {
      toast.error("الرجاء إدخال عدد صحيح من النقاط");
      return;
    }

    if (pointsToExchange > availablePoints) {
      toast.error("ليس لديك نقاط كافية");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await exchangeWalletPoints(pointsToExchange);
      if (response.success) {
        toast.success("تم تحويل النقاط بنجاح!");
        setOpen(false);
        setPoints("");
        revalidate("/account/wallet");
      } else {
        toast.error(response.message || "فشل تحويل النقاط");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحويل النقاط");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          تحويل النقاط
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تحويل النقاط إلى المحفظة</DialogTitle>
          <DialogDescription>
            قم بتحويل نقاطك المتاحة إلى رصيد المحفظة. النقاط المتاحة:{" "}
            <span className="font-bold">{availablePoints}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="points">النقاط المراد تحويلها</Label>
            <Input
              id="points"
              type="number"
              placeholder="أدخل عدد النقاط"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              min="1"
              max={availablePoints}
            />
          </div>
          {/* {points && Number(points) > 0 && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                سوف تحصل على:{" "}
                <span className="font-bold text-foreground">
                  {Number(points)} جنيه
                </span>
              </p>
            </div>
          )} */}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            إلغاء
          </Button>
          <Button onClick={handleExchange} disabled={isSubmitting}>
            {isSubmitting ? <SpinnerMini /> : "تحويل"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangePointsModal;
