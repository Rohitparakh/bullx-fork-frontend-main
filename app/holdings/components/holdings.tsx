"use client";

import { API_URL } from "@/config";
import { DataTable } from "@/app/components/data-table";
import { SortedHeader } from "@/app/components/sortedCol";
import { Holding } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";



// interface Trade {
//   mint: string;
//   name: string;
//   symbol: string;
//   amount: number;
//   priceSol: number;
//   priceUsd: number;
//   tradeType: "BUY" | "SELL";
// }

// interface TokenStats {
//   totalInvestedUsd: number;
//   totalInvestedSol: number;
//   remainingTokens: number;
//   remainingValueUsd: number;
//   remainingValueSol: number;
//   tokensPurchased: number;
//   valuePurchasedUsd: number;
//   valuePurchasedSol: number;
//   tokensSold: number;
//   valueSoldUsd: number;
//   valueSoldSol: number;
//   pnlPercentage: number;
//   symbol: string;
//   mint: string;
// }

// interface OverallStats {
//   totalTradeVolume: number;
//   totalInvestedUsd: number;
//   totalInvestedSol: number;
//   totalRemainingValueUsd: number;
//   totalRemainingValueSol: number;
//   totalPurchasedUsd: number;
//   totalPurchasedSol: number;
//   totalSoldUsd: number;
//   totalSoldSol: number;
//   overallPnlPercentage: number;
// }


// export const convertToHoldings = async (tokenStats: any, solPrice: number): Promise<Holding[]> => {
//   return Promise.all(
//     Object.values(tokenStats).map(async (token: any) => {
//       const currentValue = token.remainingValueUsd; // Market value of remaining tokens
//       const totalInvested = token.totalInvestedUsd; // USD invested in this token
//       const totalSold = token.valueSoldUsd; // Total USD received from sold tokens
//       const pnl = currentValue + totalSold - totalInvested;
//       const pnlPercentage = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;

//       try {
//         const res = await fetch(`${API_URL}/price/${token.mint}`);
//         const data = await res.json();
//         const tokenPrice = await data.data.price;

//         return {
//           token: token.symbol,
//           invested: token.totalInvestedUsd,
//           info: {
//             address: token.mint,
//           },
//           chainSymbol: "SOL",
//           remaining: {
//             parent: token.remainingTokens * tokenPrice, // USD value of remaining tokens
//             token: token.remainingTokens, // Tokens left
//           },
//           bought: {
//             parent: token.valuePurchasedSol, // Total amount invested in USD
//             token: token.tokensPurchased, // Tokens bought initially
//           },
//           sold: {
//             parent: token.valueSoldUsd, // Total USD earned from sales
//             token: token.tokensSold, // Total tokens sold
//           },
//           change: {
//             percentage: pnlPercentage,
//             amount: pnl,
//           },
//           type: token.remainingTokens > 0 ? "Holding" : "Sold",
//         };
//       } catch (error) {
//         console.error(`Error fetching price for ${token.mint}:`, error);
//         return null; // Handle the error gracefully
//       }
//     })
//   ).then((results) => results.filter((item): item is Holding => item !== null)); // Filter out any null values
// };



