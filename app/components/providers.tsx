"use client";

import { AppProvider } from "@/context/appContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        {children}   
      </AppProvider>
    </QueryClientProvider>
  );
}
