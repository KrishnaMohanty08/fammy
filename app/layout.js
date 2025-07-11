import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fammy.com",
  description: "A private social platform for families to stay connected, share memories, and organize events.Why? Families often struggle to stay in touch across generations or distances. Fammy.com can be a safe, private space for family members to communicate and preserve memories.",
};

export default  function RootLayout({ children }) {

  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive"/>
      </body> 
      </SessionWrapper>

           
    </html>
  );
}
