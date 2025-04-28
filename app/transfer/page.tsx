"use client"
import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import CardsTabbed from "../leaderboard/components/tabs";
// import History from "./components/history";

const closeMenu = () => {
  console.log("Close menu log")
};

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav closeMenu={closeMenu}/>
      <div className="pt-8 pb-4 grow h-screen flex flex-col gap-4">
        {/* <SectionTitle name="Transfer" desc="Withdraw or deposit funds." /> */}
        <SectionTitle name="Change Balance" desc=""/>
        <CardsTabbed />
        {/* <div className="lg:overflow-hidden grow flex gap-4">
          <History />
        </div> */}
      </div>
    </main>
  );
}
