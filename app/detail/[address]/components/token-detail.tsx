import { useParams } from "next/navigation";
import { convertToString } from "@/lib/utils";
import { fetchTokenDetails } from "@/lib/api";
import { useFetchTokenDetails } from "@/hooks/useFetchTokenDetails";
import { useAppContext } from "@/context/appContext";
import React from "react";
import moment from "moment";
import { useNewPairs } from "@/hooks/useNewPairs";

export default function TokenDetail({data}:any) {
  const { token } = useAppContext();
  
  // const { data, isLoading } = useNewPairs();
  

  //   const trades = [
  //     { time: '1m', type: 'S', price: '0.2814', total: '0.1562' },
  //     { time: '2m', type: 'S', price: '0.2843', total: '0.1578' },
  //     { time: '2m', type: 'B', price: '0.2856', total: '0.0200' },
  //     { time: '3m', type: 'S', price: '0.2931', total: '0.8135' },
  //     { time: '3m', type: 'S', price: '0.3026', total: '0.1679' },
  //     { time: '3m', type: 'S', price: '0.3148', total: '1.09' },
  //     { time: '4m', type: 'S', price: '0.3294', total: '0.3658' },
  //     { time: '4m', type: 'B', price: '0.3154', total: '1.75' },
  //     { time: '4m', type: 'B', price: '0.2889', total: '1' },
  //   ];

  const trades = data?.data?.transactions.map((transaction: any) => {
    const date: any = transaction.timestamp * 1000;
    const type: string =
      transaction.tokenOut == "So11111111111111111111111111111111111111112"
        ? "S"
        : "B";
    return {
      time: moment(date).fromNow(),
      type,
      price: transaction.suspectedBaseTokenPriceUSD,
      total: transaction.amountUSD,
    };
  });

  return (
    <div className="flex-1  overflow-auto h-1/2 max-md:max-w-[calc(100vw_-_32px)]">
      <table className="min-w-full max-w-[100vw] text-left table-auto border-collapse overflow-scroll">
        <thead className="sticky top-0">
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Time</th>
            <th className="p-2">Type</th>
            <th className="p-2">Price(USD)</th>
            <th className="p-2">Total(USD)</th>
          </tr>
        </thead>
        <tbody className="overflow-scroll h-40">
          {trades?.map((row: any, index: any) => (
            <tr
              key={index}
              className={`p-2 ${
                index % 2 === 0 ? "bg-slate-850" : "bg-slate-900"
              }`}
            >
              <td className="p-2">{row.time}</td>
              <td
                className={`p-2 ${
                  row.type === "S" ? "text-red-500" : "text-green-500"
                }`}
              >
                {row.type}
              </td>
              <td className="p-2">{row.price}</td>
              <td className="p-2">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
