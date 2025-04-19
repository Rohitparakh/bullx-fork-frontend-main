"use client"
import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "@/app/components/section-title";
import TrendingData from "./components/trending-data";

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav closeMenu={()=>console.log("Close Menu log only")}/>
      <div className="pt-8 pb-4 grow h-screen flex flex-col gap-4">
        <SectionTitle
          name="Trending"
          desc=""
        />
        <div className="h-[200vh] lg:h-full lg:overflow-hidden grow flex flex-col lg:flex-row gap-4">
        <TrendingData />
      </div>
      </div>
    </main>
  );
}
