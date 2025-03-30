"use client";

import { mono } from "@/app/fonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { isValidSolanaAddress, setSolBalance } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Deposit() {
  const [walletAddr, setWalletAddr] = useState<string>(
    "8rrSVS8Uosk2FvNipEkiyJTULajabRQ9EDLbWKrh79mZ",
  );
  const [balanceInput, setBalanceInput ] = useState<number | string | undefined>("");

  const router = useRouter();

  const handleRefresh = () => {
    router.refresh(); // This refreshes the current route and revalidates server components
  };


  const handleBalanceInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {      
        const res = await setSolBalance(Number(balanceInput))
        console.log("Res: ",res)
      // @ts-ignore
        if ( res?.success === false ||  res?.status != 200){
          toast.error("Error occured");
        } else{
          toast.success("Changed your SOL balance")
          setBalanceInput("");
          handleRefresh();
        }
        // const isValid = isValidSolanaAddress(search);
        // if (!isValid) {
        //   toast.error("Input valid token address");
        //   return;
        // }
        // router.push(`/detail/${search}`);
      }
    };

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle className="!font-normal">
          Deposit to your Titan trading wallet.
        </CardTitle>
      </CardHeader> */}
      <CardContent className="flex flex-wrap gap-4 items-end mt-4">
        Write the required SOL balance:
        <Input 
        className={mono.className}
        placeholder="Change Balance"
        value={balanceInput}
        onKeyDown={handleBalanceInput}
        onChange={(e) => {
          setBalanceInput(e.target.value);
        }}/>
      </CardContent>
    </Card>
  );
}
