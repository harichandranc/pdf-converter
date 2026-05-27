import ToolCard from "@/components/ToolCard";
import CategoryTabs from "@/components/CategoryTabs";

export default function Home() {
  const tools = [
    {
      title: "Merge PDF",
      description:
        "Combine multiple PDF files into one document quickly and securely.",
      icon: "📚",
      href: "/merge-pdf",
    },
    {
      title: "Split PDF",
      description:
        "Extract pages from PDFs and create separate files instantly.",
      icon: "✂️",
      href: "/split-pdf",
    },
    {
      title: "Compress PDF",
      description:
        "Reduce PDF file size while maintaining quality.",
      icon: "🗜️",
      href: "/compress-pdf",
    },
    {
      title: "Image to PDF",
      description:
        "Convert JPG and PNG images into PDF files easily.",
      icon: "🖼️",
      href: "/image-to-pdf",
    },
    {
      title: "PDF to JPG",
      description:
        "Convert PDF pages into high-quality JPG images.",
      icon: "📄",
      href: "/pdf-to-jpg",
    },
    {
      title: "Word to PDF",
      description:
        "Convert DOC and DOCX files into PDF documents.",
      icon: "📝",
      href: "/word-to-pdf",
    },
    {
      title: "Rotate PDF",
      description:
        "Rotate PDF pages permanently and save the updated file.",
      icon: "🔄",
      href: "/rotate-pdf",
    },
    {
      title: "Delete PDF Pages",
      description:
        "Remove unwanted pages from your PDF documents.",
      icon: "🗑️",
      href: "/delete-pages",
    },
  ];

  return (
    <main className="bg-[#f7f7fb] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-28 px-4">
        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto text-center">
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
            Merge, split, compress, convert and
            manage PDF files online for free with
            professional tools directly in your
            browser.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
            <a
              href="/merge-pdf"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-5 rounded-2xl text-lg font-bold transition"
            >
              Merge PDF
            </a>

            <a
              href="/image-to-pdf"
              className="bg-white border border-gray-300 hover:border-cyan-500 px-10 py-5 rounded-2xl text-lg font-bold text-gray-800 transition"
            >
              Image to PDF
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <CategoryTabs />
        </div>
      </section>

      {/* TOOL GRID */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Why Choose PDF Converter?
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional PDF tools built for
              speed, security and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FAST */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition">
              <div className="text-6xl mb-6">
                ⚡
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Fast Processing
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Process PDF files instantly
                directly in your browser.
              </p>
            </div>

            {/* SECURE */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition">
              <div className="text-6xl mb-6">
                🔒
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                100% Secure
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Your files stay private and are
                never stored permanently.
              </p>
            </div>

            {/* FREE */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 hover:shadow-2xl transition">
              <div className="text-6xl mb-6">
                💯
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Free to Use
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Use powerful PDF tools online
                completely free without signup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}