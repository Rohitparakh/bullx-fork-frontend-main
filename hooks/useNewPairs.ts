import { useQuery } from "@tanstack/react-query";
import { fetchCreatedPumpVisionData } from "@/lib/api";

export const useNewPairs = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchCreatedPumpVisionData"],
    queryFn: () => fetchCreatedPumpVisionData(),
    refetchInterval: 200,
  });

  let pairs: any[] = [];

  if (data?.length > 0) {
    pairs = data.map((item: any, index: number) => {
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

  return {
    data: pairs,
    isLoading,
    refetch,
  };
};
