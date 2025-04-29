import { useQuery } from "@tanstack/react-query";
import { fetchCreatedPumpVisionData, fetchTrendingData } from "@/lib/api";
import { MemescopeItem } from "@/app/types";

export const useTrending = (timeframe:string) => {
  // console.log("b")
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchTrendingData"],
    queryFn: () => fetchTrendingData(timeframe),
    refetchInterval: 200,
  });
  let createdData: MemescopeItem[] = [];

  if (data?.length > 0) {
    createdData = data.map((item: any, index: number) => {
      return {
        info: {
          //image: item.tokenInfo,
          symbol: item.symbol,
          chain: "SOL",
          address: item.address,
          tg: item.links?.telegram,
          x: item.links?.twitter,
        },
        created: item.creationTimestamp * 1000,
        liquidity: {
          amountUsd: item.liquidityUSD,
          differencePercentage: 0,
        },
        initialLiquidity: {
          amountUsd: 0.0,
        },
        mktCap: {
          amountUsd: item.marketCapUSD,
        },
        txns: {
          green: item.buys,
          red: item.sells,
        },
        vol: item.totalVol,
        auditResults: {
          mintAuthDisabled: true,
          freezeAuthDisabled: true,
          top10Holders: true,
        },
        
      };
    });
  }
  createdData.sort((a, b) => Number(b.created) - Number(a.created));
  return {
    createdData,
    isLoading,
    refetch,
  };
};
