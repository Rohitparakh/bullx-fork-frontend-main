import axios from "axios";
import { API_URL } from "@/config";
import { toast } from "react-toastify";

//Get the token details
export const fetchTokenDetails = async (mintAddress: string | undefined) => {
  if (typeof mintAddress == "undefined") return null;
  try {
    const { data } = await axios.get(
      `${API_URL}/pumpfun/token?mintAddress=${mintAddress}`
    );
    // console.log("Token Details:")
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchTokenData = async (mintAddress: string | undefined) => {
  if (typeof mintAddress == "undefined") return null;
  try {
    const { data } = await axios.get(
      `${API_URL}/tokenData/${mintAddress}`
    );
    // console.log("Token Data Fetch:")
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Get newly releasing token in pump.fun
export const fetchNewPairs = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/pumpfun/recent/new-tokens`);
    return data.tokens;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sendTrade = async (
  mint: string | undefined,
  amount: number,
  id: string | undefined,
  isBuy: boolean
): Promise<{ success: boolean; message?: string }> => {
  console.log({ mint, amount, id, isBuy });

  try {
    const res = await axios.post(`${API_URL}/trade`, {
      mint,
      amount,
      id,
      isBuy,
    });

    if (res.data.success) {
      return { success: true, message: "Trade successful" };
    } else {
      console.log(res.data.msg);
      return { success: false, message: res.data.msg || "Trade failed" };
    }
  } catch (error: any) {
    console.log(error?.response?.data?.message || error.message);
    return { success: false, message: error?.response?.data?.message || "An error occurred" };
  }
};

// export const sendTrade = async (
//   mint: string | undefined,
//   amount: number,
//   prvKey: string | undefined,
//   isBuy: boolean
// ) => {
//   console.log({mint, amount, prvKey, isBuy})
//   try {
//     const res = await axios.post(`${API_URL}/trade`, {
//       mint,
//       amount,
//       prvKey,
//       isBuy,
//     });
//     if (res.data.success) {
//       return { success: true}
//       // toast.success("Trade success");
//     }
//     else {

//       console.log(res.data.msg);
//       // toast.error(res.data.error);
//       return {success:false};
//     }
//   } catch (error) {
//     console.log(error);
//     // toast.error("Error occurred");
//     return {success:false};

//   }
// };

export const fetchWalletAssets = async (
  id: string | undefined | null
) => {
  try {
    const res = await axios.post(`${API_URL}/wallet`, {
      id,
    });
    if (res.data.success) { return res.data.data};
    return null;
  } catch (error) {
    return null;
  }
};

export const fetchTrendingData = async (timeframe: string | undefined | null)=>{
  try {
    console.log("a")
    const res = await fetch(`${API_URL}/pumpfun/trending?timeframe=${timeframe}`);
    const data = await res.json();
    console.log(data)
    return data.tokens.data;
  } catch (error) {
    console.log(error);
    toast.error("Error occurred");
    return null;
  }
}

export const fetchCreatedPumpVisionData = async () => {
  try {
    const res = await fetch(`${API_URL}/pumpfun/pumpVision?status=3`);
    const data = await res.json();
    return data.tokens;
  } catch (error) {
    console.log(error);
    toast.error("Error occurred");
    return null;
  }
};

export const fetchAboutPumpVisionData = async () => {
  try {
    const res = await fetch(`${API_URL}/pumpfun/pumpVision?status=2`);
    const data = await res.json();
    return data.tokens;
  } catch (error) {
    console.log(error);
    toast.error("Error occurred");
    return null;
  }
};

export const fetchGraduatedPumpVisionData = async () => {
  try {
    const res = await fetch(`${API_URL}/pumpfun/pumpVision?status=1`);
    const data = await res.json();
    return data.tokens;
  } catch (error) {
    console.log(error);
    toast.error("Error occurred");
    return null;
  }
};

export const fetchTokenImage = async (address: string | undefined) => {
  try {
    const res = await axios.get(
      `${API_URL}/pumpfun/tokenImage?address=${address}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get the
export const registerUser = async () => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/auth/discord/callback`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//Get the
export const login = async (id:string) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/auth/discord/callback`,
      {
        id: id
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};