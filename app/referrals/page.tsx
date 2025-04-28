import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "@/app/components/section-title";
import StatsCard from "./components/stats";
import Payouts from "./components/payouts";


const closeMenu = () => {
  console.log("Close menu log")
};

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen flex gap-4 z-10 lg:overflow-y-hidden">
      <DashboardNav closeMenu={closeMenu}/>
      <div className="pt-8 pb-4 flex flex-col gap-4 grow">
        <SectionTitle
          name="Referrals"
          desc="See how your referrals have performed and get paid!"
        />
        <StatsCard />
        <div className="h-[200vh] lg:overflow-hidden grow flex flex-col lg:flex-row gap-4">
          <Payouts />
        </div>
      </div>
    </main>
  );
}
