"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { HoldingStats } from "@/app/types";
import { mono } from "@/app/fonts";
import { formatNumber } from "@/lib/utils";
import { useWalletAssets } from "@/hooks/useWalletAssets";
// import { convertToHoldings } from "./holdings";

export default function StatsCard({stats}:any) {
  console.log(stats)
  const { data, isLoading, refetch } = useWalletAssets();
  // console.log(data);

  // const holdings = data?.tokenList ? convertToHoldings(data.tokenList, data?.solPrice) : [];

  interface Props {
    change: {
      percentage: number
    };
    invested: number;
    remaining:{
      parent:number
    };
  }

const [val, setVal] = useState<HoldingStats>({
  cumPnL: "",
  totalValue: "",
});

useEffect(()=>{
  setVal({
    cumPnL: stats.overallPnlPercentage?stats.overallPnlPercentage:0,
    totalValue: (stats.totalInvestedUsd+stats.totalSoldUsd)>0?stats.totalInvestedUsd+stats.totalSoldUsd:0,
  })
},[stats])

//   useEffect(()=>{
    
//     if(holdings?.length>0){    
//       // Calculate total PNL using percentage
//   const totalPNL = holdings?.reduce((acc:number, item:Props) => {
//     const pnl = (item?.change?.percentage? item?.change?.percentage:0/ 100) * item.invested;
//     return acc + pnl;
//   }, 0);
  
//   // Calculate total value of current holdings
//   const totalHoldings = holdings?.reduce((acc:number, item:Props) => acc + item.remaining.parent, 0);
  
// setStats({
//   cumPnL:Number(totalPNL?.toFixed(2)),
//   totalValue:Number(totalHoldings?.toFixed(2))
// })
//     }
//   },[data, refetch])

// type Summary = {
//   totalPNL: number;
//   totalTradeVolume: number;
// };


// type Trade = {
//   _id: string;
//   prvKey: string;
//   mint: string;
//   name: string;
//   symbol: string;
//   amount: number;
//   priceSol: number;
//   priceUsd: number;
//   tradeType: "BUY" | "SELL";
//   tradeDate: string;
//   __v: number;
// };

// function calculateTotalSummary(trades: Trade[]): Summary {
//   let totalPNL = 0;
//   let totalTradeVolume = 0;

//   trades?.forEach(({ tradeType, priceUsd, amount }) => {
//     if (tradeType === "SELL") {
//       totalPNL += priceUsd; // Track USD gained from sales
//     }
//     totalTradeVolume += amount; // Sum up all token transactions
//   });

//   return {
//     totalPNL,
//     totalTradeVolume,
//   };
// }

// useEffect(()=>{
//   const tradesData: Trade[] = data?.tradeHistory;

//   const summary = calculateTotalSummary(tradesData);
//   se({
//     cumPnL: summary.totalPNL,
//     totalValue: summary.totalTradeVolume
//   })

// },[data,refetch])


















  return (
    <Card className="!border-ton-blue-950 w-full rounded-3xl">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Summary of your holdings.</CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Total Trade Volume
          </h1>
          <span>{typeof val.totalValue == "number"?`$${val.totalValue.toFixed(2)}`:0}</span>
          {/* <span>{typeof val.totalValue == "number"?formatNumber(val.totalValue).combined:val.totalValue}</span> */}
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Cumulative Profits &amp; Loses
          </h1>
          <span
            className={Number(val.cumPnL) >= 0 ? "text-green-500" : "text-red-500"}
          >
            {Number(val.cumPnL) > 0 ? "+" : ""}
            {Number(val.cumPnL).toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
