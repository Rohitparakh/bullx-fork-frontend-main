"use client"
import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "@/app/components/section-title";
import NewPairsData from "./components/new-pairs-data";
import { closeMenu } from "@/lib/closeMenu";


export default function Page() {
  return (
    <div className={`relative h-screen`}>
      <main className="px-4 bg-background/20 lg:h-screen flex gap-4 glass z-10">
        <DashboardNav closeMenu={closeMenu}/>
        <div className="pt-8 pb-4 flex flex-col gap-2 grow">
          <SectionTitle
            name="New Pairs"
            desc=""
          />
          <NewPairsData />
        </div>
      </main>
    </div>
  );
}
