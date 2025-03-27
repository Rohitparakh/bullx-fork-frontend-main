import { formatNumber } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineAim } from "react-icons/ai";
import { FaGlobe, FaTelegramPlane, FaUser } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MemescopeItem } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import router, {useRouter} from "next/navigation";
import MemescopeRow from "./memescope-row";

export default function MemescopeColumn({
  title,
  data,
}: {
  title: string;
  data: MemescopeItem[];
}) {
  const router = useRouter();
  const { setToken } = useAppContext();

  
  return (
    <div className="max-h-screen lg:max-h-full border rounded-3xl border-ton-blue-950 w-full h-full overflow-hidden">
      <div className="w-full h-full">
        <div className="p-4 sticky top-0 w-full text-ton-blue-200  border-b border-ton-blue-950">
          <h1 className="text-xl">{title}</h1>
        </div>
        <div className="pb-16 flex flex-col h-full overflow-auto">
          {data &&
            data.map((datum:MemescopeItem, i) => (
              <MemescopeRow datum={datum} key={i}></MemescopeRow>
            ))}
        </div>
      </div>
    </div>
  );
}
