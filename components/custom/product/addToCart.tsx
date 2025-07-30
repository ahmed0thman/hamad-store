"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  async function handleAddToCart() {
    // Logic to add item to cart
    toast.success("Item added to cart successfully!", {
      action: {
        label: "View Cart",
        onClick: () => {
          router.push("/cart");
        },
      },
    });
  }
  return (
    <Button
      type="button"
      variant="default"
      className="w-full "
      onClick={handleAddToCart}
    >
      <Plus className="w-5 h-5" />
      أضف إلى العربة
    </Button>
  );
};

export default AddToCart;
