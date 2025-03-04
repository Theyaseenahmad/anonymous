import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authprovider from "./context/Authprovider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/manual/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous",
  description: "get reviews from your audience",
  icons: {
    icon: "/unknown.png", // Path to your favicon
    shortcut: "/unknown.png",
    apple: "/unknown.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Authprovider>
        <body className="grad">
          <Navbar />
          <div className="w-full h-screen flex flex-col md:flex-row justify-between items-center overflow-hidden px-4 md:px-0 relative">
            
            {/* Background Circles */}
            <div className="absolute -top-24 -left-24 w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full -z-20"></div>
            <div className="absolute top-64 -left-10 w-16 h-16 md:w-20 md:h-20 bg-red-300 rounded-full -z-20"></div>
            <div className="absolute top-36 left-[50%] md:left-[62%] w-16 h-16 md:w-20 md:h-20 bg-red-300 rounded-full -z-20"></div>

            {/* Left Content (Text) */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative py-10">
              <div className="absolute -bottom-24 left-20 md:left-40 w-40 h-40 md:w-52 md:h-52 bg-blue-500 rounded-full -z-20"></div>
              {children}
            </div>

            {/* Right Content (Image) */}
            <div className="w-full md:w-1/2 hidden md:flex lg:flex  relative  justify-center overflow-hidden">
              <div className="absolute -right-0 md:-right-20 -bottom-20 md:-bottom-40 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-400 rounded-full -z-20"></div>
              <img 
                className="object-contain w-full max-w-xs md:max-w-full mx-auto" 
                src="/11194835 1.png" 
                alt="" 
              />
            </div>
          </div>

          <Toaster />
        </body>
      </Authprovider>
    </html>
  );
}
