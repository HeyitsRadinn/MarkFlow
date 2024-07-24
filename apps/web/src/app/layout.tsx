import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import DarkModeToggle from '@/components/DarkModeToggle';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarkFlow",
  description: "A Simple, Scalable Markdown Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <DarkModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}