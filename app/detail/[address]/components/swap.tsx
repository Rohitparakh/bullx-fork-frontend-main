import { useCallback, useState, useMemo, useEffect } from "react";
import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import { sendTrade } from "@/lib/api";
import Wallet from "./wallet";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SwapProps {
  address: string | undefined;
}

export default function Swap({ address }: SwapProps) {
// export default function Swap({ address }: SwapProps, tokenData:any) {
  const { setUser } = useAppContext();
  const token = useToken();
  const user = useUser();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [isTrading, setIsTrading] = useState<boolean>(false); // Track trade status
  const [isDataLoading, setIsLoading] = useState<boolean>(false); // Track trade status
  const { data, isLoading, refetch } = useWalletAssets();

  const tokenBalance = useMemo(() => {
    if (!data) return 0;
    const currentToken = data.tokenList.find(
      (item: any) => item.mint == token?.mintAddress
    );
    return currentToken ? currentToken.amount : 0;
  }, [data]);

  // useEffect(() => {
  //   if(!tokenData){
  //     setIsLoading(true)
  //   } else{
  //     setIsLoading(false)
  //   }
  // }, [tokenData])
  
  useEffect(()=>{
    setAmount(isBuy?1:0)
  },[isBuy])

  const trade = useCallback(async () => {
    if (!user?.prvKey) return;
    setIsTrading(true); // Disable button while trading
    const result = await sendTrade(token?.mintAddress, amount, user?.prvKey, isBuy);
    console.log("result")
    console.log(result)
    // await refetch(); 
    setAmount(isBuy?1:0)
    setIsTrading(false); // Enable button after refetch
    if(result.success){
      toast.success("Trade successful")
    } else{
      toast.error("Error Occured!")
    }
  }, [token, user, amount, isBuy]);

  return (
    <div className="md:w-80 w-full gap-2 mt-4 md:mt-0 md:mx-2 mb-2 box-border items-center rounded-3xl flex flex-col h-full p-6 bg-neutral-950 glass border border-[#8c003e] overflow-auto">
      <div className="flex justify-around gap-2 w-full">
        <button
          className={`px-8 py-2 rounded-md border ${
            isBuy ? `border-[#8c003e]` : `border-transparent`
          }`}
          onClick={() => setIsBuy(true)}
        >
          Buy
        </button>
        <button
          className={`px-8 py-2 rounded-md border ${
            !isBuy ? `border-[#8c003e]` : `border-transparent`
          }`}
          onClick={() => setIsBuy(false)}
        >
          Sell
        </button>
      </div>
      
      <div className="flex items-center bg-transparent text-white p-[1px] m-2 border border-[#8c003e] rounded-md w-full">
        <label htmlFor="amount" className="text-sm text-gray-400 px-1">
          {isBuy ? "SOL" : "Tokens"}
        </label>
        <input
          type="number"
          id="amount"
          className="bg-transparent border-none text-sm outline-none text-white p-1 rounded-md w-full"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Preset Buttons */}
      {isBuy ? (
        <div className="flex w-full justify-between m-2">
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(0)}>Reset</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(0.1)}>0.1 SOL</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(0.5)}>0.5 SOL</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(1)}>1 SOL</button>
        </div>
      ) : (
        <div className="flex w-full justify-between m-2">
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(0)}>Reset</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(tokenBalance * 0.25)}>25%</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(tokenBalance * 0.5)}>50%</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(tokenBalance * 0.75)}>75%</button>
          <button className="px-1.5 text-white bg-black rounded-md" onClick={() => setAmount(tokenBalance)}>100%</button>
        </div>
      )}

      {/* Trade Button */}
      <button
        className={`bg-[#8c003e] w-full text-white rounded-md p-2 m-2 
          hover:bg-ton-blue-700 transition ${
            isTrading || isLoading ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
        onClick={trade}
        disabled={isTrading || isLoading || isDataLoading} // Disable when trading or loading
      >
        {isTrading ? "Processing..." : "Trade"}
      </button>

      <Wallet address={address} />
    </div>
  );
}
