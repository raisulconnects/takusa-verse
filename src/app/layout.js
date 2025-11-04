import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "./Providers/SessionProvider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Takusa Blog",
  description: "Coolest Blogging Web App!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 min-h-screen`}
      >
        <SessionContextProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionContextProvider>
      </body>
    </html>
  );
}
