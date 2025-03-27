import { useCallback, useState, useMemo, useEffect } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { transparent } from "tailwindcss/colors";
import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import { sendTrade } from "@/lib/api";
import Wallet from "./wallet";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";

interface SwapProps {
  address: string | undefined;
}

export default function Swap({address}:SwapProps) {
  const { setUser } = useAppContext();
  const token = useToken();
  const user = useUser();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const { data, isLoading, refetch } = useWalletAssets();
  const tokenBalance = useMemo(() => {
    if (!data) return 0;
    const currentToken = data.tokenList.find(
      (item: any) => item.mint == token?.mintAddress
    );
    if (currentToken) return currentToken?.amount;
    else return 0;
  }, [data]);

  const trade = useCallback(() => {
    if (user?.prvKey)
      sendTrade(token?.mintAddress, amount, user?.prvKey, isBuy);
  }, [token, user, amount, isBuy]);

  return (
    <div className="md:w-80 w-full gap-2 mt-4 md:mt-0 md:mx-2 mb-2 box-border items-center rounded-3xl flex flex-col h-full p-6 bg-neutral-950 glass border border-[#8c003e] overflow-auto">
      <div className="flex justify-around gap-2 w-full">
        {/* <HoverBorderGradient className="flex items-center gap-2 hover:text-ton-blue-300 transition-all duration-1000 text-ton-blue-200"> */}
        <button
          className={`px-8 py-2 rounded-md border ${
            isBuy ? `border-[#8c003e]` : `border-transparent`
          }`}
          onClick={() => {
            setIsBuy(true);
          }}
        >
          Buy
        </button>
        {/* </HoverBorderGradient> */}

        {/* <HoverBorderGradient className="flex items-center gap-2 hover:text-ton-blue-300 transition-all duration-1000 text-ton-blue-200"> */}
        <button
          className={`px-8 py-2 rounded-md border ${
            !isBuy ? `border-[#8c003e]` : `border-transparent`
          }`}
          onClick={() => {
            setIsBuy(false);
          }}
        >
          Sell
        </button>
        {/* </HoverBorderGradient> */}
      </div>
      <div className="flex items-center bg-transparent text-white p-[1px] m-2 border border-[#8c003e] rounded-md w-full">
        <label htmlFor="amount" className="font text-sm text-gray-400 px-1">
          SOL
        </label>
        <input
          type="number"
          id="amount"
          className="bg-transparent border-none text-sm outline-none text-white p-1 rounded-md w-full"
          placeholder="0"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
        />
      </div>
      {isBuy ? (
        <div className="flex w-full justify-between m-2">
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(0);
            }}
          >
            reset
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(0.1);
            }}
          >
            0.1sol
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(0.5);
            }}
          >
            0.5sol
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(1);
            }}
          >
            1sol
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-between m-2">
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(0);
            }}
          >
            reset
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(tokenBalance * 0.25);
            }}
          >
            25%
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(tokenBalance * 0.5);
            }}
          >
            50%
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(tokenBalance * 0.75);
            }}
          >
            75%
          </button>
          <button
            className="px-1.5 text-white bg-black rounded-md"
            onClick={() => {
              setAmount(tokenBalance);
            }}
          >
            100%
          </button>
        </div>
      )}
      <button
        className=" bg-[#8c003e] w-full text-white rounded-md p-2 m-2 hover:bg-ton-blue-700 "
        onClick={trade}
      >
        Trade
      </button>
      <Wallet address={address}/>
    </div>
  );
}
