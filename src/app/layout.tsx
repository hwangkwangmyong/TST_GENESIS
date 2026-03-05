import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TST GENESIS",
  description: "Tokyo Signature Tours operations prototype"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
