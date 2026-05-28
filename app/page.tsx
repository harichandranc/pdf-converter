import type { Metadata } from "next";
import CategoryTabs from "@/components/CategoryTabs";
import BannerAd from "@/components/BannerAd";

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfconverter.chtechgiant.com"),
  title:
    "Free PDF Converter & PDF Tools Online | Merge, Split, Compress PDFs",
  description:
    "Use fast and secure PDF tools online for free. Merge PDF, split PDF, compress PDF, rotate PDF, protect PDF, convert images to PDF and more.",
  keywords: [
    "PDF Converter",
    "Merge PDF",
    "Split PDF",
    "Compress PDF",
    "Rotate PDF",
    "Protect PDF",
    "Image to PDF",
    "PDF Tools Online",
    "Free PDF Editor",
    "PDF Compressor",
    "PDF Merger",
    "PDF Splitter",
  ],
  authors: [
    {
      name: "CH TECH GIANT",
    },
  ],
  creator: "CH TECH GIANT",
  publisher: "CH TECH GIANT",

  openGraph: {
    title:
      "Free PDF Converter & PDF Tools Online",
    description:
      "Merge, split, compress, rotate and convert PDFs online for free using professional PDF tools.",
    url: "https://pdfconverter.chtechgiant.com",
    siteName: "PDF Converter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDF Converter Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Free PDF Converter & PDF Tools Online",
    description:
      "Fast and secure online PDF tools for merging, splitting, compressing and converting PDFs.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical:
      "https://pdfconverter.chtechgiant.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",
            "@type": "WebSite",
            name: "PDF Converter",
            url: "https://pdfconverter.chtechgiant.com",
            description:
              "Free online PDF tools for merge, split, compress and convert PDFs.",
            publisher: {
              "@type": "Organization",
              name: "CH TECH GIANT",
            },
          }),
        }}
      />

      <main className="bg-[#f7f7fb] min-h-screen">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-24 px-4">

          {/* BACKGROUND */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

          <div className="relative max-w-7xl mx-auto text-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-6 py-3 rounded-full font-semibold mb-8">
              ⚡ Fast & Secure PDF Tools
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-8">
              Free Online PDF Tools
              <br />
              Merge, Split & Convert PDFs
            </h1>

            {/* DESCRIPTION */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Merge PDF, split PDF, compress,
              rotate, protect and convert PDF
              files online for free using fast,
              secure and professional tools.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

              <a
                href="#explore-tools"
                className="bg-black hover:opacity-90 text-white font-bold px-10 py-5 rounded-2xl text-lg transition"
              >
                Explore PDF Tools
              </a>

              <a
                href="#explore-tools"
                className="bg-white border border-gray-300 hover:border-black text-gray-900 font-bold px-10 py-5 rounded-2xl text-lg transition"
              >
                Start Free
              </a>
            </div>

            {/* PLAY STORE */}
            <div className="mt-12">

              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold mb-5">
                📱 Available on Play Store
              </div>

              <div className="flex justify-center">

                <a
                  href="https://play.google.com/store/apps/details?id=com.chtechgiant.everything_converter&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:scale-105"
                  aria-label="Download File Converter App from Google Play Store"
                >

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-16 md:h-20"
                  />
                </a>
              </div>

              <p className="text-gray-500 mt-4 text-lg">
                Download our Android apps for
                fast file conversion and utility
                tools.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY + TOOLS */}
        <section
          id="explore-tools"
          className="px-4 py-10"
        >

          <div className="max-w-7xl mx-auto">
            <CategoryTabs />
          </div>
        </section>

        {/* BANNER AD */}
        <div className="max-w-7xl mx-auto px-4">
          <BannerAd />
        </div>

        {/* FEATURES */}
        <section className="pb-24 px-4">

          <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-16">

              <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-6 py-3 rounded-full font-semibold mb-8">
                💎 Why Choose Us
              </div>

              <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                Why Choose PDF Converter?
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional PDF tools built
                for speed, security and
                simplicity.
              </p>
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* FAST */}
              <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition duration-300">

                <div className="text-6xl mb-6">
                  ⚡
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Fast PDF Processing
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Upload and process PDF files
                  instantly using optimized
                  server-side processing.
                </p>
              </div>

              {/* SECURE */}
              <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition duration-300">

                <div className="text-6xl mb-6">
                  🔒
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  100% Secure PDF Tools
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Your uploaded PDF files are
                  protected and automatically
                  deleted after processing.
                </p>
              </div>

              {/* FREE */}
              <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition duration-300">

                <div className="text-6xl mb-6">
                  💯
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Free PDF Tools
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Use all powerful online PDF
                  tools completely free without
                  signup or registration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}