import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { fetchWalletAssets } from "@/lib/api";
import { useToken } from "./useToken";

export const useWalletAssets = () => {
  const user = useUser();
  const token = useToken();
  // console.log(user?.prvKey)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchWalletAssets", user?.prvKey],
    queryFn: () => fetchWalletAssets(user?.prvKey),
    refetchInterval: 1,
  });

  // console.log(JSON.stringify(data))


  return {
    data,
    isLoading,
    refetch,
  };
};
