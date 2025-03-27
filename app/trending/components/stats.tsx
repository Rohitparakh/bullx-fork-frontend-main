"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { TrendingStats } from "@/app/types";
import { mono } from "@/app/fonts";
import { formatNumber } from "@/lib/utils";
import moment from "moment";

const date = new Date();

export default function StatsCard() {
  const [stats, setStats] = useState<TrendingStats>({
    totalVol: 234957234957,
    timeframe: "24 hours",
    txns: 3048029384,
    latestBlock: {
      value: 2323408239,
      date: date,
    },
  });

  return (
    <Card className="!border-ton-blue-950 w-full rounded-3xl">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Summary of trending coins in the last {stats.timeframe}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Total volume
          </h1>
          <span>{formatNumber(stats.totalVol).combined}</span>
        </div>
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Total transactions
          </h1>
          <span>{stats.txns}</span>
        </div>{" "}
        <div className="flex flex-col gap-1 text-lg">
          <h1
            className={
              "text-sm uppercase text-ton-blue-200/60 " + mono.className
            }
          >
            Latest block
          </h1>
          <div className="flex gap-2 items-end">
            <span>{stats.latestBlock.value}</span>
            <span className="text-ton-blue-200/60 text-sm">
              {moment(stats.latestBlock.date).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
