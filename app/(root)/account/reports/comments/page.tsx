"use client";

import Pagination from "@/components/custom/pagination";
import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDoctorCommentsReport } from "@/hooks/useGetDoctorCommentsReport";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function CommentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState<string>(
    searchParams.get("from_date")?.replace(/\//g, "-") || ""
  );
  const [toDate, setToDate] = useState<string>(
    searchParams.get("to_date")?.replace(/\//g, "-") || ""
  );
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>(
    searchParams.get("pharmacy_id") || ""
  );

  const { data: reportData, isLoading, error } = useGetDoctorCommentsReport();

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (fromDate) {
      params.set("from_date", fromDate.replace(/-/g, "/"));
    }
    if (toDate) {
      params.set("to_date", toDate.replace(/-/g, "/"));
    }
    if (selectedPharmacy) {
      params.set("pharmacy_id", selectedPharmacy);
    }

    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setSelectedPharmacy("");
    router.push("/account/reports/comments");
  };

  const filteredComments = useMemo(() => {
    if (!reportData) return [];
    return reportData.details.data;
  }, [reportData]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        {t("errorLoadingReport")}
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center text-muted-foreground">
        {t("noDataAvailable")}
      </div>
    );
  }

  function formatDate(iso?: string) {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleDateString("ar-EG");
    } catch {
      return iso;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("doctorName")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{reportData.doctor_name}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalComments")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reportData.total_comments}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalPoints")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reportData.total_points}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("topPharmacy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">
              {reportData.top_pharmacy?.pharmacy || "-"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {reportData.top_pharmacy?.points || 0} {t("points")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
        <div className="flex-center gap-2">
          <label>{t("from")}</label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder={t("from")}
            className="w-fit"
          />
        </div>
        <div className="flex-center gap-2">
          <label>{t("to")}</label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder={t("to")}
            className="w-fit"
          />
        </div>
        {/* <div className="min-w-[200px]">
          <Select
            onValueChange={(v) => setSelectedPharmacy(v)}
            value={selectedPharmacy}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="جميع الصيدليات" />
            </SelectTrigger>
            <SelectContent>
              {pharmacies.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex gap-2">
          <Button onClick={handleApplyFilters}>{t("applyFilter")}</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            {t("reset")}
          </Button>
        </div>
      </div>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("comments")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("product")}</TableHead>
                <TableHead>{t("pharmacy")}</TableHead>
                <TableHead>{t("comment")}</TableHead>
                <TableHead>{t("points")}</TableHead>
                <TableHead>{t("addedAt")}</TableHead>
                <TableHead>{t("updatedAt")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link href={`/product/${comment.product_id}`}>
                      {comment.product}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/store/${comment.pharmacy_id}`}>
                      {comment.pharmacy}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {comment.comment}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-green-600">
                      {comment.points}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(comment.earned_at)}</TableCell>
                  <TableCell>{formatDate(comment.updated_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {reportData && reportData.details.pagination && (
        <Pagination
          count={reportData.details.pagination.total}
          //   pageSize={1}
          pageSize={reportData.details.pagination.per_page}
        />
      )}
    </div>
  );
}
