import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAds from "@/components/GlobalAds";

export const metadata = {
  title: "PDF Converter",
  description:
    "Free Online PDF Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f7f7fb] text-gray-900 antialiased">
        {/* GLOBAL ADS */}
        <GlobalAds />

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        {children}

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}