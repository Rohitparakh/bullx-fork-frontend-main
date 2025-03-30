"use client";
import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "@/app/components/section-title";
import TokenDetail from "./components/token-detail";
import { useParams } from "next/navigation";
import { useToken } from "@/hooks/useToken";
import { useEffect, useState, useMemo, useRef } from "react";
import { useAppContext } from "@/context/appContext";
import { convertToString, filterOhlc, formatNumber } from "@/lib/utils";
import Ohlc from "./components/ohlc";
import Swap from "./components/swap";
import { useFetchTokenDetails } from "@/hooks/useFetchTokenDetails";
import ChartComponent from "./components/ohlc";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFetchTokenImage } from "@/hooks/useFetchTokenImage";
import { fetchTokenImage } from "@/lib/api";
import { useFetchTokenData } from "@/hooks/useFetchTokenData";

export default function Page() {
  const { token, setToken, setUser } = useAppContext();
  const { data, isLoading, refetch } = useFetchTokenDetails();
  const { data:tokenData, isLoading:tokenDataisLoading, refetch:tokenDataRefetch } = useFetchTokenData();
  console.log("Token Data:")
  console.log(tokenData)
  const addressRef = useRef<string | undefined>();
  const [tokenAddress, setTokenAddress] = useState<string | undefined>("");
  const params = useParams();
  const router = useRouter();
  const user = useUser();
  const ohlcData = useMemo<Array<any> | undefined>(
    () => filterOhlc(data),
    [data]
  );
  // console.log(ohlcData)


  useEffect(() => {
    const { address } = params;
    const addr = convertToString(address);
    setTokenAddress(addr)
    const token = {
      mintAddress: addr || "",
      name: "",
      symbol: "",
    };
    setToken(token);
  }, []);

  return (
    <div className={`relative h-screen`}>
      <main className="px-4 bg-background/20 lg:h-screen flex gap-4 glass z-10">
        <DashboardNav />
        <div className="flex flex-col pt-8 pb-4  gap-2 grow h-[100vh] object-fill ">
          <div>
            <Image
              src={data?.data.logo}
              alt={data?.data.symbol}
              width={80}
              height={80}
              className="float-start  rounded-full "
            />
            <SectionTitle
              name={data?.data.name || ""}
              desc="This is the token traded in the PUMPFUN"
            />
          </div>

          <div className="block md:justify-between md:flex h-[calc(100%-80px)] object-fill">
            <div className="flex flex-col gap-2 h-full md:mr-2 md:w-[calc(100%-350px)] self-stretch">
            {tokenData && (
              <div className="flex flex-wrap gap-4 text-gray-900 dark:text-white">
  {tokenData.data.marketCap !== "N/A" && (
    <div className="text-lg font-semibold">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap: </span>
      {formatNumber(Number(tokenData.data.marketCap)).combined}
    </div>
  )}

  {tokenData.data.volume !== "N/A" && (
    <div className="text-lg font-semibold">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">24H Volume: </span>
      {formatNumber(Number(tokenData.data.volume)).combined}
    </div>
  )}

  {/* {tokenData.data.price !== "N/A" && (
    <div className="text-lg font-semibold">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Price: </span>
      {tokenData.data.price}
    </div>
  )} */}

  {tokenData.data.totalSupply !== "N/A" && (
    <div className="text-lg font-semibold">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Supply: </span>
      {formatNumber(Number(tokenData.data.totalSupply)).combined}
    </div>
  )}

  {tokenData.data.holders !== "N/A" && (
    <div className="text-lg font-semibold">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Holders: </span>
      {formatNumber(Number(tokenData.data.holders)).combined}
    </div>
  )}
</div>
//   <>
//     { tokenData.data.marketCap !== "N/A" && (
//   <div>
//     Market Cap: {formatNumber(Number(tokenData.data.marketCap)).combined}
//   </div>
// )}


//     {tokenData.data.volume !== "N/A" && (
//       <div>24H Volume: {formatNumber(Number(tokenData.data.volume)).combined}</div>
//     )}
//     {tokenData.data.price !== "N/A" && (
//       <div>Price: {tokenData.data.price}</div>
//     )}
//     {tokenData.data.totalSupply !== "N/A" && (
//       <div>Total Supply: {formatNumber(Number(tokenData.data.totalSupply)).combined}</div>
//     )}
//     {tokenData.data.holders !== "N/A" && (
//       <div>Total Holders: {formatNumber(Number(tokenData.data.holders)).combined}</div>
//     )}
//   </>
)}



              {data && <ChartComponent data={ohlcData} />}
              <TokenDetail data={data} />
            </div>
            <Swap address={tokenAddress} />
          </div>
        </div>
      </main>
    </div>
  );
}
