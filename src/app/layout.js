import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import UniqueMarquee from "@/components/unique-marquee/UniqueMarquee";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { LoadingProvider } from "@/context/Loading.context";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "DGS Groups",
  description:
    "30 Years of Trust. Affordable Luxury. Redefining Mumbai's Skyline.",
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/Logo.svg" />
      </head>
      <body
        suppressHydrationWarning
        className="font-poppins min-h-full flex flex-col items-center justify-start bg-neutral-950 text-neutral-900 antialiased overflow-x-hidden"
      >
        <LoadingProvider>
          <SmoothScrollProvider>
            <div className="w-full max-w-[1920px] mx-auto min-h-screen flex flex-col bg-white overflow-x-hidden relative">
              <Navbar />
              <div className="flex-1 w-full">{children}</div>
              <UniqueMarquee />
              <Footer />
            </div>
          </SmoothScrollProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
