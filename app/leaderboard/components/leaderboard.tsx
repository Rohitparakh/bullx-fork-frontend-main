"use client"

import { DataTable } from "@/app/components/data-table";
import { LeaderboardPlace } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const sample: LeaderboardPlace = {
  ranking: 1,
  wallet: "sdafdjlfhjk908fajfljalsdfjasdlkjfldjkalsdfjlsdk",
  totalPoints: 1293789789478,
  weekPoints: 789789,
};

const samplePlaces: LeaderboardPlace[] = new Array(50).fill(sample);

export default function Leaderboard() {
  const [places, setPlaces] = useState<LeaderboardPlace[]>(samplePlaces);

  const columns: ColumnDef<LeaderboardPlace>[] = [
    { accessorKey: "ranking", header: "Ranking" },
    {
      accessorKey: "wallet",
      header: "Wallet",
      cell: ({ row }) => (
        <div className="flex w-full">
          <span className="truncate w-12 lg:w-24">
            {row.getValue("wallet")!}
          </span>
        </div>
      ),
    },
    { accessorKey: "totalPoints", header: "Total points" },
    { accessorKey: "weekPoints", header: "7-days points" },
  ];

  return <DataTable columns={columns} data={places} />;
}
