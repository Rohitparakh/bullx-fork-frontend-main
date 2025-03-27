
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@/config"; 
import CopyToClipboard from "@/app/components/copyToClipboard";

export default function GetStarted() {
  const router = useRouter();
  const [randomId, setRandomId] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { privateKey, user, setPrivateKey, setPublicKey, setUser } = useAppContext();

  // Function to generate a unique random ID
  const randomIdGenerator = () => Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    // Generate the random ID once when the component mounts
    const newRandomId = randomIdGenerator();
    setRandomId(newRandomId);
  
    // Initialize Socket.io connection
    const newSocket: Socket = io(API_URL);
    setSocket(newSocket);
  
    newSocket.on("connect", () => {
      console.log("Connected to server:", newSocket.id);
  
      // Emit the registration event
      newSocket.emit("sendData", { clientId: newRandomId });
    });
  
    newSocket.on("login", (data) => {
      setPrivateKey(data.prvKey);
      setPublicKey(data.pubKey);
      setUser(data.user);
  
      // ✅ Save user data to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("prvKey", data.prvKey);
          localStorage.setItem("pubKey", data.pubKey);
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
  
      console.log("User registered:", data);
    });
  
    return () => {
      newSocket.off("login");
      newSocket.disconnect();
    };
  }, []);

  
  // useEffect(() => {
  //   // Generate the random ID once when the component mounts
  //   const newRandomId = randomIdGenerator();
  //   setRandomId(newRandomId);

  //   // Initialize Socket.io connection
  //   const newSocket: Socket = io(API_URL);
  //   setSocket(newSocket);

  //   newSocket.on("connect", () => {
  //     console.log("Connected to server:", newSocket.id);
      
  //     // Emit the registration event
  //     newSocket.emit("sendData", { clientId: newRandomId });
  //   });

  //   newSocket.on("login", (data) => {
  //     setPrivateKey(data.prvKey);
  //     setPublicKey(data.pubKey);
  //     setUser(data.user);

      
  //     console.log("User registered:", data);
  //   });

  //   return () => {
  //     newSocket.off("login");
  //     newSocket.disconnect();
  //   };
  // }, []);

  

  useEffect(()=>{
    console.log(user);
  },[user])


  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle>Start Trading</CardTitle>
        <CardDescription>
          This is your wallet's private key. Trade using this wallet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-2">
          Your private key:
          <div className="flex gap-2">
            <p className="h-10  rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ton-blue-950 dark:bg-neutral-950 dark:placeholder:text-neutral-400 truncate">
              {privateKey}
            </p>
            <CopyToClipboard text={privateKey} />
          </div>
          <Button variant="secondary" className="mt-3" onClick={() => router.push("/new-pairs")}>
            Start Trading
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
