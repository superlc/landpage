import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flash Financials - AI CFO for Construction",
  description: "Your AI-powered CFO for construction financial management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
