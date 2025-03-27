import { useQuery } from "@tanstack/react-query"
import { fetchTokenImage } from "@/lib/api"
import { useToken } from "./useToken";

export const useFetchTokenImage = (address: string) => {
    

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchTokenImage', address],
        queryFn: () => fetchTokenImage(address),
    })
    const tokenImage = data?.data;
    return {
        tokenImage, isLoading, refetch,
    }
}