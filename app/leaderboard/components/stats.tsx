"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { LeaderboardStats } from "@/app/types";
import { mono } from "@/app/fonts";

export default function StatsCard() {
  const [stats, setStats] = useState<LeaderboardStats>({
    ranking: 100,
    totalPoints: 100,
    traderRefs: 234,
    tradingVol: 30298,
    shares: 3,
    weekPoints: 0,
  });

  return (
    <Card className="!border-ton-blue-950 w-full rounded-3xl">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>
          Overview of your performance on the leaderboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Ranking
          </h1>
          <span>{stats.ranking}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Trading volume
          </h1>
          <span>{stats.tradingVol}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Total points
          </h1>
          <span>{stats.totalPoints}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Trader referrals
          </h1>
          <span>{stats.traderRefs}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            7-days points
          </h1>
          <span>{stats.weekPoints}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Shares
          </h1>
          <span>{stats.shares}</span>
        </div>
      </CardContent>
    </Card>
  );
}
