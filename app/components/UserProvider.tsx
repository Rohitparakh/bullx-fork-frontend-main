"use client";

import { useUser } from "@/hooks/useUser";
import { useWalletAssets } from "@/hooks/useWalletAssets";
import { useEffect } from "react";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const {user, isLoadingUser }= useUser();
  const { data, isLoading, refetch } = useWalletAssets();

  useEffect(() => {
      if (!isLoadingUser && !user && window.location.pathname !== "/get-started" && window.location.pathname !== "/") {
        window.location.href = "/";
      }else if(user && window.location.pathname=="/"){
        window.location.href ="/new-pairs"
      }  
  }, [user,isLoadingUser]);

  useEffect(() => {
    // console.log("Wallet Data", data);
  }, [data]);

  useEffect(() => {
    // console.log("User data:", user);
  }, [user]);

  return <>{children}</>;
}

// "use client";

// import { useUser } from "@/hooks/useUser";
// import { useWalletAssets } from "@/hooks/useWalletAssets";
// import { useEffect } from "react";

// export default function UserProvider({ children }: { children: React.ReactNode }) {
//   const user = useUser();
//   const { data, isLoading, refetch } = useWalletAssets();
// if(!user) return;
//   useEffect(() => {
//     // console.log("Wallet Data", data);
//   }, [data]);

//   useEffect(() => {
//     // console.log("User data:", user);
//   }, [user]);

//   return <>{children}</>;
// }


// "use client"; // Ensures this runs on the client side

// import { useEffect, useState } from "react";
// import { useAppContext } from "@/context/appContext";
// import { getUserFromLocalStorage } from "@/lib/utils";

// export const useUser = () => {
//   const { user, setUser } = useAppContext();
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (!user && !loaded) {
//       const data = getUserFromLocalStorage();
//       if (data) {
//         setUser(JSON.parse(data));
//       }
//       setLoaded(true);
//     }
//   }, [user, setUser, loaded]);

//   return user;
// };
