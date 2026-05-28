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

        {/* PLAYSTORE SECTION */}
        <section className="px-4 py-10">
          <div className="max-w-6xl mx-auto">

            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">

              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-full font-semibold mb-5">
                  📱 Available on Play Store
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Download Our Android Apps
                </h2>

                <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                  Try our File Converter App which as 50+ Free Tools 
                  including Document Tools, Image Tools, Video Tools, 
                  Audio Tools and Test Tools.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.chtechgiant.everything_converter&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-5 rounded-2xl transition text-lg whitespace-nowrap"
              >
                🚀 View on Play Store
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}