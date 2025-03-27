"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState, useCallback } from "react";
import { IoMdSettings } from "react-icons/io";
import { DataTable } from "@/app/components/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pair } from "@/app/types";
import StatsCard from "./stats";
import { getPairColums } from "@/app/global";
import { useAppContext } from "@/context/appContext";
import { useTrending } from "@/hooks/useTrending";
import { useWalletAssets } from "@/hooks/useWalletAssets";

export default function TrendingData() {
  const { user } = useAppContext();
  const { data } = useWalletAssets();
  const [balance, setBalance] = useState<number>(user?.solBalance || 0);
  const [currency, setCurrency] = useState<string>("SOL");
  const [timeframe, setTimeframe] = useState<string>("300");

  // Fetch trending data
  const { createdData, isLoading, refetch } = useTrending(timeframe);
  const [pairs, setPairs] = useState<Pair[]>([]); // Initialize with API data

  // Function to update pairs when data changes (Avoid unnecessary state updates)
  // useEffect(() => {
  //   if (createdData.length !== pairs.length) {
  //     setPairs(createdData);
  //   }
  // }, [createdData]);
  useEffect(() => {
    if (createdData && createdData.length !== pairs.length) {
      // @ts-ignore
      setPairs(createdData);
    }
  }, [createdData]);

  // Function to fetch data when timeframe changes
  useEffect(() => {
    refetch();
  }, [timeframe]);
 
  useEffect(() => {
    setBalance(data?.solBalance);
  }, [data]);

  const columns = getPairColums(currency);

  return (
    <div className="grow h-full flex flex-col gap-4">
      <div className="px-4 flex gap-4 justify-between items-center">
        <div className="flex gap-4 h-full items-center">
          <Select
            onValueChange={(e) => setTimeframe(e)}
            value={timeframe}
          >
            {/* <SelectTrigger className="min-w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger> */}
            <SelectContent>
              <SelectItem value="60">1 minute</SelectItem>
              <SelectItem value="300">5 minutes</SelectItem>
              <SelectItem value="1800">30 minutes</SelectItem>
              <SelectItem value="3600">1 hour</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Badge
              variant="outline"
              className="glass !border-[#8c003e] py-1 text-nowrap"
            >
              {balance?.toFixed(2)} {currency}
            </Badge>
          </div>
        </div>
        {/* <Button size="sm" variant="secondary" className="flex gap-2">
          <IoMdSettings />
          Settings
        </Button> */}
      </div>
      {/* <StatsCard /> */}
      <div className="h-[200vh] lg:h-full grow flex lg:overflow-hidden flex-col lg:flex-row gap-4">
        <DataTable columns={columns} data={pairs} />
      </div>
    </div>
  );
}
