import "./globals.css";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Crypto Explorer",
  description: "Next.js cryptography app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
