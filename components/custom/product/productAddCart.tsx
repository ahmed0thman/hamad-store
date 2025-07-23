"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrencyEGP } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import React from "react";

const ProductAddCart = () => {
  const stock = 3;
  return (
    <Card className="p-0">
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between">
          <div>Price</div>
          <div>{formatCurrencyEGP(100)}</div>
        </div>
        <div className="mb-2 flex justify-between">
          <div>Status</div>
          <div>
            {stock > 0 ? (
              <Badge variant="outline">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out Of Stock</Badge>
            )}
          </div>
        </div>
        {stock > 0 && (
          <div className="flex-center">
            <Button variant="default" className="w-full ">
              <ShoppingCart className="w-5 h-5" />
              أضف إلى العربة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductAddCart;
