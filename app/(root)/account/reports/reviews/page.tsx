"use client";

import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

type Pharmacy = { id: string; name: string };

type Review = {
  id: string;
  comment: string;
  productName: string;
  pharmacyId: string;
  pharmacyName: string;
  points: number;
  createdAt: string;
  updatedAt: string;
};

const mockPharmacies: Pharmacy[] = [
  { id: "p1", name: "Hamad Pharmacy" },
  { id: "p2", name: "Central Pharmacy" },
  { id: "p3", name: "CityCare Pharmacy" },
];

const mockReviews: Review[] = [
  {
    id: "r1",
    comment: "Great service and fast delivery.",
    productName: "Vitamin C 500mg",
    pharmacyId: "p1",
    pharmacyName: "Hamad Pharmacy",
    points: 10,
    createdAt: "2025-11-30T08:45:00.000Z",
    updatedAt: "2025-12-02T12:30:00.000Z",
  },
  {
    id: "r2",
    comment: "Product arrived damaged.",
    productName: "Cough Syrup",
    pharmacyId: "p2",
    pharmacyName: "Central Pharmacy",
    points: 0,
    createdAt: "2025-11-23T16:20:00.000Z",
    updatedAt: "2025-11-24T10:15:00.000Z",
  },
  {
    id: "r3",
    comment: "Friendly staff — will order again.",
    productName: "Pain Relief Tabs",
    pharmacyId: "p1",
    pharmacyName: "Hamad Pharmacy",
    points: 5,
    createdAt: "2025-12-03T09:00:00.000Z",
    updatedAt: "2025-12-03T09:00:00.000Z",
  },
];

export default function ReviewsPage() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>("");

  const filteredReviews = useMemo(() => {
    return mockReviews.filter((r) => {
      if (selectedPharmacy && r.pharmacyId !== selectedPharmacy) return false;
      const created = new Date(r.createdAt);
      if (fromDate && created < new Date(fromDate)) return false;
      if (toDate && created > new Date(toDate)) return false;
      return true;
    });
  }, [fromDate, toDate, selectedPharmacy]);

  const reviewsTotalPoints = filteredReviews.reduce((s, r) => s + r.points, 0);
  const reviewsTotalCount = filteredReviews.length;
  const topPharmacy = useMemo(() => {
    if (filteredReviews.length === 0) return "-";
    const counts: Record<string, number> = {};
    filteredReviews.forEach(
      (r) => (counts[r.pharmacyName] = (counts[r.pharmacyName] || 0) + 1)
    );
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return `${top[0]} (${top[1]})`;
  }, [filteredReviews]);

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
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
        <div className="flex items-center gap-2">
          <label className="sr-only">From</label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only">To</label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="min-w-[200px]">
          <Select
            onValueChange={(v) => setSelectedPharmacy(v)}
            value={selectedPharmacy}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Pharmacies" />
            </SelectTrigger>
            <SelectContent>
              {mockPharmacies.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto md:ml-0">
          <Button onClick={() => {}}>Apply Filter</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Pharmacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">
              {topPharmacy}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pharmacy with most reviews
            </p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {reviewsTotalPoints}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Points given in reviews
            </p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {reviewsTotalCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total reviews in selection
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Pharmacy Name</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="max-w-xs truncate">
                    {r.comment}
                  </TableCell>
                  <TableCell>{r.productName}</TableCell>
                  <TableCell>{r.pharmacyName}</TableCell>
                  <TableCell>{r.points}</TableCell>
                  <TableCell>{formatDate(r.createdAt)}</TableCell>
                  <TableCell>{formatDate(r.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
