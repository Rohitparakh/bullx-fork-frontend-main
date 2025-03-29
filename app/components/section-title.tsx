"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaDollarSign, FaSearch } from "react-icons/fa";
import { display } from "../fonts";
import { Button } from "@/components/ui/button";
import { IoMenu } from "react-icons/io5";
import DashboardNav from "./dashboard-nav";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { isValidSolanaAddress, setSolBalance } from "@/lib/utils";
import { toast } from "react-toastify";
import Image from "next/image";

export default function SectionTitle({
  name,
  desc,
 
}: {
  name: string;
  desc: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [balanceInput, setBalanceInput ] = useState<number | string | undefined>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isValid = isValidSolanaAddress(search);
      if (!isValid) {
        toast.error("Input valid token address");
        return;
      }
      router.push(`/detail/${search}`);
    }
  };

  const handleRefresh = () => {
    router.refresh(); // This refreshes the current route and revalidates server components
  };


  const handleBalanceInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {      
      const res = await setSolBalance(Number(balanceInput))
      console.log("Res: ",res)
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
    <div>
      <div className="lg:hidden pb-4">
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => setIsMenuOpen(true)}
        >
          <IoMenu /> Menu
        </Button>
        {isMenuOpen && (
          <div className="z-10 h-full w-full fixed top-0 right-0 left-0">
            <DashboardNav
              className="!py-0 !h-full !block !w-screen"
              innerClassName="!rounded-none"
              additionalButton={
                <Button
                  variant="outline"
                  className="flex gap-2 !border-red-700 text-red-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdClose /> Close
                </Button>
              }
            />
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-between">
        
          
          <div className="px-2 flex flex-col gap-4">
            <h1 className={"text-5xl " + display.className}>{name}</h1>
            <p>{desc}</p>
          </div>
       
        <div className="flex">
          <div
            className={
              "hidden lg:flex h-10 mr-4 w-full rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#8c003e] dark:bg-transparent dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center glass"
            }
          >
            <FaDollarSign className="text-[#8c003e]" />
            <Input
              className="!border-none !ring-0 !outline-0 !ring-offset-0 !bg-transparent"
              placeholder="Change Balance"
              value={balanceInput}
              onKeyDown={handleBalanceInput}
              onChange={(e) => {
                setBalanceInput(e.target.value);
              }}
            />
          </div>
          <div
            className={
              "hidden lg:flex h-10 w-full rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#8c003e] dark:bg-transparent dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 items-center glass"
            }
          >
            <FaSearch className="text-[#8c003e]" />
            <Input
              className="!border-none !ring-0 !outline-0 !ring-offset-0 !bg-transparent"
              placeholder="Search by token or LP count."
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
