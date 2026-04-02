import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/CustomCursor";

// Configure Space Grotesk font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
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
          spaceGrotesk.variable,
          "bg-background text-foreground font-sans"
        )}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}