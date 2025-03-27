import { useAppContext } from "@/context/appContext"

export const useToken = () => {
    const {token} = useAppContext();
    return token;
}