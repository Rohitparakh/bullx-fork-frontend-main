import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import History from "./components/history";
// import StatsCard from "./components/stats";

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav />
      <div className="pt-8 pb-4 grow h-screen flex flex-col gap-4">
        <SectionTitle
          name="History"
          desc="View all trades you have made."
        />
    {/* <StatsCard /> */}
        <div className="h-[200vh] lg:overflow-hidden grow flex flex-col lg:flex-row gap-4">
          <History />
        </div>
      </div>
    </main>
  );
}
