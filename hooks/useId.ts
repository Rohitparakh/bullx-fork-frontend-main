import { useAppContext } from "@/context/appContext";

export const useId = () => {
  const { id, setId } = useAppContext();
  return { id, setId };
};
