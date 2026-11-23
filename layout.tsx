import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAVIXO | Tech Store",
  description: "Discover technology, devices and accessories at TAVIXO.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
