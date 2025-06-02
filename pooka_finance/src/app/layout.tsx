import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./global.css";
import { AppKitProvider } from "@/components/AppProvider";



export const metadata:Metadata={
  title:"Pooka Finance",
  description:"Cross Chain Perps Exchange"
}

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        <AppKitProvider>
        {children}
        </AppKitProvider>
      </body>
    </html>
  );
}
