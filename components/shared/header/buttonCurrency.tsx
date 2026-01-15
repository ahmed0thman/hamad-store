"use client";

import { getCurrencies, getCurrency, setCurrency } from "@/lib/api/apiPublic";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { currencyT } from "@/types";
import { updateUserCurrency } from "@/lib/api/apiUser";
import { useRouter } from "next/navigation";
import { revalidateAll } from "@/lib/api/actions";

const ButtonCurrency = () => {
  const router = useRouter();
  const [currencies, setCurrencies] = useState<currencyT[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const currenciesResponse = await getCurrencies();
      if (currenciesResponse.success) {
        const currenciesData = currenciesResponse.data as currencyT[];
        setCurrencies(currenciesData);
        // find default currency from cookies
        const currencyCookie = await getCurrency();
        console.log("currency in cookie:", currencyCookie);
        if (currencyCookie) {
          setSelected(currencyCookie);
          await updateUserCurrency(currencyCookie);
        } else {
          // find the is_default currency
          const defaultCurrency = currenciesData.find(
            (currency) => currency.is_default
          );
          if (defaultCurrency) {
            setSelected(defaultCurrency.code);
          } else {
            setSelected(currenciesData[0].code);
          }
        }
      }
    });
  }, []);

  if (isPending && currencies.length === 0) {
    return <SpinnerMini />;
  }

  if (!currencies.length) {
    return null;
  }

  const onChangeCurrency = (currencyCode: string) => {
    setSelected(currencyCode);
    // set currency in cookies without overriding other cookies
    // document.cookie = `currency=${currencyCode}; path=/; max-age=31536000`;
    startTransition(async () => {
      await Promise.all([
        setCurrency(currencyCode),
        updateUserCurrency(currencyCode),
      ]);
      // Revalidate all cached paths so they refetch with new currency
      await revalidateAll();
      // Refresh current route and reload
      router.refresh();
      window.location.reload();
    });
  };
  return (
    <Select value={selected} onValueChange={onChangeCurrency}>
      <SelectTrigger className="border-0 shadow-none font-medium">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ButtonCurrency;
