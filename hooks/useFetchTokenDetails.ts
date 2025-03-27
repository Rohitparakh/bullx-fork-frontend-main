import { useQuery } from "@tanstack/react-query"
import { fetchTokenDetails } from "@/lib/api"
import { useToken } from "./useToken";

export const useFetchTokenDetails = () => {
    const token = useToken();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchTokenDetails', token?.mintAddress],
        queryFn: () => fetchTokenDetails(token?.mintAddress),
        refetchInterval: 1000
    })

    return {
        data, isLoading, refetch,
    }
}