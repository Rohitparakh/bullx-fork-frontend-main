import { display } from "@/app/fonts";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { MdRocketLaunch } from "react-icons/md";
import { BOT_URL, API_URL } from "@/config";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/appContext";
import logo from "@/public/conclaveLogo.png";
import { Image } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function HeroContent() {
  const router = useRouter();
  const randomIdGenerator = () => Math.random().toString(36).substr(2, 9);

  const randomId = randomIdGenerator();
  const [socket, setSocket] = useState<Socket | null>(null);
  const firstRenderValue = useRef<string | null>(null);
  const { setPublicKey, setPrivateKey, user, setUser } = useAppContext();

  useEffect(() => {
    if (firstRenderValue.current === null) {
      // Set the value on the first render and preserve it in a ref
      firstRenderValue.current = randomIdGenerator();
    }
    const newSocket: Socket = io(API_URL); // Initialize the socket inside useEffect
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the server with socket ID:", newSocket.id);
    });

    newSocket.on("login", (data) => {
      if (data.code === firstRenderValue.current) {
        setUser(data.user);
        if (
          typeof user?.prvKey === "string" &&
          typeof user?.pubKey === "string"
        ) {
          if ( typeof localStorage != 'undefined') {
            localStorage.setItem("prvKey", user.prvKey);
            localStorage.setItem("pubKey", user.pubKey);
          }
        }
        setPrivateKey(data.prvKey);
        setPublicKey(data.pubKey);
        router.push("/get-started");
        // router.push("/new-pairs");
      }
    });

    // Cleanup socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [router]);
  console.log(logo)
  return (
    <div>
      <div className="w-full flex flex-col gap-0 justify-start items-center px-12 xl:px-36">
        <div className="flex items-center -left-[10%] lg:-left-[5%] relative">
        <img src={String(logo.src)} className="h-12 lg:h-20" />
        <span className="text-[#8c003e] font-black hero-text text-6xl !leading-[1.5] sm:text-6xl xl:text-7xl text-wrap text-center text-ton-blue-100 bg-clip-text text-transparent bg-gradient-to-b from-ton-blue-500 via-ton-blue-400 to-ton-blue-300">Conclave</span>
        </div>
        <p className="text-[#5dcb90] font-black tracking-[3px] text-xl mt-1 uppercase">Early Access</p>
        <p className="font-bold text-lg mt-5">Start paper trading</p>
        <p className="font-light text-center text-md text-gray-600">Connect your discord to start trading</p>
        {/* <h1
          className={
            "hero-text text-6xl sm:text-7xl xl:text-9xl text-wrap text-center text-ton-blue-100 bg-clip-text text-transparent bg-gradient-to-b from-ton-blue-500 via-ton-blue-400 to-ton-blue-300 " +
            display.className
          }
        >
          Buy and sell tokens here
        </h1> */}
        <div className="flex gap-2 hero-buttons mt-8">
          <Link
          prefetch={true}
            // href={`${BOT_URL}?start=${firstRenderValue.current}`}
            href={`/get-started`}
            // href={`/new-pairs`}
            // target="_blank"
          >
            <HoverBorderGradient className="flex items-center gap-2 bg-[#8c003e] text-white hover:text-ton-blue-300 transition-all duration-1000  border-[#8c003e]">
              <FaDiscord />
              Connect Discord
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </div>
  );
}
