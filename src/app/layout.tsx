
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";;

export const metadata: Metadata = {
  title: "Sklep z Perfumami",
  description: "Najlepsze zapachy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <Navbar />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}