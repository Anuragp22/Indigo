import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme"
import ReactQueryProvider from "@/react-query";
import React from "react";

const manrope = DM_Sans({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: "Indigo",
  description: "Share AI powered videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${manrope.className} bg-[#171717]`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
