import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bs58 from "bs58";
import { useAppContext } from "@/context/appContext";
import { API_URL } from "@/config";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number | string | undefined | null, precision: number = 4) {
  const s = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "R", "Q"];

  // Convert string to number if needed
  const parsed = typeof n === "string" ? parseFloat(n) : n;

  // Handle invalid, null, or undefined input
  if (typeof parsed !== "number" || isNaN(parsed) || !isFinite(parsed)) {
    return { value: 0, unit: "", combined: "0" };
  }

  if (parsed === 0) return { value: 0, unit: "", combined: "0" };

  const isNegative = parsed < 0;
  const abs = Math.abs(parsed);

  const orderOfMagnitude = Math.floor(Math.log10(abs));
  const index = Math.max(0, Math.floor(orderOfMagnitude / 3));
  const factor = Math.pow(1000, index);

  let abbreviatedValue = abs / factor;
  const precisionFactor = Math.pow(10, precision);
  abbreviatedValue = Math.round((abbreviatedValue + Number.EPSILON) * precisionFactor) / precisionFactor;

  let formattedValue = abbreviatedValue.toString().replace(/(\.\d+?)0+$/, "$1").replace(/\.$/, "");
  if (isNegative) formattedValue = `-${formattedValue}`;

  return {
    value: parseFloat(formattedValue),
    unit: s[index] || "",
    combined: `${formattedValue}${s[index] || ""}`,
  };
}


// export function formatNumber(n: number, precision: number = 4) {
//   console.log("Starting format")
//   console.log(n)
//   let s = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "R", "Q"];

//   if (n === 0) return { value: 0, unit: "", combined: "0" };

//   // Find the order of magnitude
//   let orderOfMagnitude = Math.floor(Math.log10(n));

//   // Determine the index in the abbreviation array
//   let index = Math.floor(orderOfMagnitude / 3);

//   // Calculate the abbreviated value
//   let factor = Math.pow(1000, index);
//   let abbreviatedValue = n / factor;

//   // Adjust precision without rounding
//   const precisionFactor = Math.pow(10, precision);
//   abbreviatedValue = Math.round((abbreviatedValue + Number.EPSILON) * precisionFactor) / precisionFactor;

//   // Format the value and remove trailing zeros
//   let formattedValue = abbreviatedValue.toString();
//   if (formattedValue.indexOf('.') !== -1) {
//     // Remove unnecessary trailing zeros
//     formattedValue = formattedValue.replace(/(\.\d+?)0+$/, "$1").replace(/\.$/, "");
//   }

//   console.log("Finishing format",{
//     value: parseFloat(formattedValue),
//     unit: s[index],
//     combined: `${formattedValue}${s[index]}`,
//   })
//   // Append the abbreviation
//   return {
//     value: parseFloat(formattedValue),
//     unit: s[index],
//     combined: `${formattedValue}${s[index]}`,
//   };
// }


// export function formatNumber(n: number, precision: number = 4) {
//   let s = ["", "K", "M", "B", "T", "P", "E", "Z", "Y", "R", "Q"];

//   // Find the order of magnitude
//   let orderOfMagnitude = Math.floor(Math.log10(n));
//   // Determine the index in the abbreviation array
//   let index = Math.floor(orderOfMagnitude / 3);
//   // Calculate the abbreviated value
//   let abbreviatedValue = parseFloat(
//     (n / Math.pow(1000, index)).toPrecision(precision)
//   );
//   // Append the abbreviation
//   if (isNaN(abbreviatedValue)) {
//     return { value: 0, unit: "" };
//   }
//   return {
//     value: abbreviatedValue,
//     unit: s[index],
//     combined: `${abbreviatedValue}${s[index] ? s[index] : ""}`,
//   };
// }

export function convertToString(input: string | string[]): string | undefined {
  // Check if the input is a string
  if (typeof input === "string") {
    return input; // Return the string as is
  }

  // If the input is an array or undefined, return undefined
  return undefined;
}

export function filterOhlc(data?: any) {
  if (data) {
    const ohlc = data.data.ohlc.map((item: any) => {      
      return {
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
        time: item.t / 1000,
      };
      // return {
      //   open: item.o * 1000000000,
      //   high: item.h * 1000000000,
      //   low: item.l * 1000000000,
      //   close: item.c * 1000000000,
      //   time: item.t / 1000,
      // };
    });
    // console.log(ohlc)
    return ohlc;
  }
}

export const isValidSolanaAddress = (address: string) => {
  try {
    const decoded = bs58.decode(address);
    return decoded.length === 32; // Solana public key is 32 bytes
  } catch (error) {
    return false;
  }
};

export const setSolBalance = async (newBalance: number) =>{
  try{
    // if (!isNaN(newBalance)) return newBalance;

    const user: Object | null = getUserFromLocalStorage();
    // @ts-ignore
    const parsedUser= JSON.parse(user);
    console.log("user")
    console.log(user)
    const res = await axios.post(`${API_URL}/user/set/balance`, { id: parsedUser?.id, newBalance});

    return res;
  } catch(error) {
    return false;
  }
}

export const getUserFromLocalStorage = () => {
  // if (typeof window! == "undefined" ) {
    if (typeof window === "undefined") return null; // Ensure it's a browser environment
    const user = localStorage.getItem("user");
    // const userName = localStorage.getItem("userName");
    // const userId = localStorage.getItem("userId");
    // const prvKey = localStorage.getItem("prvKey");
    // const pubKey = localStorage.getItem("pubKey");
    // const user = { userName, userId, pubKey, prvKey };
    return user || null;
  // } else {
  //   return null;
  // }
};