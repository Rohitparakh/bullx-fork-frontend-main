"use client";

import { mono } from "@/app/fonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { isValidSolanaAddress, setSolBalance } from "@/lib/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { formatNumber } from "@/lib/utils";
import { useAppContext } from "@/context/appContext";
import { Eye, EyeOff, Clipboard } from "lucide-react";


export default function Settings() {
  // const [walletAddr, setWalletAddr] = useState<string>(
  //   "8rrSVS8Uosk2FvNipEkiyJTULajabRQ9EDLbWKrh79mZ",
  // );
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  const { user } = useAppContext();
  const [balanceInput, setBalanceInput ] = useState<number | string | undefined>("");
    const { data, isLoading, refetch } = useWalletAssets();

  const router = useRouter();

  const handleRefresh = () => {
    router.refresh(); // This refreshes the current route and revalidates server components
  };

  const [balance, setBalance] = useState<number>(data?.solBalance || 0);
  const [currency, setCurrency] = useState<string>("SOL");

 useEffect(() => {
    setBalance(data?.solBalance);
  }, [data])
  const handleBalanceInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {      
        const res = await setSolBalance(Number(balanceInput))
        // console.log("Res: ",res)
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
    <CardContent className="my-8 pb-0">
      <div className="mb-4 flex items-center whitespace-pre-line break-all">
        {/* <span>Public Key: {user?.pubKey}</span> */}
        {/* <button
          className="ml-2 p-1"
          onClick={() => copyToClipboard(user?.pubKey||"")}
        >
          <Clipboard size={18} />
        </button> */}
      </div>
      <div className="flex items-center ">
        <span>Private Key: </span>
        <span className="ml-2 whitespace-pre-line break-all">
          {/* {showPrivateKey ? user?.prvKey : "••••••••"} */}
        </span>
        <button
          className="ml-2 p-1"
          onClick={() => setShowPrivateKey(!showPrivateKey)}
        >
          {/* {showPrivateKey ? <EyeOff size={18} /> : <Eye size={18} />} */}
        </button>
        {/* {showPrivateKey && (
          <button
            className="ml-2 p-1"
            onClick={() => copyToClipboard(user?.prvKey||"")}
          >
            <Clipboard size={18} />
          </button>
        )} */}
      </div>
    </CardContent>
  </Card>
      
  );
}
