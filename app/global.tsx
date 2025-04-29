import { SortedHeader } from "@/app/components/sortedCol";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import moment from "moment";
import { formatNumber } from "@/lib/utils";
import { IoCloseCircle, IoShieldCheckmark } from "react-icons/io5";
import { Pair } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/router";
import { useFetchTokenImage } from "@/hooks/useFetchTokenImage";
import CellImage from "./components/cellImage";

type PairInfoFilter = {
  symbol: string;
  chain: string;
  address: string;
};

type CurUsdFilter = {
  cur: [number, number];
  usd: [number, number];
};

type AuditFilter = {
  mintAuthDisabled: boolean;
  freezeAuthDisabled: boolean;
  top10Holders: boolean;
};

function curUsdFilterFn(row: any, _columnId: any, filterValues: CurUsdFilter) {
  const cur: number = row.original.liquidity.amount;
  const usd: number = row.original.liquidity.amountUsd;

  let [curMin, curMax]: [number, number] = filterValues.cur;
  let [usdMin, usdMax]: [number, number] = filterValues.usd;
  curMin = curMin ?? -Infinity;
  curMax = curMax ?? Infinity;
  usdMin = usdMin ?? -Infinity;
  usdMax = usdMax ?? Infinity;
  return cur >= curMin && cur <= curMax && usd >= usdMin && usd <= usdMax;
}

