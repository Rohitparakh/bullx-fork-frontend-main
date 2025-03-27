"use client";

import { DataTable } from "@/app/components/data-table";
import { SortedHeader } from "@/app/components/sortedCol";
import { Holding } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { formatNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


// export const convertToHistory = (tradeHistory: any[], solPrice: number): Holding[] => {
//   return tradeHistory.map((token) => {
//     const currentValue = token.price * token.amount; // Market value of remaining tokens
//     const totalInvested = token.invested; // USD invested in this token
//     const totalSold = token.sold * token.price; // Total USD received from sold tokens
//     // console.log(token)
//     const pnl = (currentValue + totalSold) - totalInvested;
//     const pnlPercentage = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;

//     return {
//       token: token.symbol,
//       invested: totalInvested,
//       info: {
//         address: token.mint,
//       },
//       chainSymbol: "SOL",
//       remaining: {
//         parent: currentValue, // USD value of remaining tokens
//         token: token.amount, // Tokens left
//       },
//       bought: {
//         parent: totalInvested/ solPrice, // Total amount invested in USD
//         token: token.invested / token.price, // Tokens bought initially
//       },
//       sold: {
//         parent: totalSold, // Total USD earned from sales
//         token: token.sold, // Total tokens sold
//       },
//       change: {
//         percentage: pnlPercentage,
//         amount: pnl,
//       },
//       type: token.sold > 0 ? "sold" : "holding",
//     };
//   });
// };


export const convertToHistory = (tradeHistory:any, solPrice:any): History[] => {
    return tradeHistory.map((trade:any) => {
      return {
        token: trade.symbol,
        trade_type: trade.tradeType, // BUY or SELL
        info: {
          address: trade.mint,
        },
        chainSymbol: "SOL",
        tokens: trade.amount, // Number of tokens
        priceSOL: trade.priceSol,
        priceUSD: trade.priceUsd,        
        time: new Date(trade.tradeDate).toLocaleString(), // Trade timestamp
        type: trade.tradeType,
      };
    });
  };
  


  type History = {
    token: string;
    trade_type: string; // Add this
    info: {
      address: string;
    };
    chainSymbol: string;
    tokens: number;
    priceSOL: number;
    priceUSD: number;
    time: string;
  };
  

export default function History() {
    const { data, isLoading, refetch } = useWalletAssets();
    console.log(data)
  const columns: ColumnDef<History>[] = [
    {
      accessorKey: "token",

      header: "Token",
    },
    {
      accessorKey: "trade_type",
      header: "Trade Type",
      // header: ({ column }) => {
      //   return <SortedHeader column={column}>Invested</SortedHeader>;
      // },
      cell: ({ row }) => {
        const positive: boolean = row.original.trade_type == "BUY";
        
        return(
        <span className={`px-4 ${positive?"text-green-500":"text-red-500"}`}>
            {row.original.trade_type}
        </span>
      )},
    },
    {
      accessorKey: "tokens",
      header: "No. of tokens",
      cell: ({ row }) => {
        // const chain: string = row.original.chainSymbol;
        // const { parent, token }: { parent: number; token: number } =
        //   row.getValue("remaining");
        // console.log(data?.solPrice)
        // console.log(token)
        return (
          <span className="flex flex-col gap-1">
            {formatNumber(row.original.tokens).combined}
            {/* {data?.solPrice * token.combined } */}
            <span className="text-xs text-ton-blue-200/60">
              {/* {formatNumber(token).combined}  */}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "priceSOL",
      header: "Price (SOL)",
      cell: ({ row }) => {
        // const chain: string = row.original.chainSymbol;
        // const bought: { parent: number; token: number } =
        //   row.getValue("bought");
        // if (!bought) return;
        // const { parent, token }: { parent: number; token: number } = bought;
        
        
        return (
          <span className="flex flex-col gap-1">
            {row.original.priceSOL.toFixed(2)} {row.original.chainSymbol}
            {/* {formatNumber(parent).combined} {chain} */}
            <span className="text-xs text-ton-blue-200/60">
              {/* {formatNumber(token).combined} */}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "priceUSD",
      header: "Price USD",
      cell: ({ row }) => {
        // const chain: string = row.original.chainSymbol;
        // const sold: { parent: number; token: number } = row.getValue("sold");
        // if (!sold) return;
        // const { parent, token }: { parent: number; token: number } = sold;

        return (
          <span className="flex flex-col gap-1">
            ${formatNumber(row.original.priceUSD).combined}
            {/* ${formatNumber(parent).combined} */}
            <span className="text-xs text-ton-blue-200/60">
              {/* {formatNumber(token).combined} check this */}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "time",
      header: "Trade Time",
      cell: ({ row }) => {
        // const { percentage, amount }: { percentage: number; amount: number } =
        //   row.getValue("change");

        // const positive: boolean = percentage > 0;

        return (
          <span className="flex flex-col">
            {/* <span className={positive ? "text-green-500" : "text-red-500"}> */}
              {/* {positive ? "+" : ""} */}
              {/* {percentage.toFixed(2)}% */}
            {/* </span> */}
            {row.original.time}
            <span className="text-xs text-ton-blue-200/60">
              {/* {formatNumber(amount).combined} */}
            </span>
          </span>
        );
      },
    }
  ];
  const trades = data?.tradeHistory ? convertToHistory(data.tradeHistory, data.solPrice) : [];
  // console.log(holdings)
  return (
    <div className="w-full max-h-full flex">
      {trades.length>0 && <DataTable data={trades} columns={columns} />}
    </div>
  );
}
