import { Fredoka, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/CustomCursor";
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Anish Singh | Full Stack Developer & AI Engineer",
  description:
    "Full stack developer specializing in React, Next.js, Node.js, and AI/ML integration. Building modern web applications with clean code and great user experience.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={clsx(
          fredoka.variable,
          inter.variable,
          spaceGrotesk.variable,
          "bg-background text-foreground font-fredoka",
        )}
      >
   
       
        {children}
        <Footer />
         <CustomCursor />
      </body>
    </html>
  );
}
