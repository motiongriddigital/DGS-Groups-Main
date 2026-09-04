import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import UniqueMarquee from "@/components/unique-marquee/UniqueMarquee";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <UniqueMarquee />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
