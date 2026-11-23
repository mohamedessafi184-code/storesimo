import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAVIXO | Tech Store",
  description: "Discover your next tech upgrade at TAVIXO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
