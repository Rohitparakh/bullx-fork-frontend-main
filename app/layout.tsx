import type { Metadata } from "next";
import "./globals.css";
import { sans } from "./fonts";
import Providers from "./components/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/app/components/UserProvider"; // Import Client Component

export const metadata: Metadata = {
  title: "Titan",
  description: "Cryptocurrency platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark box-border" suppressHydrationWarning>
      <Providers>
        <UserProvider>
          <body className={"bg-background text-foreground " + sans.className}>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              draggable
              theme="dark"
            />
          </body>
        </UserProvider>
      </Providers>
    </html>
  );
}
