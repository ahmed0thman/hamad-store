"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrencyEGP } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import React from "react";
import AddToCart from "./addToCart";
import { Product } from "@/types";

const ProductAddCart = ({ product }: { product: Product }) => {
  const stock = 3;
  const price = product.offer ? product.offer.price_after : product.price;
  return (
    <Card className="p-0">
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between">
          <div>Price</div>
          <div>{formatCurrencyEGP(price)}</div>
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
            <AddToCart
              item={{
                productId: "1",
                name: "Product 1",
                slug: "product-1",
                quantity: 1,
                image: "https://via.placeholder.com/150",
                unitPrice: "100.00",
                totalPrice: "100.00",
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductAddCart;
