"use client";
import MemescopeColumn from "./memescope-column";
import { MemescopeItem } from "@/app/types";
import { usePumpGraduated } from "../../../hooks/usePumpVisionIsGraduated";
import { usePumpCreated } from "@/hooks/usePumpVisionCreated";
import { usePumpAbout } from "@/hooks/usePumpVisionAboutGraduate";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useAppContext } from "@/context/appContext";

export default function Memescope() {
  const { setUser } = useAppContext();
  const { createdData } = usePumpCreated();
  const cData: MemescopeItem[] = [...createdData];
  const { aboutData } = usePumpAbout();
  const aData: MemescopeItem[] = [...aboutData];
  const { graduatedData } = usePumpGraduated();
  const gData: MemescopeItem[] = [...graduatedData];
  const router = useRouter();
  const {user} = useUser();
  return (
    <div className="flex flex-col lg:grid grid-cols-3 gap-4 pb-6 h-full mt-6">
      <MemescopeColumn title="Newly created" data={cData} />
      <MemescopeColumn title="About to graduate" data={aData} />
      <MemescopeColumn title="Graduated" data={gData} />
    </div>
  );
}
