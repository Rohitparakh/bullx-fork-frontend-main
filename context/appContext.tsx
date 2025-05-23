import { createContext, useContext, useState, ReactNode } from "react";

type Token = {
  mintAddress: string;
  name: string;
  symbol: string;
};

interface User {
  id:string;
  username: string;
  avatar: string;
  email: string;
  solBalance: number;
}

// Define the type of the context state
interface AppContextType {
  token: Token | undefined;
  setToken: (value: Token ) => void;
  user: User | undefined;
  setUser: (value: User | undefined) => void;
  id: string | undefined;
  setId: (value: string | undefined) => void;
  // privateKey: string | undefined;
  // setPrivateKey: (value: string | undefined) => void;
  // publicKey: string | undefined;
  // setPublicKey: (value: string | undefined) => void;
}

// Create context with default undefined value
export const AppContext = createContext<AppContextType | null>(null);

// Define the props type for the provider
interface AppProviderProps {
  children: ReactNode;
}



export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Correctly define token type
  const [token, setToken] = useState<Token | undefined>(undefined);
  // const [privateKey, setPrivateKey] = useState<string | undefined>(undefined);
  // const [publicKey, setPublicKey] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        id,
        setId,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
