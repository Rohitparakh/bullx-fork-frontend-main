"use client";

import { DataTable } from "@/app/components/data-table";
import { Payout } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const sample: Payout = {
  payoutSol: 100,
  wallet: "6BecuGmLuD7JJEbQuV7mNqUNZ3i8WPxNC5zL63oAhRJH",
  date: new Date(),
};

const samplePlaces: Payout[] = new Array(50).fill(sample);

export default function Payouts() {
  const [places, setPlaces] = useState<Payout[]>(samplePlaces);
  const [solPrice, setSolPrice] = useState<number>(150);

  const columns: ColumnDef<Payout>[] = [
    { accessorKey: "payoutSol", header: "Payout (in SOL)" },
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
    { accessorKey: "date", header: "Payout Date" },
  ];

  return <DataTable columns={columns} data={places} />;
}
