"use client"
import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import Holdings from "./components/holdings";
import StatsCard from "./components/stats";
import { API_URL } from "@/config";
import { useEffect, useState } from "react";
import { useWalletAssets } from "@/hooks/useWalletAssets";

export default function Page() {

  const { data, isLoading, refetch } = useWalletAssets();
  const[tableData, setTableData] = useState([]);
  const[overviewData, setOverviewData] = useState([]);
    

interface Trade {
  mint: string;
  name: string;
  symbol: string;
  amount: number;
  priceSol: number;
  priceUsd: number;
  tradeType: "BUY" | "SELL";
}

interface TokenStats {
  totalInvestedUsd: number;
  totalInvestedSol: number;
  remainingTokens: number;
  remainingValueUsd: number;
  remainingValueSol: number;
  tokensPurchased: number;
  valuePurchasedUsd: number;
  valuePurchasedSol: number;
  tokensSold: number;
  valueSoldUsd: number;
  valueSoldSol: number;
  pnlPercentage: number;
  symbol: string;
  mint: string;
}

interface OverallStats {
  totalTradeVolume: number;
  totalInvestedUsd: number;
  totalInvestedSol: number;
  totalRemainingValueUsd: number;
  totalRemainingValueSol: number;
  totalPurchasedUsd: number;
  totalPurchasedSol: number;
  totalSoldUsd: number;
  totalSoldSol: number;
  overallPnlPercentage: number;
}


const convertToHoldings = async (tokenStats: any, solPrice: number): Promise<Holding[]> => {
  return Promise.all(
    Object.values(tokenStats).map(async (token: any) => {
      const currentValue = token.remainingValueUsd; // Market value of remaining tokens
      const totalInvested = token.totalInvestedUsd; // USD invested in this token
      const totalSold = token.valueSoldUsd; // Total USD received from sold tokens
      const pnl = currentValue + totalSold - totalInvested;
      const pnlPercentage = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;

      try {
        const res = await fetch(`${API_URL}/price/${token.mint}`);
        const data = await res.json();
        const tokenPrice = await data.data.price;

        return {
          token: token.symbol,
          invested: token.totalInvestedUsd,
          info: {
            address: token.mint,
          },
          chainSymbol: "SOL",
          remaining: {
            parent: token.remainingTokens * tokenPrice, // USD value of remaining tokens
            token: token.remainingTokens, // Tokens left
          },
          bought: {
            parent: token.valuePurchasedSol, // Total amount invested in USD
            token: token.tokensPurchased, // Tokens bought initially
          },
          sold: {
            parent: token.valueSoldUsd, // Total USD earned from sales
            token: token.tokensSold, // Total tokens sold
          },
          change: {
            percentage: pnlPercentage,
            amount: pnl,
          },
          type: token.remainingTokens > 0 ? "Holding" : "Sold",
        };
      } catch (error) {
        console.error(`Error fetching price for ${token.mint}:`, error);
        return null; // Handle the error gracefully
      }
    })
  ).then((results) => results.filter((item): item is Holding => item !== null)); // Filter out any null values
};

function calculateTokenStats(trades: Trade[]): Record<string, TokenStats> {
  const tokenStats: Record<string, TokenStats> = {};

  trades?.forEach(({ mint, name, symbol, amount, priceSol, priceUsd, tradeType }) => {
      if (!tokenStats[name]) {
          tokenStats[name] = {
              totalInvestedUsd: 0,
              totalInvestedSol: 0,
              remainingTokens: 0,
              remainingValueUsd: 0,
              remainingValueSol: 0,
              tokensPurchased: 0,
              valuePurchasedUsd: 0,
              valuePurchasedSol: 0,
              tokensSold: 0,
              valueSoldUsd: 0,
              valueSoldSol: 0,
              pnlPercentage: 0,
              symbol,
              mint
          };
      }
      
      const stats = tokenStats[name];

      if (tradeType === "BUY") {
          stats.totalInvestedUsd += priceUsd;
          stats.totalInvestedSol += priceSol;
          stats.tokensPurchased += amount;
          stats.valuePurchasedUsd += priceUsd;
          stats.valuePurchasedSol += priceSol;
          stats.remainingTokens += amount;
      } else {
          stats.tokensSold += amount;
          stats.valueSoldUsd += priceUsd;
          stats.valueSoldSol += priceSol;
          stats.remainingTokens -= amount;
      }

      // Calculate remaining value
      stats.remainingValueUsd = (stats.remainingTokens / stats.tokensPurchased) * stats.totalInvestedUsd;
      stats.remainingValueSol = (stats.remainingTokens / stats.tokensPurchased) * stats.totalInvestedSol;

      // Calculate Profit/Loss percentage
      const totalReturns = stats.valueSoldUsd + stats.remainingValueUsd;
      stats.pnlPercentage = ((totalReturns - stats.totalInvestedUsd) / stats.totalInvestedUsd) * 100;
  });

  return tokenStats;
}

function calculateOverallStats(tokenStats: Record<string, TokenStats>): OverallStats {
  let totalTradeVolume = 0;
  let totalInvestedUsd = 0;
  let totalInvestedSol = 0;
  let totalRemainingValueUsd = 0;
  let totalRemainingValueSol = 0;
  let totalPurchasedUsd = 0;
  let totalPurchasedSol = 0;
  let totalSoldUsd = 0;
  let totalSoldSol = 0;

  Object.values(tokenStats)?.forEach(stats => {
      totalTradeVolume += stats.tokensPurchased + stats.tokensSold;
      totalInvestedUsd += stats.totalInvestedUsd;
      totalInvestedSol += stats.totalInvestedSol;
      totalRemainingValueUsd += stats.remainingValueUsd;
      totalRemainingValueSol += stats.remainingValueSol;
      totalPurchasedUsd += stats.valuePurchasedUsd;
      totalPurchasedSol += stats.valuePurchasedSol;
      totalSoldUsd += stats.valueSoldUsd;
      totalSoldSol += stats.valueSoldSol;
  });

  const totalReturns = totalSoldUsd + totalRemainingValueUsd;
  const overallPnlPercentage = ((totalReturns - totalInvestedUsd) / totalInvestedUsd) * 100;

  return {
      totalTradeVolume,
      totalInvestedUsd,
      totalInvestedSol,
      totalRemainingValueUsd,
      totalRemainingValueSol,
      totalPurchasedUsd,
      totalPurchasedSol,
      totalSoldUsd,
      totalSoldSol,
      overallPnlPercentage,
  };
}


useEffect(() => {
  const fetchHoldings = async () => {
    if (!data) return;

    const tradeData: Trade[] = data?.tradeHistory;
    const tokenStats = calculateTokenStats(tradeData);
    const overallStats = calculateOverallStats(tokenStats);
    setOverviewData(overallStats);
    console.log("Holding Stats: ", tokenStats);
    // console.log("Overall Stats: ", overallStats);

    try {
      const dataLocal = await convertToHoldings(tokenStats, data?.solPrice);
      console.log("Converted Holdings Data:", dataLocal);
      setTableData(dataLocal);
    } catch (error) {
      console.error("Error converting holdings:", error);
    }
  };

  fetchHoldings(); // Call the async function inside useEffect
}, [data, refetch]); 

  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav />
      <div className="pt-8 pb-4 grow h-screen flex flex-col gap-4">
        <SectionTitle
          name="Holdings"
          desc="View all tokens you've bought or sold."
        />
	<StatsCard stats={overviewData} />
        <div className="h-[200vh] lg:overflow-hidden grow flex flex-col lg:flex-row gap-4">
          <Holdings tableData={tableData} />
        </div>
      </div>
    </main>
  );
}
