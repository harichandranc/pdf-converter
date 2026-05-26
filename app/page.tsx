export default function Home() {
  const tools = [
    "Merge PDF",
    "Split PDF",
    "Compress PDF",
    "Image to PDF",
    "PDF to JPG",
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">
          PDF Converter
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Free online PDF tools powered by CH TECH GIANT
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{tool}</h2>

              <button className="bg-black text-white px-5 py-2 rounded-xl">
                Open Tool
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}