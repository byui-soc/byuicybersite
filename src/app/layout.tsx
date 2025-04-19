import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "BYU-I Society of Cybersecurity",
  description: "Website for the BYU-I Society of Cybersecurity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground flex flex-col min-h-screen">
        <ParticlesBackground />
        <Navbar />
        <main className="flex-grow z-10">
          <PageTransitionWrapper>
            {children} 
          </PageTransitionWrapper>
        </main>
        {/* Footer could go here */}
      </body>
    </html>
  );
}
