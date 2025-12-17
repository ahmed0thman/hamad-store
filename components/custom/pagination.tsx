"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface PaginationProps {
  count: number;
  pageSize?: number;
  visibleButtons?: number;
}

export default function Pagination({
  count,
  pageSize = 10,
  visibleButtons,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { t } = useTranslation();

  useEffect(() => {
    params.set("pageSize", pageSize.toString());
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [pageSize]);

  if (count <= pageSize) return null;

  const currentPage: number = params.get("page")
    ? Number(params.get("page"))
    : 1;
  const pageCount: number = Math.ceil(count / pageSize);

  const pages: number[] = [];
  const maxButtons = visibleButtons ?? 3;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;
  if (end > pageCount) {
    end = pageCount;
    start = Math.max(1, end - maxButtons + 1);
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const setPage = (page: number): void => {
    params.set("page", page.toString());
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const nextPage = (): void => {
    if (currentPage < pageCount) setPage(currentPage + 1);
  };

  const prevPage = (): void => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  return (
    <div className="w-full flex items-center justify-center py-4">
      <div className="flex  gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
          aria-label={t("firstPage")}
        >
          {"<<"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label={t("previousPage")}
        >
          <ChevronLeft className="w-4 h-4 auto-dir" />
        </Button>

        {pages.map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => setPage(page)}
            aria-label={`${t("goToPage")} ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={currentPage === pageCount}
          aria-label={t("nextPage")}
        >
          <ChevronRight className="w-4 h-4 auto-dir" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage(pageCount)}
          disabled={currentPage === pageCount}
          aria-label={t("lastPage")}
        >
          {">>"}
        </Button>
      </div>
      <span className="text-muted-foreground ms-2 text-base font-medium font-sans">
        of {pageCount}
      </span>
    </div>
  );
}
