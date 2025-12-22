import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getFavorites } from "@/lib/api/apiFavorites";
import { auth } from "@/lib/auth";
import { CURRENCY_CODE } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { FavoriteItem, Product, ProductItem } from "@/types";
import { Box, FileText, Layers, Scaling, Store, Tag } from "lucide-react";
import Link from "next/link";
import ButtonShare from "../buttonShare";
import RatingDialog from "../order/ratingDialog";
import TextExpander from "../textExpander";
import ButtonAddToCompare from "./buttonAddToCompare";
import ButtonFavorite from "./buttonFavorite";
import ProductAddCart from "./productAddCart";
import ProductImages from "./productImage";
import getLocaleStrings, { getLocale } from "@/localization";

const ProductMainInfo = async ({ product }: { product: Product }) => {
  const locale = await getLocaleStrings();
  const lang = await getLocale();
  const session = await auth();
  // let favorites: FavoriteItem[] | null = null;
  let inFavorites = false;
  if (session && session.user) {
    const res = await getFavorites();
    if (res && res.success && !res.empty) {
      const favorites = res.data as ProductItem[];
      inFavorites = favorites.some((item) => item.id === product.id);
    }
  }

  return (
    <section className="wrapper grid grid-cols-1 sm:grid-cols-5 gap-8 items-start">
      {/* Product Image */}
      <ProductImages images={product.gallery} />

      <div className="col-span-1 sm:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Product Text Info */}
        <div className="space-y-6 sm:col-span-2">
          {/* Store Link */}
          <Button asChild variant="link" className="mb-2">
            <Link href={`/store/${product.pharmacy.id}`}>
              <Store />
              {product.pharmacy.name}
            </Link>
          </Button>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-200">
            {product.name}
          </h1>

          <div className="flex gap-2 items-center ">
            {product.offer ? (
              <>
                <span className="line-through text-gray-600 dark:text-gray-400">
                  {formatCurrency(
                    product.offer.price_before,
                    product.currency_symbol || CURRENCY_CODE
                  )}
                </span>
                <span className="text-primary font-semibold text-2xl">
                  {formatCurrency(
                    product.offer.price_after,
                    product.currency_symbol || CURRENCY_CODE
                  )}
                </span>
              </>
            ) : (
              <span className="text-primary font-semibold text-2xl">
                {formatCurrency(
                  product.price,
                  product.currency_symbol || CURRENCY_CODE
                )}
              </span>
            )}
          </div>

          <TextExpander content={product.description} />

          <div className="flex flex-wrap gap-3">
            {session?.user && session.user.is_doctor && (
              <RatingDialog
                product_id={product.id}
                product_name={product.name}
              />
            )}
            <ButtonAddToCompare id={product.id}>
              <Button variant="outline" className="flex items-center gap-2">
                <Scaling className="w-5 h-5" />
                {locale.addToCompare}
              </Button>
            </ButtonAddToCompare>

            <div className="flex justify-end gap-2 mb-2">
              <ButtonShare />
              <ButtonFavorite
                inFavorites={inFavorites}
                productId={product.id}
              />
            </div>
          </div>
        </div>

        <div>
          <ProductAddCart product={product} />
        </div>
      </div>
      <div className="col-span-full">
        <h3 className="text-xl font-semibold mt-6 mb-2">
          {locale.productDetails}
        </h3>
        {/* Product detailed info table */}
        <Table className="w-full border bg-muted/20">
          <TableBody className="divide-y text-base">
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <FileText className="w-4 h-4" />
                {locale.genericName}
              </TableCell>
              <TableCell className="font-medium">
                {product.generic_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Layers className="w-4 h-4" />
                {locale.category}
              </TableCell>
              <TableCell className="font-medium">
                {product.category.name[lang === "ar" ? "ar" : "en"]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Tag className="w-4 h-4" />
                {locale.brand}
              </TableCell>
              <TableCell className="font-medium">
                {product.brand.name[lang === "ar" ? "ar" : "en"]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Tag className="w-4 h-4" />
                {locale.productType}
              </TableCell>
              <TableCell className="font-medium">{product.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Box className="w-4 h-4" />
                {locale.form}
              </TableCell>
              <TableCell className="font-medium">{product.form}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Zap className="w-4 h-4" />
                القوة
              </TableCell>
              <TableCell className="font-medium">{product.strength}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <Calendar className="w-4 h-4" />
                تاريخ الإنتاج
              </TableCell>
              <TableCell className="font-medium">
                {product.production_date}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2 font-semibold bg-muted">
                <PackageCheck className="w-4 h-4" />
                حجم العبوة
              </TableCell>
              <TableCell className="font-medium">{product.pack_size}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductMainInfo;
