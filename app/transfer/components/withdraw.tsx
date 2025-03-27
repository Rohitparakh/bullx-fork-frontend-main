"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function Deposit() {
  const [amount, setAmount] = useState<number>(0);
  const [priorityFee, setPriorityFee] = useState<number>(0.00001);
  const [walletAddr, setWalletAddr] = useState<string>(
    "8rrSVS8Uosk2FvNipEkiyJTULajabRQ9EDLbWKrh79mZ",
  ); // titon addr
  const [receiverAddr, setReceiverAddr] = useState<string>(""); // their addr
  const [withdrawButtonEnabled, setWithdrawButtonEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    if (receiverAddr && amount) {
      setWithdrawButtonEnabled(true);
    } else {
      setWithdrawButtonEnabled(false);
    }
  }, [amount, receiverAddr]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="!font-normal">
          Withdraw from your Titan trading wallet to your wallet.
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-8 items-end mt-4">
        <div className="flex flex-col gap-2">
          <Label>Amount to withdraw</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Withdraw from</Label>
          <Input disabled value={walletAddr} className="!bg-ton-blue-950" />
        </div>{" "}
        <div className="flex flex-col gap-2">
          <Label>Withdraw to</Label>
          <Input
            value={receiverAddr}
            onChange={(e) => {
              setReceiverAddr(e.target.value);
            }}
          />
        </div>
        <Button variant="secondary" disabled={!withdrawButtonEnabled}>
          Withdraw
        </Button>
        <div className="flex flex-col gap-2">
          <Label>Priority fee</Label>
          <Input
            type="number"
            value={priorityFee}
            onChange={(e) => {
              setPriorityFee(parseFloat(e.target.value));
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
