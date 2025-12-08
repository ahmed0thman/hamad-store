import { useQuery } from "@tanstack/react-query";
import { getDoctorOrdersReport } from "@/lib/api/apiUser";
import { DoctorOrderReport } from "@/types";
import { useSearchParams } from "next/navigation";

export const useGetDoctorOrdersReport = () => {
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
      "doctorOrdersReport",
      fromDate,
      toDate,
      pharmacyId,
      page,
      perPage,
    ],
    queryFn: async () => {
      const response = await getDoctorOrdersReport(
        {
          from_date: fromDate,
          to_date: toDate,
          pharmacy_id: pharmacyId,
        },
        paginationQuery
      );
      if (!response.success) {
        throw new Error(
          response.message || "Failed to fetch doctor orders report"
        );
      }
      return response.data as DoctorOrderReport;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