export default function Holdings({tableData}:any) {
    const { data, isLoading, refetch } = useWalletAssets();
    // const[tableData, setTableData] = useState([])
    // const[tableData, setTableData] = useState([])
    console.log(data)
  const columns: ColumnDef<Holding>[] = [
    {
      accessorKey: "token",

      header: "Token",
    },
    {
      accessorKey: "invested",
      // header: ({ column }) => {
      //   return <SortedHeader column={column}>Invested</SortedHeader>;
      // },
      cell: ({ row }) => (
        <span className="px-4">
          ${formatNumber(row.getValue("invested")!).combined!}
        </span>
      ),
    },
    {
      accessorKey: "remaining",
      header: "Remaining",
      cell: ({ row }) => {
        const chain: string = row.original.chainSymbol;
        const remaining = row.original.remaining;
        const { parent, token }: { parent: number; token: number } = remaining;          
        // console.log(data?.solPrice)
        // console.log(token)
        return (
          <span className="flex flex-col gap-1">
            ${parent.toFixed(2)}
            {/* {(data?.solPrice * token).toFixed(2) } */}
            <span className="text-xs text-ton-blue-200/60">
              {formatNumber(token).combined} 
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "bought",
      header: "Bought",
      cell: ({ row }) => {
        const chain: string = row.original.chainSymbol;
        const bought: { parent: number; token: number } =
          row.getValue("bought");
        if (!bought) return;
        const { parent, token }: { parent: number; token: number } = bought;
        
        
        return (
          <span className="flex flex-col gap-1">
            {parent.toFixed(2)} {chain}
            <span className="text-xs text-ton-blue-200/60">
              {formatNumber(token).combined}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "sold",
      header: "Sold",
      cell: ({ row }) => {
        const chain: string = row.original.chainSymbol;
        const sold: { parent: number; token: number } = row.getValue("sold");
        if (!sold) return;
        const { parent, token }: { parent: number; token: number } = sold;

        return (
          <span className="flex flex-col gap-1">
            ${parent>0?formatNumber(parent).combined:0}
            <span className="text-xs text-ton-blue-200/60">
              {formatNumber(token).combined}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "change",
      header: "Change in P&L",
      cell: ({ row }) => {
        const { percentage, amount }: { percentage: number; amount: number } =
          row.getValue("change");

        const positive: boolean = percentage > 0;

        return (
          <span className="flex flex-col">
            <span className={positive ? "text-green-500" : "text-red-500"}>
              {positive ? "+" : ""}
              {percentage.toFixed(2)}%
            </span>
            <span className="text-xs text-ton-blue-200/60">
              {/* {formatNumber(amount).combined} */}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Bought / sold",
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("type")!}</span>
      ),
    },
  ];
console.log(data?.tokenList)
  
  // console.log(holdings)




// function calculateTokenStats(trades: Trade[]): Record<string, TokenStats> {
//     const tokenStats: Record<string, TokenStats> = {};

//     trades?.forEach(({ mint, name, symbol, amount, priceSol, priceUsd, tradeType }) => {
//         if (!tokenStats[name]) {
//             tokenStats[name] = {
//                 totalInvestedUsd: 0,
//                 totalInvestedSol: 0,
//                 remainingTokens: 0,
//                 remainingValueUsd: 0,
//                 remainingValueSol: 0,
//                 tokensPurchased: 0,
//                 valuePurchasedUsd: 0,
//                 valuePurchasedSol: 0,
//                 tokensSold: 0,
//                 valueSoldUsd: 0,
//                 valueSoldSol: 0,
//                 pnlPercentage: 0,
//                 symbol,
//                 mint
//             };
//         }
        
//         const stats = tokenStats[name];

//         if (tradeType === "BUY") {
//             stats.totalInvestedUsd += priceUsd;
//             stats.totalInvestedSol += priceSol;
//             stats.tokensPurchased += amount;
//             stats.valuePurchasedUsd += priceUsd;
//             stats.valuePurchasedSol += priceSol;
//             stats.remainingTokens += amount;
//         } else {
//             stats.tokensSold += amount;
//             stats.valueSoldUsd += priceUsd;
//             stats.valueSoldSol += priceSol;
//             stats.remainingTokens -= amount;
//         }

//         // Calculate remaining value
//         stats.remainingValueUsd = (stats.remainingTokens / stats.tokensPurchased) * stats.totalInvestedUsd;
//         stats.remainingValueSol = (stats.remainingTokens / stats.tokensPurchased) * stats.totalInvestedSol;

//         // Calculate Profit/Loss percentage
//         const totalReturns = stats.valueSoldUsd + stats.remainingValueUsd;
//         stats.pnlPercentage = ((totalReturns - stats.totalInvestedUsd) / stats.totalInvestedUsd) * 100;
//     });

//     return tokenStats;
// }

// function calculateOverallStats(tokenStats: Record<string, TokenStats>): OverallStats {
//     let totalTradeVolume = 0;
//     let totalInvestedUsd = 0;
//     let totalInvestedSol = 0;
//     let totalRemainingValueUsd = 0;
//     let totalRemainingValueSol = 0;
//     let totalPurchasedUsd = 0;
//     let totalPurchasedSol = 0;
//     let totalSoldUsd = 0;
//     let totalSoldSol = 0;

//     Object.values(tokenStats)?.forEach(stats => {
//         totalTradeVolume += stats.tokensPurchased + stats.tokensSold;
//         totalInvestedUsd += stats.totalInvestedUsd;
//         totalInvestedSol += stats.totalInvestedSol;
//         totalRemainingValueUsd += stats.remainingValueUsd;
//         totalRemainingValueSol += stats.remainingValueSol;
//         totalPurchasedUsd += stats.valuePurchasedUsd;
//         totalPurchasedSol += stats.valuePurchasedSol;
//         totalSoldUsd += stats.valueSoldUsd;
//         totalSoldSol += stats.valueSoldSol;
//     });

//     const totalReturns = totalSoldUsd + totalRemainingValueUsd;
//     const overallPnlPercentage = ((totalReturns - totalInvestedUsd) / totalInvestedUsd) * 100;

//     return {
//         totalTradeVolume,
//         totalInvestedUsd,
//         totalInvestedSol,
//         totalRemainingValueUsd,
//         totalRemainingValueSol,
//         totalPurchasedUsd,
//         totalPurchasedSol,
//         totalSoldUsd,
//         totalSoldSol,
//         overallPnlPercentage,
//     };
// }



// useEffect(() => {
//   const fetchHoldings = async () => {
//     if (!data) return;

//     const tradeData: Trade[] = data?.tradeHistory;
//     const tokenStats = calculateTokenStats(tradeData);
//     const overallStats = calculateOverallStats(tokenStats);

//     console.log("Holding Stats: ", tokenStats);
//     // console.log("Overall Stats: ", overallStats);

//     try {
//       const dataLocal = await convertToHoldings(tokenStats, data?.solPrice);
//       console.log("Converted Holdings Data:", dataLocal);
//       setTableData(dataLocal);
//     } catch (error) {
//       console.error("Error converting holdings:", error);
//     }
//   };

//   fetchHoldings(); // Call the async function inside useEffect
// }, [data, refetch]); 



// const holdings = data?.tokenList ? convertToHoldings(data.tokenList, data?.solPrice) : [];
// console.log(holdings)
  return (
    <div className="w-full max-h-full flex">
      {tableData?.length>0 && <DataTable data={tableData} columns={columns} />}
    </div>
  );
}
