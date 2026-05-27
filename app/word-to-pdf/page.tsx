export default function WordToPDFPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-2xl w-full">
        <div className="text-7xl mb-6">
          📝
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Word to PDF
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed">
          Convert DOC and DOCX files into PDF
          documents quickly and securely.
        </p>

        <div className="mt-10">
          <button className="bg-cyan-500 hover:bg-cyan-400 px-8 py-5 rounded-2xl font-bold text-lg transition">
            Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}