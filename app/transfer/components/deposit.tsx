"use client";

import { mono } from "@/app/fonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Deposit() {
  const [walletAddr, setWalletAddr] = useState<string>(
    "8rrSVS8Uosk2FvNipEkiyJTULajabRQ9EDLbWKrh79mZ",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="!font-normal">
          Deposit to your Titan trading wallet.
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-end mt-4">
        Send the amount you want to transfer to the following address:
        <Input value={walletAddr} className={mono.className}/>
      </CardContent>
    </Card>
  );
}
