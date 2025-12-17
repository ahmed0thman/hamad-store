"use client";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSearchProducts } from "@/lib/api/apiProducts";
import { category, ProductItem } from "@/types";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const HeaderSearch = ({ categories }: { categories: category[] }) => {
  const [isPending, searchTransitionStart] = useTransition();
  const [categoryId, setCategoryId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  async function handleSearch(categoryId: string, keyword: string) {
    const result = await getSearchProducts(categoryId, keyword);
    if (result.success && result.data && result.data.length > 0) {
      setProducts(result.data);
    }
    if (result.empty) {
      setProducts([]);
    }
  }

  useEffect(
    function () {
      if (isItemSelected) {
        setIsItemSelected(false);
        return;
      }
      if (keyword.trim() === "") {
        setProducts([]);
        setShowModalSearch(false);
        return;
      }
      const category = categoryId === "all" ? "" : categoryId;
      setShowModalSearch(true);
      searchTransitionStart(() => handleSearch(category, keyword));
    },
    [categoryId, keyword]
  );

  return (
    <div className="relative">
      <button
        className="text-gray-800 dark:text-gray-400 fixed z-10 top-[14px] start-12 sm:hidden"
        onClick={() => setShowSearch(!showSearch)}
      >
        {showSearch ? (
          <X className="w-5 h-5" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </button>
      <div
        className={`!border-primary border rounded-md bg-secondary h-9 md:h-10 sm:!flex flex-center overflow-hidden ${
          showSearch ? "" : "!hidden "
        }`}
      >
        <div className="flex-center py-2 flex-grow-1">
          <Select
            onValueChange={(value) => {
              setCategoryId(value);
            }}
            value={categoryId || "all"}
          >
            <SelectTrigger className="!text-froreground !bg-transparent w-36 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 ">
              <SelectValue
                placeholder={t("allCategories")}
                className="text-gray-500"
              />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
              <SelectGroup>
                <SelectLabel>{t("categories")}</SelectLabel>
                <SelectItem value="all">{t("allCategories")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id.toString()}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="text"
            className="h-full !bg-transparent shadow-none border-0 border-s !border-stone-300 dark:!border-stone-700 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 leading-0 !text-base text-gray-700 dark:text-gray-300"
            placeholder={t("searchForProducts")}
            onChange={(e) => {
              setKeyword(e.target.value.trim());
            }}
            value={keyword}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (keyword.trim() === "") return;
                router.push(
                  `/products?category=${categoryId}&keyword=${keyword}`
                );
                setShowModalSearch(false);
              }
            }}
          />
        </div>
        <Button
          onClick={() => {
            if (keyword.trim() === "") return;
            router.push(`/products?category=${categoryId}&keyword=${keyword}`);
            setShowModalSearch(false);
          }}
          className="h-full rounded-sm shadow-none"
        >
          <Search />
        </Button>
      </div>
      {/* Search Results */}
      {showModalSearch && (
        <>
          <div
            className="fixed z-10 top-18 left-0 w-screen h-screen right-0 mt-2  bg-background/10 shadow-lg backdrop-blur-sm"
            onClick={() => setKeyword("")}
          ></div>
          <div className="absolute z-20 top-8 left-0 right-0 mt-2 rounded-md bg-background/30 shadow-lg overflow-hidden border backdrop-blur-sm">
            {isPending ? (
              <div className="flex-center py-4">
                <SpinnerMini />
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <div className="bg-background/90 py-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products?category=${categoryId}&keyword=${product.name}`}
                        className=""
                        onClick={() => {
                          setIsItemSelected(true);
                          setKeyword(product.name);
                          setShowModalSearch(false);
                        }}
                      >
                        <div className="font-semibold flex items-center gap-2 hover:bg-muted px-3 py-2 cursor-pointer">
                          <Search className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">{product.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-gray-500 bg-background">
                    {t("noResultsFound")}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderSearch;
