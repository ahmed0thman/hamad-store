"use client";

import { Button } from "@/components/ui/button";
import { CartData } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { addToCart, removeCartItem, updateCartItem } from "@/lib/api/apiCart";
import { useFormStatus } from "react-dom";
import SpinnerMini from "../SpinnerMini";
import { set } from "zod";

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
  revalidate,
  cart,
  stock,
}: {
  productId: number;
  token: string | undefined;
  revalidate: (path: string) => void;
  cart: CartData | null | undefined;
  stock: number;
}) => {
  const [formRes, actionAdd] = useActionState(addToCart, {
    success: false,
    message: "",
    data: null,
    notAuthenticated: false,
  });
  const [updateRes, actionUpdate] = useActionState(updateCartItem, {
    success: false,
    message: "",
    data: null,
    notAuthenticated: false,
  });
  const [removeRes, actionRemove] = useActionState(removeCartItem, {
    success: false,
    message: "",
    data: null,
    notAuthenticated: false,
  });
  const pathName = usePathname();
  const router = useRouter();
  const [inCart, setInCart] = useState(false);
  const [inCartCount, setInCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(
    function () {
      if (formRes && formRes.success) {
        setInCart(true);
        revalidate(pathName);
        toast.success("Item added to cart successfully", {
          action: {
            label: "View Cart",
            onClick: () => {
              router.push("/cart");
            },
          },
        });
      }
    },
    [formRes, pathName, router]
  );

  useEffect(
    function () {
      if (updateRes && updateRes.success) {
        revalidate(pathName);
        toast.success("Item updated in cart successfully", {
          action: {
            label: "View Cart",
            onClick: () => {
              router.push("/cart");
            },
          },
        });
      }
    },
    [updateRes, pathName, router]
  );

  useEffect(
    function () {
      if (removeRes && removeRes.success) {
        setInCart(false);
        toast.success("Item removed from cart successfully", {
          action: {
            label: "View Cart",
            onClick: () => {
              router.push("/cart");
            },
          },
        });
        revalidate(pathName);
      }
    },
    [removeRes, pathName, router]
  );

  useEffect(
    function () {
      if (cart && cart.pharmacies) {
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
    [cart, productId]
  );

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
        <form action={inCartCount > 1 ? actionUpdate : actionRemove}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="quantity" value={inCartCount - 1} />
          <input type="hidden" name="token" value={token} />
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-lg text-red-500 hover:bg-red-100"
          >
            -
          </Button>
        </form>
        <span className="text-sm font-medium w-6 text-center dark:text-white">
          {inCartCount}
        </span>
        {inCartCount < stock && (
          <form action={actionUpdate}>
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="quantity" value={inCartCount + 1} />
            <input type="hidden" name="token" value={token} />
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-lg text-green-600 hover:bg-green-100"
            >
              +
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <form action={actionAdd}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={1} />
      <input type="hidden" name="token" value={token} />
      <Button type="submit">
        <ButtonSubmit>
          <Plus className="w-5 h-5" />
          أضف إلى العربة
        </ButtonSubmit>
      </Button>
    </form>
  );
};

export default AddToCart;
