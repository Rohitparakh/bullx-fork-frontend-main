"use client"
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@/config"; 
import { useAppContext } from "@/context/appContext";

const GetStarted = () => {
  // const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
    const { user , setUser, id, setId } = useAppContext();

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get("user");
    if(userData) setUser(JSON.parse(decodeURIComponent(userData)))
    if(userData) setId(JSON.parse(decodeURIComponent(userData)).id)
    
    const newSocket: Socket = io(API_URL);
    setSocket(newSocket);
    if (userData) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userData));
        console.log("✅ Discord User:", parsedUser);
        setId(parsedUser.id)
        setUser(parsedUser)
        localStorage.setItem('user',JSON.stringify(parsedUser))
        localStorage.setItem('id',parsedUser.id)
        // Emit login event
        newSocket.emit("login", {
          user: parsedUser,
          id: parsedUser.id,
        });

        // Emit sendData event
        newSocket.emit("sendData", {
         user: parsedUser,
         id: parsedUser.id,
          
        });

        // Optional redirect
        setTimeout(() => {
          window.location.href = "/new-pairs"; // or wherever you want to go
        }, 1500);

      } catch (error) {
        console.error("Error parsing user from query param:", error);
      }
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Logging you in with Discord...</h2>
    </div>
  );
};

export default GetStarted;

// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useAppContext } from "@/context/appContext";
// import { io, Socket } from "socket.io-client";
// import { API_URL } from "@/config"; 
// import CopyToClipboard from "@/app/components/copyToClipboard";

// export default function GetStarted() {
//   const router = useRouter();
//   const [randomId, setRandomId] = useState<string>("");
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const { user, setId, id, setUser } = useAppContext();
//   // const { privateKey, user, setId, setPrivateKey, setPublicKey, setUser } = useAppContext();

//   // Function to generate a unique random ID
//   const randomIdGenerator = () => Math.random().toString(36).substr(2, 9);

//   useEffect(() => {
//     // Generate the random ID once when the component mounts
//     const newRandomId = randomIdGenerator();
//     setRandomId(newRandomId);
  
//     console.log("userid")
//     console.log(user)
//     console.log(id)
//     // Initialize Socket.io connection
//     const newSocket: Socket = io(API_URL);
//     setSocket(newSocket);
  
//     newSocket.on("connect", () => {
//       console.log("Connected to server:", newSocket.id);
  
//       // Emit the registration event
//       // newSocket.emit("sendData", { clientId: id });
//     });

//     newSocket.on("login", (data) => {
//       console.log("data.user", data);
//       // newSocket.emit("sendData", { clientId: data.id });
    
//       if (data?.user) {
//         setUser(data.user);
    
//         if (data?.user) {
//           if (typeof localStorage !== "undefined") {
//             localStorage.setItem("id", data.user.id);
//             localStorage.setItem("user", JSON.stringify(data.user));
//           }
//         }
    
//         setId(data.id);
//         router.push("/get-started");
//       }
//     });

    
  
//     // newSocket.on("login", (data) => {
//     //   console.log("loginData")
//     //   console.log(data)
//     //   setId(data.id);
//     //   // setPrivateKey(data.prvKey);
//     //   // setPublicKey(data.pubKey);
//     //   setUser(data.user);
  
//     //   // ✅ Save user data to localStorage
//     //   if (typeof window !== "undefined") {
//     //     try {
//     //       localStorage.setItem("user", JSON.stringify(data.user));
//     //       localStorage.setItem("id", data.id);
//     //     } catch (error) {
//     //       console.error("Error saving to localStorage:", error);
//     //     }
//     //   }
  
//     //   console.log("User registered:", data);
//     // });
  
//     return () => {
//       newSocket.off("login");
//       newSocket.disconnect();
//     };
//   }, []);

  
//   // useEffect(() => {
//   //   // Generate the random ID once when the component mounts
//   //   const newRandomId = randomIdGenerator();
//   //   setRandomId(newRandomId);

//   //   // Initialize Socket.io connection
//   //   const newSocket: Socket = io(API_URL);
//   //   setSocket(newSocket);

//   //   newSocket.on("connect", () => {
//   //     console.log("Connected to server:", newSocket.id);
      
//   //     // Emit the registration event
//   //     newSocket.emit("sendData", { clientId: newRandomId });
//   //   });

//   //   newSocket.on("login", (data) => {
//   //     setPrivateKey(data.prvKey);
//   //     setPublicKey(data.pubKey);
//   //     setUser(data.user);

      
//   //     console.log("User registered:", data);
//   //   });

//   //   return () => {
//   //     newSocket.off("login");
//   //     newSocket.disconnect();
//   //   };
//   // }, []);

  

//   useEffect(()=>{
//     console.log(user);
//   },[user])


//   return (
//     <Card className="max-w-full">
//       <CardHeader>
//         <CardTitle>Start Trading</CardTitle>
//         <CardDescription>
//           This is your wallet&#39;s private key. Trade using this wallet.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex flex-col lg:flex-row gap-8">
//         <div className="flex flex-col gap-2">
//           Your private key:
//           <div className="flex gap-2">
//             <p className="h-10  rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ton-blue-950 dark:bg-neutral-950 dark:placeholder:text-neutral-400 truncate">
//               {id}
//             </p>
//             <CopyToClipboard text={id} />
//           </div>
//           <Button variant="secondary" className="mt-3" onClick={() => router.push("/new-pairs")}>
//             Start Trading
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
