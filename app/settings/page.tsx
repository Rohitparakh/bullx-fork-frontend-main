"use client"

import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import CardsTabbed from "../leaderboard/components/tabs";
import Settings from "./components/settings";
import { getUserFromLocalStorage } from "@/lib/utils";
import { closeMenu } from "@/lib/utils";

export default function Page() {

  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav closeMenu={closeMenu}/>
      <div className="pt-8 pb-4 grow h-screen flex flex-col gap-4">
        {/* <SectionTitle name="Transfer" desc="Withdraw or deposit funds." /> */}
        <SectionTitle name="Settings" desc=""/>
        {/* <CardsTabbed /> */}
          <Settings />
      </div>
    </main>
  );
}
