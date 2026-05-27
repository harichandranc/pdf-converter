import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PDF Converter",
  description: "Free online PDF tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f7f7fb]">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}