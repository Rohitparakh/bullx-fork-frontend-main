import DashboardNav from "@/app/components/dashboard-nav";
import SectionTitle from "../components/section-title";
import Memescope from "./components/memescope";

export default function Page() {
  return (
    <main className="px-4 bg-background lg:h-screen lg:flex gap-4">
      <DashboardNav />
      <div className="pt-8 pb-4 grow h-screen flex flex-col">
        <SectionTitle
          name="PumpVision"
          desc="Customized feeds of tokens for you."
        />
        <div className="grow lg:overflow-hidden">
          <Memescope />
        </div>
      </div>
    </main>
  );
}
