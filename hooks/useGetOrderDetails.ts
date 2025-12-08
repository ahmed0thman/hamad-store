import { getOrderDetails } from "@/lib/api/apiOrders";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useGetOrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => await getOrderDetails(Number(id)),
  });
  return {
    orderDetailsData: data,
    isLoadingOrderDetails: isLoading,
    errorOrderDetails: error,
  };
};
export default useGetOrderDetails;
