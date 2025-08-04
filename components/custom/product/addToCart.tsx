"use client";

import { Button } from "@/components/ui/button";
import { revalidate } from "@/lib/api/actions";
import { addToCart, removeCartItem, updateCartItem } from "@/lib/api/apiCart";
import { CartData } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import SpinnerMini from "../SpinnerMini";

const ButtonSubmit = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  if (pending) return <SpinnerMini />;

  return <>{children}</>;
};

// --------  AddToCart Component --------
// This component handles adding products to the cart

const AddToCart = ({
  productId,
  token,
  cart,
  stock,
  refreshCart,
}: {
  productId: number;
  token: string | undefined;
  cart: CartData | null | undefined;
  stock: number;
  refreshCart?: () => void;
}) => {
  const pathName = usePathname();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [inCart, setInCart] = useState(false);
  const [inCartCount, setInCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(
    function () {
      if (cart && cart.pharmacies && status === "authenticated") {
        setInCart(
          cart.pharmacies.some((pharmacy) => {
            const item = pharmacy.items.find(
              (item) => item.product_id === productId
            );
            if (item) {
              setInCartCount(item.quantity);
            }
            return item;
          })
        );
      }
      setMounted(true);
    },
    [cart, productId, status]
  );

  async function handleAddToCart() {
    await addToCart(productId, 1, token);
  }

  async function handlePlus() {
    const response = await updateCartItem(productId, inCartCount + 1, token);
    if (response && response.success) {
      setInCartCount((prev) => prev + 1);
      showToast("Item updated in cart successfully");
    }
    if (response && response.stockOut) {
      toast.error("Not enough stock available", {
        action: {
          label: "View Cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
      return;
    }
  }

  async function handleMinus() {
    if (inCartCount > 1) {
      await updateCartItem(productId, inCartCount - 1, token);
    } else {
      await removeCartItem(productId, token);

      setInCart(false);
    }
  }

  function showToast(message: string) {
    // console.log("pathName", pathName);
    revalidate(pathName);
    refreshCart?.();
    toast.success(message, {
      action: {
        label: "View Cart",
        onClick: () => {
          router.push("/cart");
        },
      },
    });
  }

  if (!token) {
    return (
      <Button
        onClick={() => {
          toast.warning("You are not signed in!", {
            action: {
              label: "go to sign in",
              onClick: () => {
                router.push(`/signin?callbackUrl=${pathName}`);
              },
            },
          });
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        أضف إلى العربة
      </Button>
    );
  }

  // console.log(inCart, "inCart");
  // console.log(inCartCount, "inCartCount");
  if (!mounted) {
    return <SpinnerMini />;
  }

  if (inCart) {
    return (
      <div className="flex items-center gap-2 border rounded-md px-2 py-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            startTransition(handleMinus);
            setInCartCount((prev) => Math.max(prev - 1, 0));
            showToast("Item updated in cart successfully");
          }}
          className="w-6 h-6 text-lg text-red-500 hover:bg-red-100"
          disabled={pending || inCartCount < 1}
        >
          -
        </Button>
        <span className="text-sm font-medium w-6 text-center dark:text-white">
          {pending ? <SpinnerMini /> : inCartCount}
        </span>
        {inCartCount < stock && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              startTransition(handlePlus);
            }}
            className="w-6 h-6 text-lg text-green-600 hover:bg-green-100"
            disabled={pending || inCartCount >= stock}
          >
            +
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button
        type="submit"
        onClick={() => {
          startTransition(handleAddToCart);
          setInCartCount(1);
          setInCart(true);
          showToast("Item added to cart successfully");
        }}
        disabled={pending || stock <= 0}
      >
        {pending ? (
          <SpinnerMini />
        ) : (
          <>
            <Plus className="w-5 h-5" />
            أضف إلى العربة
          </>
        )}
      </Button>
    </div>
  );
};

export default AddToCart;
