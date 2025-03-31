import { useQuery } from "@tanstack/react-query"
import { fetchTokenData } from "@/lib/api"
import { useToken } from "./useToken";

export const useFetchTokenData = () => {
    const token = useToken();    
    // console.log(token)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchTokenData', token?.mintAddress],
        queryFn: () => fetchTokenData(token?.mintAddress),
        refetchInterval: 1000
    })

    return {
        data, isLoading, refetch,
    }
}