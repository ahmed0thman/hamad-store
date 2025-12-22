"use client";

import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/custom/spinner";
import { useGetDoctorOrdersReport } from "@/hooks/useGetDoctorOrdersReport";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/custom/pagination";
import { useTranslation } from "@/hooks/useTranslation";

export default function ReviewsPage() {
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

  const { data: reportData, isLoading, error } = useGetDoctorOrdersReport();

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
    router.push("/account/reports/reviews");
  };

  const filteredOrders = useMemo(() => {
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
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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
              {t("promoCode")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">
              {reportData.promo_code}
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
              {reportData.summary.total_points}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("ordersCount")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reportData.summary.orders_count}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("promoCodeUsage")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {reportData.summary.promocode_use_count}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
        <div className="flex-center gap-2">
          <label className="">{t("from")}</label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder={t("from")}
            className="w-fit"
          />
        </div>
        <div className="flex-center gap-2">
          <label className="">{t("to")}</label>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("doctorOrders")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">
              {reportData.summary.doctor_orders_count}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("doctorOrdersCount")}
            </p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("patientOrders")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {reportData.summary.patient_orders_count}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("patientOrdersCount")}
            </p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("pointsFromPatients")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {reportData.summary.points_from_patients}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("pointsEarnedFromPatients")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-muted-foreground mt-4">
          {t("noDataAvailable")}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("orders")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>{t("orderNumber")}</TableHead>
                  <TableHead>{t("customerName")}</TableHead>
                  <TableHead>{t("pharmacy")}</TableHead>
                  <TableHead>{t("pharmacyPoints")}</TableHead>
                  <TableHead>{t("sitePoints")}</TableHead>
                  <TableHead>{t("totalPoints")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("source")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="text-center">
                    <TableCell className="font-medium">
                      {order.order_number}
                    </TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{order.pharmacy_name_en}</TableCell>
                    <TableCell>{order.doctor_pharmacy_points}</TableCell>
                    <TableCell>{order.doctor_site_points}</TableCell>
                    <TableCell className="font-bold">
                      {order.total_points}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.source}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {reportData.details.pagination && (
        <Pagination
          count={reportData.details.pagination.total}
          // pageSize={1}
          pageSize={reportData.details.pagination.per_page}
        />
      )}
    </div>
  );
}
