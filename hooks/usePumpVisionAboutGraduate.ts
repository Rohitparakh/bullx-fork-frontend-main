import { useQuery } from "@tanstack/react-query";
import { fetchAboutPumpVisionData } from "@/lib/api";
import { MemescopeItem } from "@/app/types";

export const usePumpAbout = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchAboutPumpVisionData"],
    queryFn: () => fetchAboutPumpVisionData(),
    refetchInterval: 200,
  });
  let aboutData: MemescopeItem[] = [];
  if (data?.length > 0) {
    aboutData = data.map((item: any, index: number) => {
      return {
        symbol: item.symbol,
        name: item.name,
        address: item.address,
        tg: item.links?.telegram,
        x: item.links?.twitter,
        web: item.links?.website,
        top10Percent: Number(item.top10HoldersSupplyPerc).toFixed(2),
        created: item.creationTimestamp * 1000,
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
  aboutData.sort((a, b) => Number(b.bcprogress) - Number(a.bcprogress));
  return {
    aboutData,
    isLoading,
    refetch,
  };
};
