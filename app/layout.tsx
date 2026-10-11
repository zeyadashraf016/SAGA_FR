import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAGA",
  description: "Freight, customs clearance and general supplies.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
