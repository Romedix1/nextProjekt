
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";;
import Footer from "../components/Footer";
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
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}