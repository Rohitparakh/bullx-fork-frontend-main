import { formatNumber } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";
import { AiOutlineAim } from "react-icons/ai";
import { FaGlobe, FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";
import { MemescopeItem } from "@/app/types";
import { useRouter } from "next/navigation";
import { RiTwitterXFill } from "react-icons/ri";
import { useFetchTokenImage } from "@/hooks/useFetchTokenImage";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MemescopeRow({ datum }: { datum: MemescopeItem }) {
  const router = useRouter();
  const handleSelect = (data: any) => {
    router.push(`/detail/${data}`);
  };

  const { tokenImage } = useFetchTokenImage(datum.address);
  return (
    <div
      onClick={() => handleSelect(datum.address)}
      className="cursor-pointer flex justify-between max-md:flex-nowrap flex-wrap items-center px-4 py-4 gap-3 border-b border-ton-blue-950/30"
    >
      <div className="flex gap-3">
        <div className="w-[58px] h-[58px] rounded-full">
          <CircularProgressbarWithChildren value={datum.bcprogress} className="z-10"
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgba(0, 153, 51, ${datum.bcprogress / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
           
          })}>
            <Image
              src={tokenImage || "/image.png"}
              alt={datum.symbol}
              height={100}
              width={100}
              className="h-12 w-12 rounded-full"
            />
          </CircularProgressbarWithChildren>
        </div>
        <div className="flex flex-col">
          <span className="flex gap-2 text-xs">
            {datum.symbol}
            <span className="text-ton-blue-200/50 text-xs w-24 truncate ">
              {datum.name}
            </span>
          </span>
          <span className="flex gap-2 text-xs items-center">
            <span className="w-24 truncate text-ton-blue-200/40">
              {datum.address}
            </span>
            <span className="flex gap-2 text-ton-blue-200/60">
              {datum.tg && (
                <Link
                  className="hover:text-ton-blue-200"
                  href={datum.tg}
                  target="_blank"
                >
                  <FaTelegramPlane />
                </Link>
              )}
              {datum.x && (
                <Link
                  className="hover:text-ton-blue-200"
                  href={datum.x}
                  target="_blank"
                >
                  <RiTwitterXFill />
                </Link>
              )}
              {datum.web && (
                <Link
                  className="hover:text-ton-blue-200"
                  href={datum.web}
                  target="_blank"
                >
                  <FaGlobe />
                </Link>
              )}
            </span>
          </span>
          <span className="text-xs">{moment(datum.created).fromNow()}</span>
          <span className="flex mt-1 text-xs gap-2">
            <span className="text-ton-blue-200/60">
              T10:{" "}
              <span className="text-ton-blue-200">{datum.top10Percent}%</span>
            </span>
            <span className="text-ton-blue-200/60">
              DH:{" "}
              <span className="text-ton-blue-200">
                {datum.devHoldingsPercent}%
              </span>
            </span>
            <span className="flex gap-1 items-center text-ton-blue-200/60">
              <AiOutlineAim />{" "}
              <span className="text-ton-blue-200">{datum.snipers}</span>
            </span>
          </span>
        </div>
      </div>
      <div className="text-xs flex flex-col gap-2">
        <span className="flex justify-between gap-2 items-center text-ton-blue-200">
          <span className="text-ton-blue-200/60">Holders</span> {datum.holders}
        </span>
        <span className="flex justify-between gap-2 items-center text-ton-blue-200">
          <span className="text-ton-blue-200/60">Vol.</span>{" "}
          {formatNumber(datum.volume).combined}
        </span>
        <span className="flex justify-between gap-2 items-center text-ton-blue-200">
          <span className="text-ton-blue-200/60">MktCap.</span>{" "}
          {formatNumber(datum.marketCap).combined}
        </span>
      </div>
    </div>
  );
}
