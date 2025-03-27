import { useAppContext } from "@/context/appContext";

export const usePrivateKey = () => {
  const { privateKey, setPrivateKey } = useAppContext();
  return { privateKey, setPrivateKey };
};
