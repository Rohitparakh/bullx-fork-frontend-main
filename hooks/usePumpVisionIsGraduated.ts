import { useQuery } from "@tanstack/react-query";
import { fetchGraduatedPumpVisionData } from "@/lib/api";
import { MemescopeItem } from "@/app/types";

export const usePumpGraduated = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchGraduatedPumpVisionData"],
    queryFn: () => fetchGraduatedPumpVisionData(),
    refetchInterval: 200,
  });
  let graduatedData: MemescopeItem[] = [];

  if (data?.length > 0) {
    graduatedData = data.map((item: any, index: number) => {
      return {
        symbol: item.symbol,
        name: item.name,
        address: item.address,
        tg: item.links?.telegram,
        x: item.links?.twitter,
        web: item.links?.website,
        top10Percent: Number(item.top10HoldersSupplyPerc).toFixed(2),
        created: item.creationTimestamp*1000,
        devHoldingsPercent: Number(item.devHoldingSupplyPerc).toFixed(2),
        snipers: item.sniperWalletsCount,
        marketCap: item.marketCap,
        volume: item.totalVol,
        holders: item.holders,
        bcprogress: item.bondingCurveProgress,
        image: item.tokenInfo,
      };
    });
  }
  graduatedData.sort((a,b) => Number(b.created)-Number(a.created))
  return {
    graduatedData,
    isLoading,
    refetch,
  };
};
