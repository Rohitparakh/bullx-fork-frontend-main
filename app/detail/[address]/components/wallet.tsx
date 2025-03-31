import { useWalletAssets } from "@/hooks/useWalletAssets";
import { useState } from "react";

import Position from "./position";
import CopyToClipboard from "@/app/components/copyToClipboard";
import { useToken } from "@/hooks/useToken";

interface WalletProps {
  address: string | undefined;
}


export default function Wallet({address}:WalletProps) {
  const token = useToken();
  const { data, isLoading, refetch } = useWalletAssets();
  const [state, setState] = useState<boolean>(true);
  let positionData = (data?.tokenList.find((item:any) => item.mint ===token?.mintAddress))
  // console.log(data?.tokenList)
  // console.log(address)
  return (
    <>
      {data && (
        <div className="w-full text-sm">
          <div className="flex justify-between border-b border-b-[#8c003e] p-3">
            <div className="font-bold text-lime-300">SOL </div>
            <div className="font-bold text-lime-300">{parseFloat(data?.solBalance?.toFixed(3))}</div>
          </div>
          <div>
            {data.tokenList.map((token: any, index: number) => {
             if(token?.amount && token?.mint == address){
              return (
                <div className="flex gap-2 justify-between  border-b border-b-[#8c003e] p-3" key={index}>
                  <div className="flex gap-1">{token?.symbol}<CopyToClipboard text={token?.mint}></CopyToClipboard></div>
                  
                  <div className="flex gap-1">
                    <div>{parseFloat(token?.amount?.toFixed(5))}</div>
                    
                  </div>
                </div>
              );
             }
            })}
          </div>
          <div className="flex justify-between p-3">
            <div className="font-bold text-lime-300">Total wallet value</div>
            <div className="font-bold text-lime-300">
              ${parseFloat((data.totalValue ).toFixed(3))}
            </div>
          </div>
        </div>
      )}
      
       <Position data={[positionData, data?.solPrice]}/>
    </>
  );
}
