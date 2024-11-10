import type { Metadata } from "next";
import "./globals.css";
import { Manrope, DM_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme"
import ReactQueryProvider from "@/react-query";

const manrope = DM_Sans({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Indigo",
  description: "Share AI powered videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-[#171717]`}>
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
        </body>
      </html>
    </ClerkProvider>
  );
}
