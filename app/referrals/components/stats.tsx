"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { LeaderboardStats, ReferralsStats } from "@/app/types";
import { mono } from "@/app/fonts";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

export default function StatsCard() {
  const [stats, setStats] = useState<ReferralsStats>({
    referralsCount: 100,
    totalEarningsSol: 1000,
    referralId: "oogabooga",
    receiverWallet: "6BecuGmLuD7JJEbQuV7mNqUNZ3i8WPxNC5zL63oAhRJH",
  });

  const [solPrice, setSolPrice] = useState<number>(150);

  return (
    <Card className="!border-ton-blue-950 w-full rounded-3xl">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>
          Overview of your referral performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-wrap break-all flex gap-12">
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-nowrap text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Total earnings in USD
          </h1>
          <span className="text-7xl">
            ${formatNumber(stats.totalEarningsSol * solPrice).combined}
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 text-lg">
            <h1
              className={
                "text-sm uppercase text-ton-blue-200/60 " + mono.className
              }
            >
              Total earnings in SOL
            </h1>
            <span>{formatNumber(stats.totalEarningsSol).combined}</span>
          </div>
          <div className="flex flex-col gap-1 text-lg">
            <h1
              className={
                "text-sm uppercase text-ton-blue-200/60 " + mono.className
              }
            >
              Referrals
            </h1>
            <span>{stats.referralsCount}</span>
          </div>
          <div className="flex flex-col gap-1 text-lg">
            <h1
              className={
                "text-sm uppercase text-ton-blue-200/60 " + mono.className
              }
            >
              Referral link
            </h1>
            <span><Link className={"styled " + mono.className} href={`https://titan.com/${stats.referralId}`}>https://titan.com/{stats.referralId}</Link></span>
          </div>
          <div className="flex flex-col gap-1 text-lg">
            <h1
              className={
                "text-sm uppercase text-ton-blue-200/60 " + mono.className
              }
            >
              Payout wallet
            </h1>
            <span className={mono.className}>{stats.receiverWallet}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
