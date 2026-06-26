import type { Metadata } from "next";
import { Tilt_Warp, Urbanist } from "next/font/google";
import "./globals.css";

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  variable: "--font-tilt-warp",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Git Dummy | Every change you've made, beautifully visualised",
  description:
    "Git Dummy is a desktop Git visualization app that turns your commit history into a beautiful, interactive spatial graph. See branches, merges, and your entire project timeline at a glance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tiltWarp.variable} ${urbanist.variable} h-full antialiased`}
    >
      <body className="bg-gd-bg-primary text-gd-text-primary font-body min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
