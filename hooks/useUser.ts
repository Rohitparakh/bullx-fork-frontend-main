import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appContext";
import { getUserFromLocalStorage } from "@/lib/utils";

export const useUser = () => {
  const { user, setUser } = useAppContext();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user && !initialized) {
      const data = getUserFromLocalStorage();
      if (data) {
        setUser(JSON.parse(data));
      }
      setInitialized(true);
    }
  }, [user, setUser, initialized]);

  return user;
};
