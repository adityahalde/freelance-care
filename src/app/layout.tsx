import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FreelanceCare — Book Cameramen & Video Editors",
  description: "Hire professional cameramen and video editors for your events. Weddings, corporate, music videos and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-surface-900 font-sans antialiased">
        <Nav />
        <main className="mx-auto min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