function CurUsdCustomFilter({
  currency,
  column,
  children,
}: {
  currency: string;
  column: any;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      Filter {children} within range
      <div className="flex flex-col gap-2">
        {currency}
        <div className="flex gap-2">
          <Input
            className="!bg-background/40 glass"
            value={
              (((column?.getFilterValue() as CurUsdFilter)?.cur as
                | [number, number]
                | undefined as [number, number]) ?? [-Infinity, Infinity])[0]
            }
            onChange={(e) => {
              let data: CurUsdFilter =
                (column.getFilterValue() as CurUsdFilter) ?? {
                  cur: [-Infinity, Infinity],
                  usd: [-Infinity, Infinity],
                };
              const newVal = e.target.value.trim();
              if (!newVal) {
                data.cur[0] = -Infinity;
              } else {
                data.cur[0] = parseFloat(newVal);
              }
              column.setFilterValue(data);
            }}
            placeholder="Minimum"
            type="number"
          />
          <Input
            className="!bg-background/40 glass"
            value={
              (((column?.getFilterValue() as CurUsdFilter)?.cur as
                | [number, number]
                | undefined as [number, number]) ?? [-Infinity, Infinity])[1]
            }
            onChange={(e) => {
              let data: CurUsdFilter =
                (column.getFilterValue() as CurUsdFilter) ?? {
                  cur: [-Infinity, Infinity],
                  usd: [-Infinity, Infinity],
                };
              const newVal = e.target.value.trim();
              if (!newVal) {
                data.cur[1] = Infinity;
              } else {
                data.cur[1] = parseFloat(newVal);
              }
              column.setFilterValue(data);
              column.setFilterValue(data);
            }}
            placeholder="Maximum"
            type="number"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        USD
        <div className="flex gap-2">
          <Input
            className="!bg-background/40 glass"
            value={
              (((column?.getFilterValue() as CurUsdFilter)?.usd as
                | [number, number]
                | undefined as [number, number]) ?? [-Infinity, Infinity])[0]
            }
            onChange={(e) => {
              let data: CurUsdFilter =
                (column.getFilterValue() as CurUsdFilter) ?? {
                  cur: [-Infinity, Infinity],
                  usd: [-Infinity, Infinity],
                };
              const newVal = e.target.value.trim();
              if (!newVal) {
                data.usd[0] = -Infinity;
              } else {
                data.usd[0] = parseFloat(newVal);
              }
              column.setFilterValue(data);
            }}
            placeholder="Minimum"
            type="number"
          />
          <Input
            className="!bg-background/40 glass"
            value={
              (((column?.getFilterValue() as CurUsdFilter)?.usd as
                | [number, number]
                | undefined as [number, number]) ?? [-Infinity, Infinity])[1]
            }
            onChange={(e) => {
              let data: CurUsdFilter =
                (column.getFilterValue() as CurUsdFilter) ?? {
                  cur: [-Infinity, Infinity],
                  usd: [-Infinity, Infinity],
                };
              const newVal = e.target.value.trim();
              if (!newVal) {
                data.usd[1] = Infinity;
              } else {
                data.usd[1] = parseFloat(newVal);
              }
              column.setFilterValue(data);
            }}
            placeholder="Maximum"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

export function getPairColums(currency: string) {
  const pairColumns: ColumnDef<Pair>[] = [
    {
      accessorKey: "info",
      header: ({ column }) => {
        return (
          <SortedHeader
            column={column}
            filter={false}
          >
            Pair Info
          </SortedHeader>
        );
      },
      filterFn: (row, columnId, filterValue: PairInfoFilter) => {
        const {
          symbol,
          chain,
          address,
        }: {
          image: string;
          symbol: string;
          chain: string;
          address: string;
          tg?: string;
          x?: string;
        } = row.getValue("info");

        return (
          symbol.toLowerCase().includes(filterValue.symbol.toLowerCase()) &&
          chain.toLowerCase().includes(filterValue.chain.toLowerCase()) &&
          address.toLowerCase().includes(filterValue.address.toLowerCase())
        );
      },
      cell: ({ row }) => {
        const {
          symbol,
          chain,
          address,
          tg,
          x,
        }: {
          symbol: string;
          chain: string;
          address: string;
          tg?: string;
          x?: string;
        } = row.getValue("info");
   
        return (
          <div className="flex gap-4 items-center mr-12">
            {address ? (
              <CellImage address={address} />
            ) : null}
            <div className="flex flex-col">
              <span>
                {symbol}
                <span className="text-xs">/{chain}</span>
              </span>
              <span className="w-6 md:w-12 lg:w-24 truncate">{address}</span>
              <div className="flex gap-2">
                {tg && (
                  <Link href={tg} target="_blank">
                    <FaTelegram className="h-6" />
                  </Link>
                )}
                {x && (
                  <Link href={x} target="_blank">
                    <RiTwitterXFill className="h-6" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "created",
      header: ({ column }) => {
        return (
          <SortedHeader column={column} filter={false}>
            Created
          </SortedHeader>
        );
      },

      cell: ({ row }) => {
        const date: Date = row.getValue("created");
        return moment(date).fromNow();
      },
    },
    {
      accessorKey: "liquidity",
      header: ({ column }) => {
        return (
          <SortedHeader
            column={column}
           filter={false}
          >
            Liquidity
          </SortedHeader>
        );
      },
      filterFn: curUsdFilterFn,
      cell: ({ row }) => {
        const {
          amount,
          amountUsd,
          differencePercentage,
        }: { amount: number; amountUsd: number; differencePercentage: number } =
          row.getValue("liquidity");

        return (
          <div className="flex flex-col justify-center h-full">
            <span>
              {/* {formatNumber(amount).combined} {currency} */}
              <span className="text-sm text-ton-blue-200">
                ${formatNumber(amountUsd).combined}
              </span>
            </span>
            {/* <span
              className={
                "text-xs " +
                (differencePercentage >= 0 ? "text-green-500" : "text-red-500")
              }
            >
              {differencePercentage > 0 && "+"}
              {differencePercentage}%
            </span> */}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "initialLiquidity",
    //   header: ({ column }) => {
    //     return (
    //       <SortedHeader
    //         column={column}
    //         filterInputType="number"
    //         customFilter={
    //           <CurUsdCustomFilter column={column} currency={currency}>
    //             initial liquidity
    //           </CurUsdCustomFilter>
    //         }
    //       >
    //         Initial Liquidity
    //       </SortedHeader>
    //     );
    //   },
    //   filterFn: curUsdFilterFn,
    //   cell: ({ row }) => {
    //     const {
    //       amount,
    //       amountUsd,
    //     }: { amount: number; amountUsd: number; differencePercentage: number } =
    //       row.getValue("initialLiquidity");

    //     return (
    //       <span>
    //         {formatNumber(amount).combined} {currency}
    //         <span className="text-ton-blue-200">
    //           /${formatNumber(amountUsd).combined}
    //         </span>
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: "mktCap",
      header: ({ column }) => {
        return (
          <SortedHeader
            column={column}
            filter={false}
          >
            Market Cap
          </SortedHeader>
        );
      },
      filterFn: curUsdFilterFn,
      cell: ({ row }) => {
        const { amount, amountUsd }: { amount: number; amountUsd: number } =
          row.getValue("mktCap");

        return (
          <span className="flex flex-col">
            <span className="text-ton-blue-200">
              {formatNumber(amountUsd).combined}
            </span>
            {/* ${amount.toFixed(6)} */}
          </span>
        );
      },
    },
    {
      accessorKey: "txns",
      header: ({ column }) => {
        return (
          <SortedHeader column={column} filter={false}>
            Transactions
          </SortedHeader>
        );
      },
      filterFn: (row, columnId: string, filterValue: [number, number]) => {
        let [min, max] = filterValue;
        min = min ?? -Infinity;
        max = max ?? Infinity;
        if (isNaN(min)) min = -Infinity;
        if (isNaN(max)) max = Infinity;

        const rowValue = row.original.txns.green + row.original.txns.red;
        return rowValue >= min && rowValue <= max;
      },
      cell: ({ row }) => {
        const { red, green }: { red: number; green: number } =
          row.getValue("txns");

        return (
          <div className="flex flex-col justify-center h-full">
            <span>{formatNumber(red + green).combined}</span>
            <span className="text-xs ">
              <span className="text-green-500">{green}</span>
              &nbsp;/ &nbsp;
              <span className="text-red-500">{red}</span>
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "vol",
      header: ({ column }) => {
        return (
          <SortedHeader column={column}  filter={false}>
            Volume
          </SortedHeader>
        );
      },
      filterFn: "inNumberRange",
      cell: ({ row }) => {
        const vol: number = row.getValue("vol");
        console.log("VOL",vol)
        // if(vol == "0") return 0;
        return formatNumber(vol).combined;
      },
    },
    {
      accessorKey: "auditResults",
      header: ({ column }) => {
        return (
          <SortedHeader
            column={column}
            filter={false}
          >
            Audit Results
          </SortedHeader>
        );
      },
      filterFn: (row, columnId, filterValue: any) => {
        const rowValues: any = row.getValue(columnId);

        const trueKeysX = Object.keys(rowValues).filter(
          (key) => rowValues[key] === true
        );
        const trueKeysF = Object.keys(filterValue).filter(
          (key) => filterValue[key] === true
        );

        return trueKeysF.every((i) => trueKeysX.includes(i));
      },
      cell: ({ row }) => {
        const {
          mintAuthDisabled,
          freezeAuthDisabled,
          top10Holders,
        }: {
          mintAuthDisabled: boolean;
          freezeAuthDisabled: boolean;
          top10Holders: boolean;
        } = row.getValue("auditResults");

        return (
          <div className="">
            <div className={"flex gap-2 "}>
              {mintAuthDisabled ? (
                <IoShieldCheckmark className="text-green-400" />
              ) : (
                <IoCloseCircle className="text-red-500" />
              )}
              Mint Auth Disabled
            </div>
            <div className={"flex gap-2 "}>
              {freezeAuthDisabled ? (
                <IoShieldCheckmark className="text-green-400" />
              ) : (
                <IoCloseCircle className="text-red-500" />
              )}
              Freeze Auth Disabled
            </div>
            <div className={"flex gap-2 "}>
              {" "}
              {top10Holders ? (
                <IoShieldCheckmark className="text-green-400" />
              ) : (
                <IoCloseCircle className="text-red-500" />
              )}
              Top 10 Holders
            </div>
          </div>
        );
      },
    },
    //{
    //  accessorKey: "quickBuy",
    //  header: "Action",
    //  cell: ({ row }) => {
    //    const { onClick }: { onClick: () => void } = row.getValue("quickBuy");
    //    return <Button onClick={onClick}>Quick Buy</Button>;
    //  },
    //},
  ];
  return pairColumns;
}
