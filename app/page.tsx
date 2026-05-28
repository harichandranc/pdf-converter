import CategoryTabs from "@/components/CategoryTabs";
import BannerAd from "@/components/BannerAd";

export default function Home() {
  return (
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
            Every tool you need
            <br />
            to work with PDFs
          </h1>

          {/* DESCRIPTION */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Merge, split, compress, convert,
            rotate, protect and manage PDF
            files online for free using fast
            professional tools.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

            <a
              href="#explore-tools"
              className="bg-black hover:opacity-90 text-white font-bold px-10 py-5 rounded-2xl text-lg transition"
            >
              Explore Tools
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
              >

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-16 md:h-20"
                />
              </a>
            </div>

            <p className="text-gray-500 mt-4 text-lg">
              Download our Android apps for fast
              file conversion and utility tools.
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
              Professional PDF tools built for
              speed, security and simplicity.
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
                Fast Processing
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Upload and process PDF files
                instantly using optimized server
                processing.
              </p>
            </div>

            {/* SECURE */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition duration-300">

              <div className="text-6xl mb-6">
                🔒
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                100% Secure
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Your uploaded files are protected
                and automatically deleted after
                processing.
              </p>
            </div>

            {/* FREE */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition duration-300">

              <div className="text-6xl mb-6">
                💯
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Free to Use
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Use all powerful PDF tools online
                completely free without signup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}