"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { DataTable } from "@/app/components/data-table";
import { Pair } from "@/app/types";
import { getPairColums } from "@/app/global";
import { useNewPairs } from "@/hooks/useNewPairs";
import router, { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useAppContext } from "@/context/appContext";
import { useWalletAssets } from "@/hooks/useWalletAssets";
//import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
//} from "@/components/ui/select";

export default function NewPairsData() {
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("SOL");
  const { data:walletData } = useWalletAssets();
  
  //const [timeframe, setTimeframe] = useState<string>("1m");
  //const [quickBuy, setQuickBuy] = useState<boolean>(true);
  const { data, isLoading } = useNewPairs();

  const columns = getPairColums(currency);
  const router = useRouter();
  // const user = useUser();
  const { setUser, user } = useAppContext();
  const pairs: Pair[] = [...data];
  // Placeholder values

  // const date = new Date();

  // const samplePair: Pair = {
  //   info: {
  //     image: "https://picsum.photos/200",
  //     symbol: "Woo",
  //     chain: "SOL",
  //     address: "flasdfkjasldkfjlasdkjf,ljkasdf;ljdaslf",
  //     tg: "dfasldjfl,asjfldas",
  //     x: "tasl,djflskajdf",
  //   },
  //   created: date,
  //   liquidity: {
  //     amount: 2534058043,
  //     amountUsd: 2345340985,
  //     differencePercentage: -3.908,
  //   },
  //   initialLiquidity: {
  //     amount: 304823,
  //     amountUsd: 45890450834,
  //   },
  //   mktCap: {
  //     amountUsd: 3480450485348,
  //     amount: 0.005345345,
  //   },
  //   txns: {
  //     green: 458,
  //     red: 9348,
  //   },
  //   vol: 945803485,
  //   auditResults: {
  //     mintAuthDisabled: true,
  //     freezeAuthDisabled: false,
  //     top10Holders: true,
  //   },
  // };
useEffect(() => {
  setBalance(walletData?.solBalance || 0);
}, [walletData])


  return (
    <div className="py-4 overflow-hidden h-full">
      <div className="mb-6 px-4 flex gap-4 justify-between items-center">
        <div className="flex gap-4 h-full items-center">
          <div>
            <Badge
              variant="outline"
              className="glass !border-[#8c003e] py-1 text-nowrap"
            >
              {balance.toFixed(2)} {currency}
            </Badge>
          </div>
        </div>
        {/* <Button size="sm" variant="secondary" className="flex gap-2">
          <IoMdSettings />
          Settings
        </Button> */}
      </div>
      <div className="lg:flex pb-12 h-full flex-row max-md:w-[calc(100vw_-_32px)]">
        <DataTable columns={columns} data={pairs} />
      </div>
    </div>
  );
}
