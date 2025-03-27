import { Button } from "@/components/ui/button";
import HeroContent from "../components/hero-content";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { MdRocketLaunch } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import logo from "@/public/conclaveLogo.png";

export function Hero() {
  return (
    <div className="relative justify-center flex h-screen bg-background bg-grid-ton-blue-500/[0.2]">
      <div className="bg-gradient-to-b from-transparent to-background p-4 lg:p-8 xl:p-12 text-foreground justify-center items-center flex h-full">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-0 left-0 p-4 flex gap-4">
        <div className="flex items-center">
        <img src={String(logo.src)} className="h-8 lg:h-12" />
        <span className="hero-text text-[#8c003e] text-2xl !leading-[1.5] sm:text-2xl xl:text-6xl text-wrap text-center text-ton-blue-100 bg-clip-text text-transparent bg-gradient-to-b from-ton-blue-500 via-ton-blue-400 to-ton-blue-300">Conclave</span>
        </div>
          </div>
        <div className="absolute top-0 right-0 p-4 flex gap-4">
          <div className="flex gap-1">
            <Link href="">
              <Button variant="ghost" className="flex gap-2" size="sm">
                <FaDiscord /> Discord
              </Button>
            </Link>
            <Link href="">
              <Button variant="ghost" className="flex " size="sm">
                <RiTwitterXFill />
                .com
              </Button>
            </Link>
          </div>
        </div>
        <div className="z-10">
          <HeroContent />
        </div>
      </div>
    </div>
  );
}
