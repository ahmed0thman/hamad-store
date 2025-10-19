"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Package, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { OrderDetailsItem } from "@/types";
import FileDropzone from "@/components/custom/FileDropzone";

interface RefundRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: OrderDetailsItem[];
  orderId: number;
  onRemoveItem: (item: OrderDetailsItem) => void;
  currency?: string;
  onSubmitSuccess?: () => void;
}

export default function RefundRequestDialog({
  open,
  onOpenChange,
  items,
  orderId,
  onRemoveItem,
  currency = "EGP",
  onSubmitSuccess,
}: RefundRequestDialogProps) {
  const [reason, setReason] = useState("");
  const [itemImages, setItemImages] = useState<
    Record<number, { file: File; preview: string }>
  >({});

  const subtotal = items.reduce((sum, item) => sum + Number(item.total), 0);

  const handleImageAdd = (
    productId: number,
    filesMeta: Array<{
      id: string;
      file: File;
      name: string;
      size: number;
      type: string;
      extension: string;
    }>
  ) => {
    if (filesMeta.length > 0) {
      const { file } = filesMeta[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setItemImages((prev) => ({
          ...prev,
          [productId]: {
            file,
            preview: e.target?.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (productId: number) => {
    setItemImages((prev) => {
      const newImages = { ...prev };
      delete newImages[productId];
      return newImages;
    });
  };

  const handleSubmit = async () => {
    // TODO: Implement API call to submit refund request
    console.log("Submitting refund request:", {
      orderId,
      items: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        image: itemImages[item.product_id]?.file || null,
      })),
      reason,
      itemImages,
    });

    // Call onSubmitSuccess callback to clear localStorage
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }

    // Close dialog after submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" !w-10/12 !max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Refund Request</DialogTitle>
          <DialogDescription>Order #{orderId}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Items Cards */}
          <div>
            <h2 className="text-lg font-medium mb-3">Items to Refund</h2>
            {items.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No items selected
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Add items from your order to request a refund
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Card key={item.product_id} className="overflow-hidden p-0">
                    <CardContent className="p-4">
                      <div className="flex flex-col justify-between gap-4">
                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-medium text-base">
                            {item.product_name}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {/* Quantity */}
                            <div className="flex items-center gap-1.5">
                              <Package className="h-4 w-4" />
                              <span>Qty: {item.quantity}</span>
                            </div>

                            {/* Unit Price */}
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4" />
                              <span>
                                {formatCurrency(
                                  Number(item.unit_price),
                                  currency
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Total Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Total:</span>
                            <span className="text-lg font-bold">
                              {formatCurrency(Number(item.total), currency)}
                            </span>
                          </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Proof Image (Optional)
                          </label>
                          {itemImages[item.product_id] ? (
                            <div className="relative border rounded-lg p-2">
                              <Image
                                src={itemImages[item.product_id].preview}
                                alt="Proof"
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                onClick={() =>
                                  handleImageRemove(item.product_id)
                                }
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <FileDropzone
                              onAdd={(
                                files: Array<{
                                  id: string;
                                  file: File;
                                  name: string;
                                  size: number;
                                  type: string;
                                  extension: string;
                                }>
                              ) => handleImageAdd(item.product_id, files)}
                              accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                              maxSizeMB={5}
                              label="Upload image"
                              multiple={false}
                              Icon={Upload}
                              className="!h-24"
                            />
                          )}
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item)}
                          className="rounded-full bg-muted hover:bg-destructive/10 hover:text-destructive block flex-center ms-auto sm:self-center"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Refund Reason */}
          <div>
            <h2 className="text-lg font-medium mb-3">Refund Reason</h2>
            <Textarea
              placeholder={`Why are you requesting a refund for ${items
                .map((i) => i.product_name)
                .join(", ")}?`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Refund Summary */}
          <div>
            <h2 className="text-lg font-medium mb-3">Refund Summary</h2>
            <div className="space-y-2 bg-muted p-4 rounded-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Estimated Refund</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={items.length === 0 || !reason.trim()}
          >
            Submit Refund Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
