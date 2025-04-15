import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { fetchWalletAssets } from "@/lib/api";
import { useToken } from "./useToken";

export const useWalletAssets = () => {
  const user = useUser();
  const token = useToken();
  // console.log("user")
  // console.log(user)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchWalletAssets", user?.id],
    queryFn: () => fetchWalletAssets(user?.id),
    refetchInterval: 1000,
  });

  // console.log(JSON.stringify(data))


  return {
    data,
    isLoading,
    refetch,
  };
};
