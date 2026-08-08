import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "./Providers/SessionProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Takusa Blog — Express & Connect",
  description: "A modern, minimalist blogging platform for creative minds and storytellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem("takusa_theme");
                  var dark = stored ? stored === "dark" : true;
                  if (dark) document.documentElement.classList.add("dark");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen selection:bg-rose-500 selection:text-white flex flex-col justify-between transition-colors duration-200`}
      >
        <ThemeProvider>
          <SessionContextProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </SessionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


