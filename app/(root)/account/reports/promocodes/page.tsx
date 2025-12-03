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

type PromoOrder = {
  id: string;
  orderNumber: string;
  userName: string;
  pharmacyId: string;
  pharmacyName: string;
  points: number;
  createdAt: string;
  status: "completed" | "canceled" | "pending";
};

const mockPharmacies: Pharmacy[] = [
  { id: "p1", name: "Hamad Pharmacy" },
  { id: "p2", name: "Central Pharmacy" },
  { id: "p3", name: "CityCare Pharmacy" },
];

const mockPromoOrders: PromoOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-1001",
    userName: "Aisha Mohamed",
    pharmacyId: "p1",
    pharmacyName: "Hamad Pharmacy",
    points: 120,
    createdAt: "2025-12-03T10:30:00.000Z",
    status: "completed",
  },
  {
    id: "2",
    orderNumber: "ORD-1002",
    userName: "Omar Ali",
    pharmacyId: "p2",
    pharmacyName: "Central Pharmacy",
    points: 60,
    createdAt: "2025-12-01T14:20:00.000Z",
    status: "canceled",
  },
  {
    id: "3",
    orderNumber: "ORD-1003",
    userName: "Sara Ibrahim",
    pharmacyId: "p1",
    pharmacyName: "Hamad Pharmacy",
    points: 80,
    createdAt: "2025-11-28T09:15:00.000Z",
    status: "completed",
  },
];

export default function PromoCodePage() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>("");

  const filteredPromo = useMemo(() => {
    return mockPromoOrders.filter((o) => {
      if (selectedPharmacy && o.pharmacyId !== selectedPharmacy) return false;
      const created = new Date(o.createdAt);
      if (fromDate && created < new Date(fromDate)) return false;
      if (toDate && created > new Date(toDate)) return false;
      return true;
    });
  }, [fromDate, toDate, selectedPharmacy]);

  const promoTotalOrders = filteredPromo.length;
  const promoTotalPoints = filteredPromo.reduce((s, x) => s + x.points, 0);
  const promoUniqueUsers = new Set(filteredPromo.map((p) => p.userName)).size;

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
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {promoTotalOrders}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Orders using promo codes
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
              {promoTotalPoints}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Points redeemed with promo codes
            </p>
          </CardContent>
        </Card>

        <Card className="gap-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Promo Code Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">
              {promoUniqueUsers}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique users who used promo codes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promo Code Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Pharmacy Name</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Order Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromo.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.orderNumber}</TableCell>
                  <TableCell>{o.userName}</TableCell>
                  <TableCell>{o.pharmacyName}</TableCell>
                  <TableCell>{o.points}</TableCell>
                  <TableCell>{formatDate(o.createdAt)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        o.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : o.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {o.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
