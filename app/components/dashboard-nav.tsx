"use client";
import logo from "@/public/conclaveLogo.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaHistory, FaLink } from "react-icons/fa";
import { IoMdLogOut, IoMdSwap } from "react-icons/io";
import {
  IoDocumentText,
  IoLanguage,
  IoSettingsSharp,
  IoTelescope,
} from "react-icons/io5";
import { RiFundsFill } from "react-icons/ri";
import { MdLeaderboard, MdOutlineWhatshot } from "react-icons/md";
import { GrNew } from "react-icons/gr";
import { brand } from "../fonts";
import { formatNumber } from "@/lib/utils";
import { useAppContext } from "@/context/appContext";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { useRouter } from "next/navigation";



export default function DashboardNav({
  className,
  innerClassName,
  additionalButton,
  closeMenu
}: {
  className?: string;
  innerClassName?: string;
  additionalButton?: React.ReactNode;
  closeMenu?: ()=>void;
}) {
    const { user , setUser, id, setId } = useAppContext();
    // const { privateKey, user, setPrivateKey, setPublicKey, setUser } = useAppContext();
    const { data, isLoading, refetch } = useWalletAssets();
    const router = useRouter();
    
  const [balance, setBalance] = useState<number>(data?.solBalance || 0);
  const [currency, setCurrency] = useState<string>("SOL");
  useEffect(() => {
    setBalance(data?.solBalance);
  }, [data])
  
  const logout = () =>{
    setId(undefined);
  setUser(undefined);
  
  // ✅ Save user data to localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("id")
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  }
  
  console.log("Logged out successfully");
  }

  
  const navigation: {
    label: string;
    route: string;
    icon: React.ReactNode;
  }[] = [
    {
      icon: <GrNew className=" stroke-[#8c003e] fill-[#8c003e]" />,
      label: "New Pairs",
      route: "/new-pairs",
    },
    {
      icon: <MdOutlineWhatshot className=" stroke-[#8c003e] fill-[#8c003e]"/>,
      label: "Trending",
      route: "/trending",
    },
    {
      icon: <IoTelescope className=" stroke-[#8c003e] fill-[#8c003e]"/>,
      label: "pumpVision",
      route: "/pumpvision",
    },
    {
      icon: <FaHandHoldingUsd className=" stroke-[#8c003e] fill-[#8c003e]"/>,
      label: "Holdings",
      route: "/holdings",
    },    
    {
      icon: <FaHistory className=" stroke-[#8c003e] fill-[#8c003e]"/>,
      label: "History",
      route: "/history",
    },
    // {
    //   icon: <MdLeaderboard />,
    //   label: "Leaderboard",
    //   route: "/leaderboard",
    // },
  ];

  const handleNav = (e:any)=>{
    e.preventDefault();
    // console.log("handleNav")
    // console.log(e);
    const href = (e.currentTarget as HTMLAnchorElement).href;
    // console.log(e.nativeEvent.srcElement.formAction);        
    if(closeMenu)closeMenu;
    window.location.href=href;

  }

  return (
    <div className={"hidden lg:block h-[100vh] py-4 w-64 bg-black " + className}>
      <div
        className={
          "rounded-3xl flex flex-col gap-8 h-[90vh] md:h-full p-6 bg-neutral-950 glass border border-[#8c003e] " +
          innerClassName
        }
      >
        <div className="items-center flex gap-2 justify-between">
          {/* <h1 className={"text-5xl " + brand.className}>Titan</h1> */}
          <div className="flex items-center">
        <img src={String(logo.src)} className="h-12" />
        <span className="ml-2 text-[#8c003e] font-black hero-text text-white text-3xl !leading-[3] sm:text-3xl xl:text-3xl text-wrap text-center text-ton-blue-100 bg-clip-text text-transparent bg-gradient-to-b from-ton-blue-500 via-ton-blue-400 to-ton-blue-300">Conclave</span>
        </div>
          {additionalButton}
        </div>
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="w-full flex flex-col gap-2">
            {navigation.map((n, i) => (
              <Link prefetch={true} href={n.route} key={i} className="w-full" onClick={handleNav}>
                <Button
                  variant="ghost"
                  className="w-full !justify-start text-ton-blue-200 hover:!bg-ton-blue-800/20 hover:glass hover:!text-ton-blue-300 flex gap-2"
                >
                  {n.icon}
                  {n.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full justify-between">
            <Badge
              variant="secondary"
              className="glass h-full px-4 py-1 text-nowrap w-full truncate text-center justify-center"
            >
              {formatNumber(balance).value}
              {formatNumber(balance).unit} {currency}
            </Badge>
            <div 
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 gap-2 glass h-10 px-4 py-2 border dark:border-[#8c003e] dark:bg-[rgba(140,0,62,0.4)] dark:hover:bg-ton-blue-800/20 dark:hover:text-neutral-50 glass"
              onClick={()=>{logout(); router.push("/") }}
              >
            <IoMdLogOut/>
            </div>
            <DropdownMenu>
              {/* <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 gap-2 glass h-10 px-4 py-2 border dark:border-[#8c003e] dark:bg-[rgba(140,0,62,0.4)] dark:hover:bg-ton-blue-800/20 dark:hover:text-neutral-50 glass">
                <IoSettingsSharp />
              </DropdownMenuTrigger> */}
              <DropdownMenuContent className="mx-12">
                {/* <Link href="/referrals">
                  <DropdownMenuItem className="flex gap-2">
                    <FaLink /> Referrals
                  </DropdownMenuItem>
                </Link> */}
                <Link href="/transfer" prefetch={true}>
                  <DropdownMenuItem className="lg:hidden gap-2 flex">
                    <RiFundsFill /> Change Balance
                  </DropdownMenuItem>
                </Link>
                {/* <Link href="/settings" prefetch={true}>
                  <DropdownMenuItem className="flex gap-2">
                    <IoSettingsSharp /> Settings
                  </DropdownMenuItem>
                </Link> */}
                {/* <DropdownMenuItem className="flex gap-2">
                  <IoDocumentText /> Documentation
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem className="flex gap-2">
                  <IoLanguage /> Language
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem className="flex gap-2">
                  <IoMdSwap /> Switch Network
                </DropdownMenuItem> */}
                <DropdownMenuItem className="flex gap-2" onClick={()=>{logout(); router.push("/") }}>
                  <IoMdLogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
