import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import StatsCard from "./components/stats";
import Leaderboard from "./components/leaderboard";
import TasksCard from "./components/tasks";

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen flex gap-4 z-10 lg:overflow-y-hidden">
      <DashboardNav closeMenu={()=>console.log("Close Menu log only")}/>
      <div className="pt-8 pb-4 flex flex-col gap-4 grow">
        <SectionTitle
          name="Leaderboard"
          desc="Earn points by tranding and completing tasks."
        />
        <StatsCard />
        <div className="h-[200vh] lg:overflow-hidden grow flex flex-col lg:flex-row gap-4">
          <Leaderboard />
          <TasksCard />
        </div>
      </div>
    </main>
  );
}
