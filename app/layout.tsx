import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import NotificationsHolder from "./components/NotificationsHolder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Latex CV Maker",
  description: "Generated A Latex ready-to-use resume without writting any Latex code.",
  other: {
    'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Providers>
          <NotificationsHolder />
          {children}
        </Providers>
      </body>
    </html>
  );
}
