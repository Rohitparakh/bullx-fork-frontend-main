"use client";

import { HistoryEntry } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useState } from "react";
import { DataTable } from "@/app/components/data-table";
import { formatNumber } from "@/lib/utils";

const date = new Date();

const sampleEntry: HistoryEntry = {
  date,
  from: "248038401293849083sch",
  to: "sdalkfhsdkjahf238947932749",
  currency: "SOL",
  value: 344792374,
  txSig: "058429054085b34kl45hkj3245kh4lk23jh5495872904753",
};

const sampleEntries: HistoryEntry[] = new Array(100).fill(sampleEntry);

export default function History() {
  const [entries, setEntires] = useState<HistoryEntry[]>(sampleEntries);

  const columns: ColumnDef<HistoryEntry>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => moment(row.getValue("date")!).fromNow(),
    },
    {
      accessorKey: "value",
      header: "Amount",
      cell: ({ row }) => `${formatNumber(row.getValue("value")).combined} ${row.original.currency}`,
    },
    {
      accessorKey: "txSig",
      header: "Transaction signature",
    },
    {
      accessorKey: "from",
      header: "From",
    },
    {
      accessorKey: "to",
      header: "To",
    },
  ];

  return <DataTable columns={columns} data={entries} />;
}
