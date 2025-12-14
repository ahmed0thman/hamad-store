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
import Spinner from "@/components/custom/spinner";
import { useGetDoctorCommentsReport } from "@/hooks/useGetDoctorCommentsReport";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/custom/pagination";

export default function CommentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const pharmacies = useMemo(() => {
    if (!reportData) return [];
    const uniquePharmacies = Array.from(
      new Set(reportData.details.data.map((d) => d.pharmacy))
    );
    return uniquePharmacies.map((name) => ({ id: name, name }));
  }, [reportData]);

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
        حدث خطأ أثناء تحميل التقرير
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center text-muted-foreground">
        لا توجد بيانات متاحة
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
              اسم الطبيب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{reportData.doctor_name}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي التعليقات
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
              إجمالي النقاط
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
              أفضل صيدلية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">
              {reportData.top_pharmacy.pharmacy}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {reportData.top_pharmacy.points} نقطة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
        <div className="flex-center gap-2">
          <label>من</label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="من"
            className="w-fit"
          />
        </div>
        <div className="flex-center gap-2">
          <label>إلى</label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="إلى"
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
          <Button onClick={handleApplyFilters}>تطبيق الفلتر</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            إعادة تعيين
          </Button>
        </div>
      </div>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <CardTitle>التعليقات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>الصيدلية</TableHead>
                <TableHead>التعليق</TableHead>
                <TableHead>النقاط</TableHead>
                <TableHead>تاريخ الإضافة</TableHead>
                <TableHead>آخر تحديث</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {comment.product}
                  </TableCell>
                  <TableCell>{comment.pharmacy}</TableCell>
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
