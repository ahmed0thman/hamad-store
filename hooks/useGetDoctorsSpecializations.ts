import { getDoctorsSpecializations } from "@/lib/api/apiUser";
import { useQuery } from "@tanstack/react-query";

const useGetDoctorsSpecializations = () => {
  const {
    data: specializationsResponse,
    isLoading: isLoadingSpecializations,
    isError: isErrorSpecializations,
  } = useQuery({
    queryKey: ["doctorsSpecializations"],
    queryFn: async () => await getDoctorsSpecializations(),
  });
  return {
    specializationsResponse,
    isLoadingSpecializations,
    isErrorSpecializations,
  };
};
export default useGetDoctorsSpecializations;
