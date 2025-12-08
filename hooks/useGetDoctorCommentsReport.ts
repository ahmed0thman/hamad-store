"use client";

import { getDoctorCommentsReport } from "@/lib/api/apiUser";
import { DoctorCommentReport } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useGetDoctorCommentsReport() {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from_date") || undefined;
  const toDate = searchParams.get("to_date") || undefined;
  const pharmacyId = searchParams.get("pharmacy_id") || undefined;
  const page = searchParams.get("page") || undefined;
  const perPage = searchParams.get("pageSize") || undefined;

  // Build pagination query string
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page);
  if (perPage) queryParams.append("per_page", perPage);
  const paginationQuery = queryParams.toString();

  return useQuery({
    queryKey: [
      "doctorCommentsReport",
      fromDate,
      toDate,
      pharmacyId,
      page,
      perPage,
    ],
    queryFn: async () => {
      const response = await getDoctorCommentsReport(
        {
          from_date: fromDate,
          to_date: toDate,
          pharmacy_id: pharmacyId,
        },
        paginationQuery
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch comments report");
      }

      return response.data as DoctorCommentReport;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
